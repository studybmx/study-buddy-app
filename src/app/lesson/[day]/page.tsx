import { getLesson } from '../../../lib/content';
import { BuddyLoop } from '../../../components/BuddyLoop';

// A dynamic server component to fetch the right day configuration
export default async function LessonPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const dayNumber = parseInt(day, 10);
  const lesson = getLesson(dayNumber);

  if (!lesson) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>¡Lección no encontrada!</h1>
        <p>Todavía estamos trabajando en el día {dayNumber}.</p>
        <a href="/" className="primary-btn" style={{ display: 'inline-block', marginTop: '20px' }}>Ir al Inicio</a>
      </div>
    );
  }

  return (
    <div className="lesson-layout" style={{ maxWidth: '600px', margin: '0 auto', padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <header className="lesson-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
        <h1 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--secondary)' }}>Día {lesson.day}: {lesson.title}</h1>
        <a href="/" style={{ textDecoration: 'none', fontSize: '1.5rem', color: '#888' }}>&times;</a>
      </header>
      
      <main style={{ flex: 1, marginTop: '24px' }}>
        <BuddyLoop lesson={lesson} />
      </main>
    </div>
  );
}
