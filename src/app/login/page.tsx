'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Ups, no te reconocemos: " + error.message);
      } else {
        router.push('/');
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert("Error al registrarte: " + error.message);
      } else {
        alert("¡Cuenta VIP creada! Ahora inicia sesión abajo.");
        setIsLogin(true);
        setPassword('');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        .hero-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .about-container {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .about-text {
          text-align: left;
        }
        .buddy-loop-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .about-container {
            flex-direction: column;
            text-align: center;
          }
          .about-text {
            text-align: center;
          }
          .hero-title {
            font-size: 3.5rem !important;
          }
          .buddy-loop-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
        
        {/* 1. HERO SECTION */}
        <section className="hero-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
          
          {/* Left: Value Proposition */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} className="about-text">
            <img src="/assets/Logo%20principal.png" alt="Study Buddy" className="hero-logo desktop-only-margin" style={{ width: '100%', maxWidth: '380px', clipPath: 'inset(0px 0px 22% 0px)' }} />
            <h1 className="hero-title" style={{ fontSize: '5rem', fontFamily: 'var(--font-katibeh)', color: 'var(--secondary)', lineHeight: '0.9', marginBottom: '16px' }}>
              Aprende Inglés.<br/>Sin Excusas.<br/>Solo Práctica.
            </h1>
            <p className="hero-desc" style={{ fontSize: '1.2rem', color: '#4a5568', lineHeight: '1.5', marginBottom: '24px', fontWeight: 500 }}>
              El curso basado en <strong style={{color: 'var(--primary)'}}>Neuroeducación</strong> que moldea tu cerebro para crear aprendizajes funcionales y duraderos. 
            </p>
            
            <button 
              onClick={() => {
                document.getElementById('method-section')?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="primary-btn pulse-anim" 
              style={{ fontSize: '1.2rem', background: 'var(--primary)', color: 'white', margin: '0 auto', boxShadow: '0 8px 25px rgba(245, 109, 42, 0.4)' }}>
              Descubre el Método
            </button>
          </div>

          {/* Right: The Login/Signup Glass Card */}
          <div className="login-card" style={{ width: '100%', maxWidth: '420px', margin: '0 auto', textAlign: 'center', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '2px solid rgba(255,255,255,0.9)', borderRadius: '32px', padding: '32px 24px', boxShadow: '0 12px 35px rgba(245, 109, 42, 0.08)' }}>
            <div className="buddy-gang-mobile" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginBottom: '16px', paddingLeft: '45px' }}>
               <img src="/assets/green%20buddy.png" alt="Green" style={{ width: '60px', height: '60px', objectFit: 'contain', zIndex: 1, transform: 'rotate(-5deg)' }}/>
               <img src="/assets/blue%20buddy.png" alt="Blue" style={{ width: '75px', height: '75px', objectFit: 'contain', zIndex: 2, transform: 'translateX(-25px) rotate(-10deg) translateY(-5px)' }}/>
               
               <div style={{ position: 'relative', zIndex: 3, transform: 'translateX(-50px) translateY(-5px)' }}>
                  <div className="pulse-anim" style={{ position: 'absolute', top: '-45px', left: '50%', transform: 'translateX(-50%)', background: 'white', border: '3px solid #cbd5e0', padding: '6px 14px', borderRadius: '20px', fontWeight: '900', fontSize: '0.9rem', color: 'var(--secondary)', whiteSpace: 'nowrap', boxShadow: 'var(--shadow-sm)' }}>
                    Hi Buddy!
                    <div style={{ position: 'absolute', bottom: '-7px', left: '25%', width: '12px', height: '12px', background: 'white', borderRight: '3px solid #cbd5e0', borderBottom: '3px solid #cbd5e0', transform: 'rotate(45deg)' }}></div>
                  </div>
                  <img src="/assets/pink%20buddy.png" alt="Pink" style={{ width: '100px', height: '100px', objectFit: 'contain' }}/>
               </div>
               
               <img src="/assets/orange%20buddy.png" alt="Orange" style={{ width: '75px', height: '75px', objectFit: 'contain', zIndex: 2, transform: 'translateX(-70px) rotate(10deg) translateY(2px)' }}/>
               <img src="/assets/yellow%20buddy.png" alt="Yellow" style={{ width: '60px', height: '60px', objectFit: 'contain', zIndex: 1, transform: 'translateX(-95px) rotate(5deg) translateY(12px)' }}/>
            </div>
            
            <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-katibeh)', color: 'var(--secondary)', lineHeight: '1.1', marginBottom: '8px' }}>
              {isLogin ? "¡Hola Buddy!" : "¿Quieres ser nuestro Buddy?"}
            </h2>
            <p style={{ color: '#718096', marginBottom: '32px', fontWeight: 500, fontSize: '0.95rem', lineHeight: '1.4' }}>
              {isLogin ? "Inicia sesión para dominar el inglés de hoy." : "Crea tu cuenta VIP y cambia tu forma de aprender."}
            </p>

            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <input 
                type="email" 
                placeholder="Email (Ej. buddy@gmail.com)" 
                className="text-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ fontWeight: 500, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)' }}
              />
              <input 
                type="password" 
                placeholder="Clave secreta (Mín 6 letras)" 
                className="text-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ fontWeight: 500, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)' }}
              />
              
              <button type="submit" className="primary-btn pulse-anim" disabled={loading} style={{ marginTop: '12px', width: '100%', background: isLogin ? 'var(--primary)' : 'var(--secondary)' }}>
                {loading ? "Comprobando..." : isLogin ? "Entrar al curso" : "Crear mi cuenta"}
              </button>
            </form>

            <button 
              onClick={() => { setIsLogin(!isLogin); setEmail(''); setPassword(''); }} 
              style={{ marginTop: '32px', background: 'none', border: 'none', color: '#a0aec0', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', textDecoration: 'underline' }}>
              {isLogin ? "¿Aún no eres nuestro Buddy? Únete👋" : "¿Ya eres un Buddy oficial? Entra a seguir practicando 🎒"}
            </button>
          </div>
        </section>

        {/* 2. HOW IT WORKS (BUDDY LOOP) */}
        <section id="method-section" style={{ background: 'white', padding: '80px 32px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '4rem', fontFamily: 'var(--font-katibeh)', color: 'var(--secondary)', lineHeight: '1', marginBottom: '16px' }}>El Método "Buddy Loop"</h2>
            <p style={{ fontSize: '1.2rem', color: '#4a5568', marginBottom: '64px', maxWidth: '700px', margin: '0 auto 64px auto', fontWeight: 500 }}>
              Cuidadosamente diseñado en torno a la neuroeducación para moldear cómo tu cerebro asimila los aprendizajes funcionales. Un bucle perfecto libre de frustraciones.
            </p>

            <div className="buddy-loop-grid">
              <div style={{ background: '#E6F3FA', padding: '40px 24px', borderRadius: '32px', color: '#088AC8' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🧠</div>
                <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-katibeh)', marginBottom: '8px' }}>1. Learn</h3>
                <p style={{ fontWeight: 600, color: 'var(--foreground)' }}>Entiende rápido la lógica directa. Sin teoría aburrida o basura académica irrelevante.</p>
              </div>
              <div style={{ background: '#FDEDF3', padding: '40px 24px', borderRadius: '32px', color: '#d64f7c' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🧩</div>
                <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-katibeh)', marginBottom: '8px' }}>2. Try</h3>
                <p style={{ fontWeight: 600, color: 'var(--foreground)' }}>Equivócate de forma segura. Práctica interactiva constante para asentar tus neuronas.</p>
              </div>
              <div style={{ background: '#FBEAE5', padding: '40px 24px', borderRadius: '32px', color: '#E4552D' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎙️</div>
                <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-katibeh)', marginBottom: '8px' }}>3. Say</h3>
                <p style={{ fontWeight: 600, color: 'var(--foreground)' }}>Destruye tus bloqueos al hablar. Envía grabaciones vocales y acostumbra tu lengua.</p>
              </div>
              <div style={{ background: '#FDF2F8', padding: '40px 24px', borderRadius: '32px', color: '#DB2777' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>✍️</div>
                <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-katibeh)', marginBottom: '8px' }}>4. Own</h3>
                <p style={{ fontWeight: 600, color: 'var(--foreground)' }}>Hazlo tuyo. Aplica la lección redactando fragmentos reales de tu mundo íntimo.</p>
              </div>
              <div style={{ background: '#EAF6EE', padding: '40px 24px', borderRadius: '32px', color: '#35A668' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🔒</div>
                <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-katibeh)', marginBottom: '8px' }}>5. Recall</h3>
                <p style={{ fontWeight: 600, color: 'var(--foreground)' }}>El guardián secreto. Actividades impredecibles de repetición espaciada que sellan la memoria.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT ME */}
        <section style={{ padding: '80px 32px' }}>
          <div className="about-container" style={{ maxWidth: '1000px', margin: '0 auto', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: '40px', padding: '64px 48px', gap: '64px', border: '3px solid rgba(255,255,255,0.8)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
            <div style={{ flex: '0 0 auto', margin: '0 auto' }}>
              <img src="/assets/lily.jpg" alt="Lily Terrazas" style={{ width: '250px', height: '250px', borderRadius: '50%', objectFit: 'cover', border: '8px solid #d64f7c', boxShadow: '0 10px 25px rgba(214, 79, 124, 0.3)', transform: 'rotate(-4deg)' }} />
            </div>
            <div className="about-text" style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '4.5rem', fontFamily: 'var(--font-katibeh)', color: 'var(--secondary)', lineHeight: '0.9', marginBottom: '16px' }}>
                Tu Head Coach:<br/>Lily Terrazas
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#4a5568', lineHeight: '1.6', fontWeight: 500, marginBottom: '24px' }}>
                Soy Maestra con un <strong style={{ color: '#d64f7c' }}>Máster en Educación, Aprendizaje y Desarrollo Educativo (Neuroeducación)</strong>. Construí Study Buddy con un propósito central muy claro: brindar un espacio completamente seguro y libre de frustraciones.
              </p>
              <p style={{ fontSize: '1.2rem', color: '#4a5568', lineHeight: '1.6', fontWeight: 500 }}>
                Ya seas niño o adulto, aquí aprenderás de manera funcional **justamente lo que vas a usar en la vida real**. Sin reglas vacías; solo neuroeducación aplicada creando puentes duraderos en tu cerebro.
              </p>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer style={{ padding: '32px', textAlign: 'center', color: '#a0aec0', fontWeight: 'bold' }}>
          <p>© {new Date().getFullYear()} Study Buddy by Lily Terrazas. Todos los derechos reservados.</p>
        </footer>
      </main>
    </>
  );
}
