import { supabase } from './supabase';

export interface UserProgress {
  userId: string;
  currentDay: number;
  completedDays: number[];
  audioSubmissions: Record<number, string>;
  textSubmissions: Record<number, string>;
  unlockedBadges: string[];
}

const DEFAULT_PROGRESS: UserProgress = {
  userId: 'local-user',
  currentDay: 1,
  completedDays: [],
  audioSubmissions: {},
  textSubmissions: {},
  unlockedBadges: [],
};

/**
 * Storage Abstraction Layer - Fully migrated mapping to Cloud Supabase Table (user_progress)
 */
export const syncStorage = {
  async getProgress(): Promise<UserProgress> {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS;
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return DEFAULT_PROGRESS;

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error("Local DB fetch failed", error);
      }
      
      if (data) {
        return {
          userId: data.user_id,
          currentDay: data.current_day || 1,
          completedDays: data.completed_days || [],
          audioSubmissions: data.audio_submissions || {},
          textSubmissions: data.text_submissions || {},
          unlockedBadges: data.unlocked_badges || []
        };
      } else {
        // No row yet -> new student baseline. 
        return { ...DEFAULT_PROGRESS, userId: session.user.id };
      }
    } catch (e) {
      console.error("Error reading progress", e);
      return DEFAULT_PROGRESS;
    }
  },
  
  async saveProgress(progress: UserProgress): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return; 

      const { error } = await supabase.from('user_progress').upsert({
        user_id: session.user.id,
        current_day: progress.currentDay,
        completed_days: progress.completedDays,
        audio_submissions: progress.audioSubmissions,
        text_submissions: progress.textSubmissions,
        unlocked_badges: progress.unlockedBadges
      });

      if (error) {
        console.error("Save to Supabase failed:", error);
      }
    } catch (e) {
      console.error(e);
    }
  }
};
