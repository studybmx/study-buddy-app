'use client';

import React from 'react';
import { useProgress } from '../lib/ProgressContext';

export function ProgressCard() {
  const { progress, isLoaded } = useProgress();

  if (!isLoaded) return <div className="progress-skeleton">Cargando progreso...</div>;

  const totalDays = 20;
  const current = progress.currentDay;
  const percent = Math.min((progress.completedDays.length / totalDays) * 100, 100);

  return (
    <div className="card dashboard-card">
      <div className="card-header">
        <h2 className="title">Reto 1: Hello Buddy</h2>
        <span className="badge">Día {current} de {totalDays}</span>
      </div>
      
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
      <p className="status-text">{progress.completedDays.length} días completados</p>
    </div>
  );
}
