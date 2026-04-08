'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { ProgressCard } from "../components/ProgressCard";
import { useProgress } from "../lib/ProgressContext";
import { BADGES } from "../lib/badges";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Home() {
  const { progress, isLoaded } = useProgress();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, [router]);

  if (!authChecked || !isLoaded) return <main style={{ padding: '2rem', textAlign: 'center', marginTop: '20vh', color: '#a0aec0', fontWeight: 'bold' }}>Validando acceso VIP...</main>;

  return (
    <main className="dashboard-container">
      <header className="brand-header">
        <img src="/assets/Logo%20principal.png" alt="Study Buddy Logo" className="logo" />
        <div className="header-text">
          <h1>Hi, buddy!</h1>
          <p>¿Listo para dominar el inglés hoy?</p>
          <button 
            onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }}
            style={{ marginTop: '12px', background: 'none', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '6px 16px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'bold', color: '#718096' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>
      
      <section className="overview-section">
        <ProgressCard />
        
        <div className="cta-container">
          <button 
            className="primary-btn pulse-anim" 
            onClick={() => router.push(`/lesson/${progress.currentDay}`)}
          >
            Comenzar Día {progress.currentDay} 🚀
          </button>
        </div>
      </section>

      <section className="badges-section" style={{ marginBottom: '32px' }}>
        <h3>Tus Insignias</h3>
        <div className="badges-grid" style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '8px 0' }}>
          {BADGES.map(badge => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);
            return (
              <div key={badge.id} className="badge-item" style={{ opacity: isUnlocked ? 1 : 0.4, textAlign: 'center', minWidth: '100px', filter: isUnlocked ? 'none' : 'grayscale(100%)' }}>
                <div style={{ fontSize: '2.5rem', background: isUnlocked ? '#fff5f0' : '#edf2f7', border: isUnlocked ? '2px solid var(--primary)' : 'none', borderRadius: '50%', width: '70px', height: '70px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isUnlocked ? '0 4px 10px rgba(245, 109, 42, 0.2)' : 'none' }}>
                  {badge.icon}
                </div>
                <p style={{ fontSize: '0.85rem', fontWeight: 'bold', marginTop: '8px', color: '#4a5568' }}>{badge.name}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="roadmap-section">
        <h3>Tu Ruta de Aprendizaje</h3>
        <ul className="roadmap-list">
          {Array.from({ length: 20 }).map((_, idx) => {
            const dayNum = idx + 1;
            const isCompleted = progress.completedDays.includes(dayNum);
            const isCurrent = progress.currentDay === dayNum;
            const isLocked = dayNum > progress.currentDay;

            return (
               <li key={dayNum} className={`roadmap-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}`}>
                 <div className="day-circle">{isCompleted ? '✓' : dayNum}</div>
                 <div className="day-details">
                   <h4>Día {dayNum}</h4>
                   <span className="status">{isCompleted ? 'Completado' : isLocked ? 'Bloqueado' : 'En progreso'}</span>
                 </div>
               </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
