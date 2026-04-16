'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <style>{`
        /* Tipografías base */
        .lp-container {
          font-family: var(--font-poppins), system-ui, sans-serif;
          color: var(--foreground);
          background-color: #EBDFB9; /* Crema suave */
          overflow-x: hidden;
        }

        .katibeh {
          font-family: var(--font-katibeh), system-ui;
        }

        /* Navbar Sticky */
        .lp-navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          background: rgba(235, 223, 185, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 2px solid rgba(0,0,0,0.05);
        }

        .lp-nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
          font-weight: 600;
        }

        .lp-nav-links a {
          text-decoration: none;
          color: #4a5568;
          transition: color 0.2s;
        }

        .lp-nav-links a:hover {
          color: var(--primary);
        }

        .pill-btn {
          border-radius: 99px;
          font-weight: 700;
          padding: 12px 28px;
          cursor: pointer;
          border: none;
          transition: transform 0.1s, opacity 0.2s;
        }

        .pill-btn:hover {
          transform: translateY(-2px);
          opacity: 0.95;
        }

        .pill-btn:active {
          transform: translateY(1px);
        }

        /* Hero */
        .lp-hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 24px;
        }

        .lp-hero::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: url('/assets/pattern.png');
          background-size: 400px;
          opacity: 0.08;
          z-index: 0;
          pointer-events: none;
        }

        .lp-hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
        }

        .lp-hero-logo {
          width: 100%;
          max-width: 550px;
          margin-bottom: 24px;
          clip-path: inset(0px 0px 22% 0px);
          animation: floatHero 4s ease-in-out infinite;
        }

        @keyframes floatHero {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .floating-buddies {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 5;
        }

        .f-buddy {
          position: absolute;
          animation: subtleFloat 6s ease-in-out infinite alternate;
        }

        @keyframes subtleFloat {
          0% { transform: translateY(0) rotate(-5deg); }
          100% { transform: translateY(-20px) rotate(5deg); }
        }

        .category-card {
          background: white;
          border-radius: 32px;
          padding: 40px 32px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }

        .course-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
        }
        
        .course-card:hover {
          transform: translateY(-5px);
        }

        .course-img {
          width: 100%;
          height: 180px;
          background: #f1f5f9;
          object-fit: cover;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .lp-navbar { flex-direction: column; gap: 16px; }
          .f-buddy { display: none; } /* Hide decorative buddies on mobile for cleaner look */
          .category-grid { grid-template-columns: 1fr !important; }
          .courses-grid { grid-template-columns: 1fr !important; }
          .about-flex { flex-direction: column !important; text-align: center; }
        }
      `}</style>

      <div className="lp-container">
        {/* 1. Header / Navbar */}
        <nav className="lp-navbar">
          {/* Logo Horizontal Alternativo */}
          <img 
            src="/assets/Study Buddy.png" 
            alt="Study Buddy Logo" 
            style={{ width: '150px', height: 'auto', clipPath: 'inset(0px 0px 22% 0px)' }} 
          />
          <div className="lp-nav-links">
            <a href="#">Inicio</a>
            <a href="#categories">Cursos</a>
            <a href="#about">Nosotros</a>
            <button 
              className="pill-btn shadow-md"
              style={{ background: 'var(--primary)', color: 'white', fontSize: '1rem', marginLeft: '12px' }}
              onClick={() => router.push('/login')}
            >
              Iniciar sesión
            </button>
          </div>
        </nav>

        {/* 2. Hero */}
        <section className="lp-hero">
          <div className="floating-buddies">
            <img src="/assets/green%20buddy.png" className="f-buddy" style={{ top: '15%', left: '10%', width: '120px' }} alt="" />
            <img src="/assets/pink%20buddy.png" className="f-buddy" style={{ top: '25%', right: '12%', width: '140px', animationDelay: '1s' }} alt="" />
            <img src="/assets/blue%20buddy.png" className="f-buddy" style={{ bottom: '20%', left: '15%', width: '100px', animationDelay: '2s' }} alt="" />
            <img src="/assets/yellow%20buddy.png" className="f-buddy" style={{ bottom: '15%', right: '18%', width: '130px', animationDelay: '1.5s' }} alt="" />
          </div>

          <div className="lp-hero-content">
            <img src="/assets/Logo%20principal.png" alt="Study Buddy" className="lp-hero-logo" />
            <h1 className="katibeh" style={{ fontSize: '4.5rem', color: 'var(--secondary)', lineHeight: '0.95', margin: '16px 0' }}>
              El lugar donde el aprendizaje <span style={{ color: 'var(--primary)' }}>really happens.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#4a5568', margin: '0 auto 36px auto', maxWidth: '650px', fontWeight: 500, lineHeight: '1.5' }}>
              Study Buddy es una plataforma de cursos online asincrónicos diseñada para que aprender sea
              accesible, divertido y a tu ritmo. Cursos de inglés, recursos para padres y herramientas
              para maestros — todo en un solo lugar.
            </p>
            <button 
              className="pill-btn primary-btn pulse-anim"
              style={{ fontSize: '1.3rem', background: '#E4552D', color: 'white' }}
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explorar cursos
            </button>
          </div>
        </section>

        {/* 3. Categorías de Cursos */}
        <section id="categories" style={{ padding: '80px 24px', background: '#fff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 className="katibeh" style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '48px', color: 'var(--secondary)' }}>
              ¿Qué quieres aprender hoy?
            </h2>

            <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              
              {/* Categoría: Inglés */}
              <div className="category-card" style={{ borderTop: '8px solid #088AC8' }}>
                <h3 className="katibeh" style={{ fontSize: '3rem', color: '#088AC8', marginBottom: '16px' }}>📘 Inglés</h3>
                <p style={{ color: '#4a5568', fontWeight: 500, lineHeight: '1.5', flex: 1, marginBottom: '24px' }}>
                  Aprende inglés desde cero o mejora tu nivel con cursos diseñados para niños y adultos. Avanza a tu ritmo, con metodología basada en cómo el cerebro realmente aprende.
                </p>
                <button 
                  className="pill-btn" 
                  style={{ background: '#088AC8', color: 'white', width: '100%', fontSize: '1.1rem' }}
                  onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver cursos de inglés
                </button>
              </div>

              {/* Categoría: Papás y Mamás */}
              <div className="category-card" style={{ borderTop: '8px solid #F490B2' }}>
                <h3 className="katibeh" style={{ fontSize: '3rem', color: '#d64f7c', marginBottom: '16px' }}>👨‍👩‍👧 Padres</h3>
                <p style={{ color: '#4a5568', fontWeight: 500, lineHeight: '1.5', flex: 1, marginBottom: '24px' }}>
                  Herramientas prácticas para acompañar a tus hijos. Aprende a manejar emociones, rutinas y retos del día a día con estrategias respaldadas por la neurociencia.
                </p>
                <button 
                  className="pill-btn" 
                  style={{ background: '#F490B2', color: 'white', width: '100%', fontSize: '1.1rem', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                  onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver recursos para padres
                </button>
              </div>

              {/* Categoría: Maestros */}
              <div className="category-card" style={{ borderTop: '8px solid #35A668' }}>
                <h3 className="katibeh" style={{ fontSize: '3rem', color: '#35A668', marginBottom: '16px' }}>🍎 Maestros</h3>
                <p style={{ color: '#4a5568', fontWeight: 500, lineHeight: '1.5', flex: 1, marginBottom: '24px' }}>
                  Recursos pedagógicos y estrategias de enseñanza para docentes que quieren transformar su práctica. Porque los maestros también merecen un espacio para seguir creciendo.
                </p>
                <button 
                  className="pill-btn" 
                  style={{ background: '#35A668', color: 'white', width: '100%', fontSize: '1.1rem' }}
                  onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver recursos para maestros
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Catálogo de Cursos */}
        <section id="catalog" style={{ padding: '80px 24px', background: '#F8F9FA' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 className="katibeh" style={{ fontSize: '3.5rem', marginBottom: '40px', color: '#2C3E50' }}>Nuestro Catálogo</h2>
            
            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
              
              {/* Curso Piloto */}
              <div className="course-card">
                <div style={{ height: '180px', background: 'url("/assets/pattern.png")', backgroundColor: '#E6F3FA', backgroundSize: '150px', opacity: 0.8 }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#F4B826', color: '#fff', padding: '6px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>Básico</div>
                
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ color: '#088AC8', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Inglés</span>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', lineHeight: '1.3' }}>The Buddy Blueprint: Inglés MVP</h4>
                  <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '16px' }}>21 módulos · ~10 horas</p>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D3748' }}>$49 USD</span>
                    <button className="pill-btn" style={{ background: '#088AC8', color: 'white', padding: '8px 20px' }}>Inscribirme</button>
                  </div>
                </div>
              </div>

              {/* Placeholder 1 */}
              <div className="course-card">
                <div style={{ height: '180px', background: 'url("/assets/pattern.png")', backgroundColor: '#FDEDF3', backgroundSize: '150px', opacity: 0.8 }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#088AC8', color: '#fff', padding: '6px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>Intermedio</div>
                
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ color: '#d64f7c', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Padres</span>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', lineHeight: '1.3' }}>Manejo de Emociones en Niños</h4>
                  <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '16px' }}>5 módulos · ~2.5 horas</p>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D3748' }}>$25 USD</span>
                    <button className="pill-btn" style={{ background: '#F490B2', color: 'white', padding: '8px 20px', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Ver curso</button>
                  </div>
                </div>
              </div>

              {/* Placeholder 2 */}
              <div className="course-card">
                <div style={{ height: '180px', background: 'url("/assets/pattern.png")', backgroundColor: '#EAF6EE', backgroundSize: '150px', opacity: 0.8 }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#E4552D', color: '#fff', padding: '6px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>Avanzado</div>
                
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ color: '#35A668', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Maestros</span>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', lineHeight: '1.3' }}>Metodologías Activas y Neurociencia</h4>
                  <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '16px' }}>8 módulos · ~4 horas</p>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2D3748' }}>$35 USD</span>
                    <button className="pill-btn" style={{ background: '#35A668', color: 'white', padding: '8px 20px' }}>Ver curso</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. Sobre Mí */}
        <section id="about" style={{ padding: '80px 24px', background: '#FEF8EA' }}>
          <div className="about-flex" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '48px', alignItems: 'center', background: 'white', padding: '48px', borderRadius: '40px', boxShadow: '0 12px 40px rgba(0,0,0,0.04)' }}>
            
            <div style={{ flex: '0 0 auto', position: 'relative' }}>
              <img src="/assets/lily.jpg" alt="Liliana Terrazas" style={{ width: '250px', height: '250px', borderRadius: '50%', objectFit: 'cover', border: '8px solid #F490B2', boxShadow: '0 15px 35px rgba(244, 144, 178, 0.3)', transform: 'rotate(-4deg)' }} />
              <img src="/assets/orange%20buddy.png" alt="" style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '80px', transform: 'rotate(15deg)' }} />
            </div>

            <div style={{ flex: 1 }}>
              <h2 className="katibeh" style={{ fontSize: '3.5rem', color: 'var(--secondary)', lineHeight: '1', marginBottom: '8px' }}>Liliana Terrazas</h2>
              <p style={{ fontWeight: 800, color: '#E4552D', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Head Coach · Study Buddy</p>
              
              <p style={{ fontSize: '1.1rem', color: '#4a5568', lineHeight: '1.6', fontWeight: 500, marginBottom: '16px' }}>
                "Soy maestra con un máster en aprendizaje, cognición y desarrollo educativo. Creo que el aprendizaje debe estar accesible para todos y quiero crear un espacio seguro para aprender, equivocarse y seguir intentando."
              </p>
              <p style={{ fontSize: '1rem', color: '#718096', lineHeight: '1.6', fontWeight: 400 }}>
                A través de Study Buddy, he combinado mi pasión por la neurociencia y la educación para ofrecerte metodologías honestas y sin falsas promesas.
              </p>
            </div>
            
          </div>
        </section>

        {/* 6. Footer */}
        <footer style={{ background: '#1A202C', color: '#E2E8F0', padding: '64px 32px 32px 32px', position: 'relative', overflow: 'hidden' }}>
          <img src="/assets/yellow%20buddy.png" alt="" style={{ position: 'absolute', bottom: '20px', left: '20px', width: '60px', opacity: 0.2 }} />
          
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '32px' }}>
            <img src="/assets/Study Buddy.png" alt="Study Buddy" style={{ width: '180px', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
            
            <div style={{ display: 'flex', gap: '24px', fontWeight: 600 }}>
              <a href="#" style={{ color: '#E2E8F0', textDecoration: 'none' }}>Inicio</a>
              <a href="#categories" style={{ color: '#E2E8F0', textDecoration: 'none' }}>Cursos</a>
              <a href="#about" style={{ color: '#E2E8F0', textDecoration: 'none' }}>Contacto</a>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Instagram Icon Placeholder */}
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E2E8F0', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px' }}>
                <span>📸</span> @studybuddy.mx
              </a>
              {/* Facebook Icon Placeholder */}
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E2E8F0', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px' }}>
                <span>📘</span> Próximamente
              </a>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', width: '100%', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#A0AEC0' }}>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <a href="#" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Aviso de privacidad</a>
                <span>|</span>
                <a href="#" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Términos y condiciones</a>
              </div>
              <p>© {new Date().getFullYear()} Study Buddy. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
