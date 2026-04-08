'use client';

import React, { useState, useEffect } from 'react';
import { LessonContent } from '../lib/content';
import { AudioRecorder } from './AudioRecorder';
import { useProgress } from '../lib/ProgressContext';
import { useRouter } from 'next/navigation';

interface BuddyLoopProps {
  lesson: LessonContent;
}

export function BuddyLoop({ lesson }: BuddyLoopProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0=Learn, 1=Try, 2=Say, 3=Own, 4=Recall, 5=Done
  const [currentTryIndex, setCurrentTryIndex] = useState(0);
  const [selectedPairWord, setSelectedPairWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [recallPassed, setRecallPassed] = useState(false);

  const { markDayCompleted, saveSubmission } = useProgress();
  const router = useRouter();

  const STEP_BGS = ['bg-learn', 'bg-try', 'bg-say', 'bg-own', 'bg-recall'];
  const STEP_TEXTS = ['text-learn', 'text-try', 'text-say', 'text-own', 'text-recall'];
  const BUDDY_CONFIG = [
    { src: '/assets/blue%20buddy.png', anim: 'buddy-anim-learn' },
    { src: '/assets/pink%20buddy.png', anim: 'buddy-anim-try' },
    { src: '/assets/orange%20buddy.png', anim: 'buddy-anim-say' },
    { src: '/assets/yellow%20buddy.png', anim: 'buddy-anim-own' },
    { src: '/assets/green%20buddy.png', anim: 'buddy-anim-recall' },
  ];

  const currentBgClass = STEP_BGS[currentStep] || '';
  const currentTextClass = STEP_TEXTS[currentStep] || '';
  const currentBuddy = BUDDY_CONFIG[currentStep] || BUDDY_CONFIG[0];

  useEffect(() => {
    if (currentBgClass) {
       const themeClass = `${currentBgClass}-theme`;
       document.body.classList.add(themeClass);
       return () => { document.body.classList.remove(themeClass); }
    }
  }, [currentBgClass]);

  const handleNext = () => setCurrentStep(prev => prev + 1);

  const handleTrySuccess = () => {
    setSelectedPairWord(null);
    setMatchedPairs([]);
    if (currentTryIndex < lesson.steps.try.length - 1) {
      setCurrentTryIndex(prev => prev + 1);
    } else {
      handleNext();
    }
  };

  const handleEmojiClick = (emoji: string, pairs: {emoji:string, text:string}[]) => {
    if (!selectedPairWord) {
      alert("¡Toca la palabra primero y luego busca su emoji!");
      return;
    }
    const targetPair = pairs.find(p => p.text === selectedPairWord);
    if (targetPair?.emoji === emoji) {
      const newMatched = [...matchedPairs, selectedPairWord];
      setMatchedPairs(newMatched);
      setSelectedPairWord(null);
      if (newMatched.length === pairs.length) {
        setTimeout(() => handleTrySuccess(), 500); // 0.5s pause to celebrate
      }
    } else {
      alert("¡Oops! Esa no es su pareja. ¡Intenta de nuevo!");
      setSelectedPairWord(null);
    }
  };

  const playAudioSpeech = (text: string) => {
    if (!window.speechSynthesis) {
      alert("Tu navegador actual no soporta la lectura de audio automática.");
      return;
    }
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // American English
    utterance.rate = 0.85;    // Slower for learners
    window.speechSynthesis.speak(utterance);
  };

  const handleFinishDay = async () => {
    await markDayCompleted(lesson.day);
    router.push('/');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-card">
            <h2 className={`step-title ${currentTextClass}`}>
              1. Learn
              <span style={{ display: 'block', fontSize: '1.1rem', color: '#718096', fontWeight: 'normal', marginTop: '4px' }}>Aprende</span>
            </h2>
            <div className="step-content">
              <img src={currentBuddy.src} alt="Buddy" className={`buddy-img ${currentBuddy.anim}`} />
              
              {lesson.steps.learn.videoUrl ? (
                <iframe width="100%" height="250" src={lesson.steps.learn.videoUrl} title="Video Lesson" style={{ borderRadius: '16px', marginBottom: '24px', border: 'none', background: '#f0f0f0' }} allowFullScreen></iframe>
              ) : lesson.steps.learn.imageUrl ? (
                <img src={lesson.steps.learn.imageUrl} alt="Lesson Context" className="buddy-img" style={{ animation: 'none', borderRadius: '16px' }} />
              ) : null}
              <p>{lesson.steps.learn.contentText}</p>
              
              {lesson.steps.learn.pronunciationTip && (
                <div style={{ background: '#edf2f7', padding: '16px', borderRadius: '12px', marginTop: '24px', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1rem', color: '#4a5568', marginBottom: '8px' }}>🗣️ Tip de Pronunciación</h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '12px', color: '#2d3748' }}>{lesson.steps.learn.pronunciationTip.tip}</p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className={`primary-btn ${currentBgClass}`} style={{ flex: 1, padding: '8px 12px', fontSize: '0.9rem' }} onClick={() => playAudioSpeech(lesson.steps.learn.pronunciationTip!.soundA)}>
                      🔊 {lesson.steps.learn.pronunciationTip.soundA}
                    </button>
                    <button className={`primary-btn ${currentBgClass}`} style={{ flex: 1, padding: '8px 12px', fontSize: '0.9rem' }} onClick={() => playAudioSpeech(lesson.steps.learn.pronunciationTip!.soundB)}>
                      🔊 {lesson.steps.learn.pronunciationTip.soundB}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className={`primary-btn ${currentBgClass}`} onClick={handleNext} style={{ marginTop: '16px' }}>¡Entendido!</button>
          </div>
        );
      case 1: {
        const currentTry = lesson.steps.try[currentTryIndex];
        
        return (
          <div className="step-card">
            <h2 className={`step-title ${currentTextClass}`}>
              2. Try
              <span style={{ display: 'block', fontSize: '1.1rem', color: '#718096', fontWeight: 'normal', marginTop: '4px' }}>
                Intenta (Actividad {currentTryIndex + 1} de {lesson.steps.try.length})
              </span>
            </h2>
            <img src={currentBuddy.src} alt="Buddy" className={`buddy-img ${currentBuddy.anim}`} />
            
            {currentTry.type === 'multiple_choice' && (
              <>
                <p className="step-prompt">{currentTry.question}</p>
                <div className="options-grid">
                  {currentTry.options?.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => {
                        if (i === currentTry.correctIdx) handleTrySuccess();
                        else alert("¡Intentemos de nuevo!");
                    }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}

            {currentTry.type === 'fill_blank' && (
              <>
                <p className="step-prompt" style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '20px 0' }}>
                  {currentTry.beforeBlank} <span style={{ borderBottom: `3px solid var(--primary)`, padding: '0 16px', color: '#a0aec0' }}>?</span> {currentTry.afterBlank}
                </p>
                <div className="options-grid">
                  {currentTry.options.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => {
                        if (opt === currentTry.correctWord) handleTrySuccess();
                        else alert("¡Esa no encaja! Intenta otra vez.");
                    }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}

            {currentTry.type === 'match_emoji' && (
              <>
                <p className="step-prompt">{currentTry.prompt}</p>
                <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '16px' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                      {currentTry.pairs.map(p => {
                         const isMatched = matchedPairs.includes(p.text);
                         const isSelected = selectedPairWord === p.text;
                         return (
                           <button 
                             key={p.text} 
                             className={`option-btn`}
                             style={{ 
                               background: isMatched ? '#edf2f7' : isSelected ? 'var(--secondary)' : 'white', 
                               color: isSelected ? 'white' : 'inherit',
                               border: isMatched ? '2px dashed #cbd5e0' : '2px solid #e2e8f0',
                               opacity: isMatched ? 0.5 : 1
                             }}
                             onClick={() => !isMatched && setSelectedPairWord(p.text)}
                             disabled={isMatched}
                           >
                             {isMatched ? '✓' : p.text}
                           </button>
                         )
                      })}
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                      {/* Duplicate array manually for scrambling visual without complex state */}
                      {[...currentTry.pairs].sort((a,b) => a.emoji.localeCompare(b.emoji)).map((p, i) => (
                         <button 
                           key={i} 
                           className="option-btn" 
                           style={{ fontSize: '2rem', padding: '8px' }}
                           onClick={() => handleEmojiClick(p.emoji, currentTry.pairs)}
                         >
                           {p.emoji}
                         </button>
                      ))}
                   </div>
                </div>
              </>
            )}

            {currentTry.type === 'listening' && (
              <>
                <p className="step-prompt" style={{ marginBottom: "16px", fontSize: "1.2rem", fontWeight: "bold" }}>
                   {currentTry.question}
                </p>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <button 
                    className={`primary-btn pulse-anim ${currentBgClass}`} 
                    onClick={() => {
                       if (currentTry.audioUrl) {
                         new Audio(currentTry.audioUrl).play();
                       } else {
                         playAudioSpeech(currentTry.expectedAudioText);
                       }
                    }}
                    style={{ padding: "16px 32px", fontSize: "1.2rem", borderRadius: "30px", border: "none", color: "white", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                  >
                    🔊 Escuchar Audio
                  </button>
                </div>
                <div className="options-grid">
                  {currentTry.options.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => {
                        if (i === currentTry.correctIdx) handleTrySuccess();
                        else alert("¡Mmm no fue del todo eso! Vuelve a escuchar el audio e intenta de nuevo.");
                    }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      }
      case 2:
        return (
          <div className="step-card">
            <h2 className={`step-title ${currentTextClass}`}>
              3. Say
              <span style={{ display: 'block', fontSize: '1.1rem', color: '#718096', fontWeight: 'normal', marginTop: '4px' }}>Habla</span>
            </h2>
            <img src={currentBuddy.src} alt="Buddy" className={`buddy-img ${currentBuddy.anim}`} />
            <AudioRecorder 
              day={lesson.day}
              activityName="Say"
              prompt={`Di en voz alta: "${lesson.steps.say.promptPhrase}"`} 
              onUploadSuccess={async (url) => {
                await saveSubmission(lesson.day, 'audio', url);
                handleNext();
              }}
            />
          </div>
        );
      case 3:
        return (
          <div className="step-card">
            <h2 className={`step-title ${currentTextClass}`}>
              4. Own
              <span style={{ display: 'block', fontSize: '1.1rem', color: '#718096', fontWeight: 'normal', marginTop: '4px' }}>Hazlo tuyo</span>
            </h2>
            <img src={currentBuddy.src} alt="Buddy" className={`buddy-img ${currentBuddy.anim}`} />
            
            <p className="step-prompt">{lesson.steps.own.writingPrompt}</p>
            {lesson.steps.own.inputType === 'text' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <textarea id="own-text" rows={4} className="text-input" placeholder="Escribe aquí..." />
                <button className={`primary-btn ${currentBgClass}`} onClick={async () => {
                   const val = (document.getElementById('own-text') as HTMLTextAreaElement).value;
                   if (val) {
                     await saveSubmission(lesson.day, 'text', val);
                     handleNext();
                   }
                }}>Enviar</button>
              </div>
            ) : (
              <AudioRecorder 
                day={lesson.day}
                activityName="Own"
                prompt="Graba tu nota de voz" 
                onUploadSuccess={async (url) => {
                  await saveSubmission(lesson.day, 'audio', url);
                  handleNext();
                }}
              />
            )}
          </div>
        );
      case 4: {
        const hasActivity = !!lesson.steps.recall.activity;
        const canFinish = !hasActivity || recallPassed;

        return (
          <div className="step-card">
            <h2 className={`step-title ${currentTextClass}`}>
              5. Recall
              <span style={{ display: 'block', fontSize: '1.1rem', color: '#718096', fontWeight: 'normal', marginTop: '4px' }}>Recuerda</span>
            </h2>
            <img src={currentBuddy.src} alt="Buddy" className={`buddy-img ${currentBuddy.anim}`} />
            
            <div className="flashcard">
              <h3>Punto clave:</h3>
              <p>{lesson.steps.recall.summaryFact}</p>
            </div>

            {hasActivity && !recallPassed && (
               <div style={{ marginTop: '24px', padding: '16px', background: '#fff5f5', border: '2px solid #feb2b2', borderRadius: '12px' }}>
                  <h4 style={{ color: '#c53030', marginBottom: '12px', fontSize: '1.1rem' }}>Desafío Final 🔒</h4>
                  {lesson.steps.recall.activity?.type === 'fill_blank' && (
                    <>
                      <p className="step-prompt" style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '12px 0' }}>
                        {lesson.steps.recall.activity.beforeBlank} <span style={{ borderBottom: `3px solid var(--primary)`, color: '#a0aec0' }}>?</span> {lesson.steps.recall.activity.afterBlank}
                      </p>
                      <div className="options-grid">
                        {lesson.steps.recall.activity.options.map((opt, i) => (
                          <button key={i} className="option-btn" style={{ padding: '8px' }} onClick={() => {
                              if (opt === lesson.steps.recall.activity!.correctWord) setRecallPassed(true);
                              else alert("¡Mmm! Repasa el punto clave arriba e intenta de nuevo.");
                          }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {lesson.steps.recall.activity?.type === 'multiple_choice' && (
                    <>
                      <p className="step-prompt" style={{ fontSize: '1rem', fontWeight: 'bold' }}>{lesson.steps.recall.activity.question}</p>
                      <div className="options-grid">
                        {lesson.steps.recall.activity.options.map((opt, i) => (
                          <button key={i} className="option-btn" style={{ padding: '8px' }} onClick={() => {
                              if (i === lesson.steps.recall.activity!.correctIdx) setRecallPassed(true);
                              else alert("¡Casi! Intenta de nuevo.");
                          }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
               </div>
            )}

            {canFinish && (
              <button className={`primary-btn finish-btn ${currentBgClass}`} style={{ marginTop: '24px' }} onClick={handleFinishDay}>
                Completar Día {lesson.day}
              </button>
            )}
          </div>
        );
      }
      default:
        return null;
    }
  };

  const stepsLabels = ["Learn", "Try", "Say", "Own", "Recall"];

  return (
    <div className="buddy-loop-container">
      <div className="progress-bar">
        {stepsLabels.map((lbl, i) => (
          <div key={i} className={`progress-pip pip-${i} ${i <= currentStep ? 'active' : ''}`}>
             {lbl}
          </div>
        ))}
      </div>
      <div className="step-render-area">
        {renderStep()}
      </div>
    </div>
  );
}
