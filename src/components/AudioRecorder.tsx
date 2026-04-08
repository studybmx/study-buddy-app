'use client';

import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface AudioRecorderProps {
  onUploadSuccess: (url: string) => Promise<void> | void;
  prompt: string;
  day?: number;
  activityName?: string;
}

export function AudioRecorder({ onUploadSuccess, prompt, day, activityName }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error al acceder al micrófono", err);
      alert("No se pudo acceder al micrófono. Por favor, revisa tus permisos.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setAudioUrl(null);
    audioChunksRef.current = [];
  };

  const handleUpload = async () => {
    if (audioChunksRef.current.length === 0) return;
    setIsUploading(true);
    setUploadError(null);
    setUploadStatus("Iniciando...");

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email || 'unknown_buddy';
      
      const safeEmail = email.replace(/[^a-zA-Z0-9@.-]/g, '_');
      const safeActivity = (activityName || 'general').replace(/[^a-zA-Z0-9-]/g, '_');
      const currentDay = day !== undefined ? `Dia-${day}` : `Dia-X`;
      
      // Crea una estructura de carpetas: email / Dia-X / Actividad_Timestamp
      const fileName = `${safeEmail}/${currentDay}/${safeActivity}_${Date.now()}.webm`;
      
      // Convertir Blob a File puro (para evitar un bug fantasma de algunos navegadores que congelan el POST)
      const file = new File([audioBlob], fileName, { type: 'audio/webm' });

      setUploadStatus("Contactando a Supabase...");
      const { data, error } = await supabase.storage
        .from('audio_submissions')
        .upload(fileName, file, {
           cacheControl: '3600',
           upsert: false
        });

      if (error) {
        throw new Error(error.message);
      }

      setUploadStatus("Generando enlace...");
      const { data: urlData } = supabase.storage
        .from('audio_submissions')
        .getPublicUrl(data!.path);

      setUploadStatus("Guardando en tu cuenta...");
      await onUploadSuccess(urlData.publicUrl);
    } catch (err: any) {
      console.error("Error de subida a la nube", err);
      setUploadError(err.message || 'Error de red desconocido');
    } finally {
      setIsUploading(false);
      setUploadStatus(null);
    }
  };

  return (
    <div className="audio-recorder-container" style={{ textAlign: 'center', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '16px', backgroundColor: '#fafafa' }}>
      <p style={{ marginBottom: '16px', fontWeight: 'bold' }}>{prompt}</p>
      
      {!audioUrl && !isRecording && (
        <button onClick={startRecording} className="btn-primary" style={btnStyle('#4CAF50')}>
          🎤 Empezar a grabar
        </button>
      )}

      {isRecording && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="recording-indicator" style={{ color: 'red', marginBottom: '8px', animation: 'blink 1s infinite' }}>🔴 Grabando...</div>
          <button onClick={stopRecording} className="btn-primary" style={btnStyle('#f44336')}>
            ⏹ Detener grabación
          </button>
        </div>
      )}

      {audioUrl && !isRecording && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <audio src={audioUrl} controls style={{ width: '100%', maxWidth: '300px' }} />
          
          {uploadError && (
            <div style={{ padding: '12px', background: '#FEF2F2', border: '1px solid #F87171', color: '#991B1B', borderRadius: '8px', fontSize: '0.9rem', width: '100%' }}>
              <strong>Error detectado:</strong> {uploadError}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={resetRecording} disabled={isUploading} className="btn-secondary" style={btnStyle('#9e9e9e')}>
              Reintentar
            </button>
            <button onClick={handleUpload} disabled={isUploading} className="btn-primary" style={{...btnStyle('#2196F3'), minWidth: '150px'}}>
              {isUploading ? (uploadStatus || 'Subiendo...') : 'Enviar 🎉'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = (bg: string): React.CSSProperties => ({
  backgroundColor: bg,
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '24px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px'
});
