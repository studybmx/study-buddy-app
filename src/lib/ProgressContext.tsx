'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgress, syncStorage } from './progressStore';
import { evaluateBadges } from './badges';
import { supabase } from './supabase';

interface ProgressContextType {
  progress: UserProgress;
  isLoaded: boolean;
  markDayCompleted: (day: number) => Promise<void>;
  saveSubmission: (day: number, type: 'audio' | 'text', urlOrText: string) => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    // 1. Initial cloud hydration
    const initProgress = async () => {
       const { data: { session } } = await supabase.auth.getSession();
       if (session?.user) {
         const p = await syncStorage.getProgress();
         setProgress(p);
       }
    };
    initProgress();

    // 2. Continuous Auth Watchdog
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const freshData = await syncStorage.getProgress();
        setProgress(freshData);
      } else {
        setProgress(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const markDayCompleted = async (day: number) => {
    if (!progress) return;
    const newCompleted = progress.completedDays.includes(day) 
      ? progress.completedDays 
      : [...progress.completedDays, day];
    
    const nextDay = (progress.currentDay === day && day < 20) 
      ? day + 1 
      : progress.currentDay;

    const audioCount = Object.keys(progress.audioSubmissions).length;
    const justUnlocked = evaluateBadges(newCompleted, audioCount, progress.unlockedBadges);
    const updatedBadges = [...progress.unlockedBadges, ...justUnlocked];

    const updated = { 
      ...progress, 
      completedDays: newCompleted, 
      currentDay: nextDay,
      unlockedBadges: updatedBadges
    };
    setProgress(updated);
    await syncStorage.saveProgress(updated);
  };

  const saveSubmission = async (day: number, type: 'audio' | 'text', urlOrText: string) => {
    if (!progress) return;
    if (type === 'audio') {
      const newAudioSubmissions = { ...progress.audioSubmissions, [day]: urlOrText };
      const audioCount = Object.keys(newAudioSubmissions).length;
      
      const justUnlocked = evaluateBadges(progress.completedDays, audioCount, progress.unlockedBadges);
      const updatedBadges = [...progress.unlockedBadges, ...justUnlocked];

      const updated = {
        ...progress,
        audioSubmissions: newAudioSubmissions,
        unlockedBadges: updatedBadges
      };
      setProgress(updated);
      await syncStorage.saveProgress(updated);
    } else {
      const updated = {
        ...progress,
        textSubmissions: { ...progress.textSubmissions, [day]: urlOrText }
      };
      setProgress(updated);
      await syncStorage.saveProgress(updated);
    }
  };

  // Only render children down tree if loading is done OR no user is logged in (guarded by page.tsx redirect)
  return (
    <ProgressContext.Provider value={{ progress: progress as UserProgress, isLoaded: progress !== null, markDayCompleted, saveSubmission }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
