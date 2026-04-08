'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { UserProgress } from '../../lib/progressStore';
import { AudioRecorder } from '../../components/AudioRecorder';

const ADMIN_EMAIL = 'study.bmx@gmail.com';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<UserProgress[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<UserProgress | null>(null);
  const [feedbackRecordingDay, setFeedbackRecordingDay] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.email !== ADMIN_EMAIL) {
      alert("Acceso denegado. Esta área es exclusiva para la Head Coach.");
      router.push('/');
      return;
    }
    fetchStudents();
  };

  const fetchStudents = async () => {
    setLoading(true);
    // Nota: Esto asume que tienes RLS configurado en Supabase que permita que el ADMIN_EMAIL pueda hacer SELECT.
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .order('current_day', { ascending: false });

    if (error) {
      console.error("Error fetching students:", error);
    } else if (data) {
      const parsedStudents = data.map(d => ({
        userId: d.user_id,
        currentDay: d.current_day || 1,
        completedDays: d.completed_days || [],
        audioSubmissions: d.audio_submissions || {},
        textSubmissions: d.text_submissions || {},
        unlockedBadges: d.unlocked_badges || [],
        userEmail: d.user_email || 'Sin correo',
        teacherFeedback: d.teacher_feedback || {}
      }));
      setStudents(parsedStudents);
    }
    setLoading(false);
  };

  const handleSendFeedback = async (audioUrl: string, studentId: string, day: number, currentFeedbackObj: any) => {
    const newFeedback = { ...currentFeedbackObj, [day]: audioUrl };
    
    const { error } = await supabase
      .from('user_progress')
      .update({ teacher_feedback: newFeedback })
      .eq('user_id', studentId);

    if (error) {
      alert("Error al enviar el feedback: " + error.message);
    } else {
      alert("¡Feedback enviado exitosamente a tu alumno!");
      setFeedbackRecordingDay(null);
      fetchStudents(); // recargar lista
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', fontSize: '1.2rem' }}>Cargando portal de maestra... ⏳</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px', fontFamily: 'var(--font-poppins)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: 'bold' }}>Panel Head Coach 👩‍🏫</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Buzón Administrativo de Lily</p>
          </div>
          <button 
            onClick={() => router.push('/')}
            style={{ background: 'white', padding: '10px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', fontWeight: 'bold', cursor: 'pointer' }}>
            Ir a mis lecciones
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '24px' }}>
          {/* Col 1: Student List */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#334155' }}>Tus Alumnos ({students.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {students.map(s => (
                <button 
                  key={s.userId}
                  onClick={() => setSelectedStudent(s)}
                  style={{ 
                    textAlign: 'left', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                    background: selectedStudent?.userId === s.userId ? '#eff6ff' : '#f8fafc',
                    color: selectedStudent?.userId === s.userId ? '#2563eb' : '#475569',
                    borderLeft: selectedStudent?.userId === s.userId ? '4px solid #2563eb' : '4px solid transparent',
                    fontWeight: 600, fontSize: '0.95rem'
                  }}
                >
                  {s.userEmail}
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>Va en el Día {s.currentDay}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Student Details & Inbox */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            {!selectedStudent ? (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '60px 0' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>📬</span>
                Selecciona un alumno a la izquierda para ver sus tareas y mandarle retroalimentación.
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#1e293b' }}>{selectedStudent.userEmail}</h3>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                  <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>Día Actual: {selectedStudent.currentDay}</span>
                  <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>Días Completados: {selectedStudent.completedDays.length}</span>
                </div>

                <h4 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px', color: '#334155' }}>Audios Enviados:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.keys(selectedStudent.audioSubmissions).length === 0 ? (
                    <p style={{ color: '#94a3b8' }}>Este alumno aún no ha mandado grabaciones de voz.</p>
                  ) : (
                    Object.entries(selectedStudent.audioSubmissions).map(([dayKey, audioUrl]) => (
                      <div key={dayKey} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontWeight: 'bold', color: '#475569' }}>Práctica del Día {dayKey}:</span>
                          {selectedStudent.teacherFeedback[Number(dayKey)] ? (
                            <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.8rem', padding: '4px 8px', borderRadius: '8px', fontWeight: 'bold' }}>✅ Ya enviaste feedback</span>
                          ) : (
                            <button 
                              onClick={() => setFeedbackRecordingDay(Number(dayKey))}
                              style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}>
                              🎙️ Grabar Respuesta
                            </button>
                          )}
                        </div>
                        
                        <audio src={audioUrl as string} controls style={{ width: '100%', height: '40px' }} />

                        {/* Caja de feedback colapsable si la maestra le dio clic a "Grabar Respuesta" */}
                        {feedbackRecordingDay === Number(dayKey) && (
                          <div style={{ marginTop: '20px', background: 'white', padding: '20px', borderRadius: '16px', border: '2px dashed var(--primary)' }}>
                            <AudioRecorder 
                              prompt={`Grabando retroalimentación de VIP Coach para el Día ${dayKey}`}
                              day={Number(dayKey)}
                              activityName={`Feedback_Lily`}
                              onUploadSuccess={async (url) => {
                                await handleSendFeedback(url, selectedStudent.userId, Number(dayKey), selectedStudent.teacherFeedback);
                              }}
                            />
                            <button onClick={() => setFeedbackRecordingDay(null)} style={{ marginTop: '12px', background: 'none', border: 'none', color: '#94a3b8', textDecoration: 'underline', cursor: 'pointer', width: '100%' }}>Cancelar</button>
                          </div>
                        )}

                        {/* Mostrar feedback enviado previamente */}
                        {selectedStudent.teacherFeedback[Number(dayKey)] && (
                          <div style={{ marginTop: '16px', background: '#eff6ff', padding: '16px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#1d4ed8', marginBottom: '8px' }}>Tu última corrección para este día:</p>
                            <audio src={selectedStudent.teacherFeedback[Number(dayKey)]} controls style={{ width: '100%', height: '35px' }} />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                
                {/* Text submissions here as well for MVP? */}
                <h4 style={{ fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px', color: '#334155' }}>Textos Enviados:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.keys(selectedStudent.textSubmissions).length === 0 ? (
                     <p style={{ color: '#94a3b8' }}>Este alumno aún no ha mandado textos.</p>
                  ) : (
                     Object.entries(selectedStudent.textSubmissions).map(([dayKey, txt]) => (
                        <div key={dayKey} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                           <strong style={{ display: 'block', marginBottom: '8px', color: '#475569' }}>Día {dayKey}:</strong>
                           <p style={{ color: '#334155', fontStyle: 'italic' }}>"{txt as string}"</p>
                        </div>
                     ))
                  )}
                </div>
                
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
