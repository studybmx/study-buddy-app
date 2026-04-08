export type TryActivity = 
  | { type: 'multiple_choice'; question: string; options: string[]; correctIdx: number; worksheetUrl?: string }
  | { type: 'fill_blank'; beforeBlank: string; afterBlank: string; options: string[]; correctWord: string; worksheetUrl?: string }
  | { type: 'match_emoji'; prompt: string; pairs: { emoji: string; text: string; id?: string }[]; worksheetUrl?: string }
  | { type: 'listening'; expectedAudioText: string; question: string; options: string[]; correctIdx: number; audioUrl?: string };

export interface LessonContent {
  day: number;
  title: string;
  steps: {
    learn: { 
      contentText: string; 
      imageUrl?: string; 
      videoUrl?: string; 
      pronunciationTip?: { tip: string; soundA: string; soundB: string; };
    };
    try: TryActivity[];
    say: { promptPhrase: string };
    own: { writingPrompt: string; inputType: 'text' | 'audio'; };
    recall: { 
      summaryFact: string; 
      activity?: TryActivity; 
    };
  }
}

export const LESSONS: Record<number, LessonContent> = {
  1: {
    day: 1, title: "Conociendo a tu Buddy",
    steps: {
      learn: { 
        contentText: "¡Bienvenido a Study Buddy! Aprenderemos a presentarnos usando 'Hello, I am...'.",
        pronunciationTip: { tip: "Nota la diferencia entre decirlo formal (separado) y como nativo (rápido).", soundA: "I am", soundB: "I'm" }
      },
      try: [
        { type: 'listening', expectedAudioText: 'Hello, I am Maria.', question: 'Escucha el audio. ¿De quién es la voz?', options: ["I am John.", "Hello, I am Maria."], correctIdx: 1 },
        { type: 'multiple_choice', question: "¿Cómo te presentas por primera vez?", options: ["Goodbye!", "Hello, I am...", "Where is?"], correctIdx: 1 },
        { type: 'match_emoji', prompt: "Relaciona el saludo visualmente:", pairs: [{ emoji: "👋", text: "Hello" }, { emoji: "🤝", text: "Nice to meet you" }] },
        { type: 'fill_blank', beforeBlank: "Hello, I ", afterBlank: " Maria.", options: ["are", "am", "is"], correctWord: "am" },
        { type: 'fill_blank', beforeBlank: "Nice to ", afterBlank: " you!", options: ["meet", "eat", "see"], correctWord: "meet" }
      ],
      say: { promptPhrase: "Hello, I am [Tu Nombre]. Nice to meet you!" },
      own: { writingPrompt: "Preséntate escribiendo tu frase: Hello...", inputType: 'text' },
      recall: { 
        summaryFact: "Usa 'Hello, I am...' para presentarte y 'Nice to meet you' para ser educado.",
        activity: { type: 'fill_blank', beforeBlank: "Hello, I ", afterBlank: " Maria. Nice to meet you!", options: ["are", "am"], correctWord: "am" }
      }
    }
  },
  2: {
    day: 2, title: "Preguntando cómo estás",
    steps: {
      learn: { contentText: "Saludar es apenas la mitad de la historia. Pregunta 'Cómo estás' diciendo 'How are you?'." },
      try: [
        { type: 'listening', expectedAudioText: 'How are you?', question: '¿Qué te acaban de preguntar?', options: ["What time is it?", "How are you?"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "How ", afterBlank: " you?", options: ["am", "is", "are"], correctWord: "are" },
        { type: 'multiple_choice', question: "¿Qué frase sirve para preguntar cómo se encuentra alguien?", options: ["How are you?", "What time is it?"], correctIdx: 0 },
        { type: 'match_emoji', prompt: "Relaciona:", pairs: [{ emoji: "❓", text: "How are you?" }, { emoji: "👋", text: "Hello" }] }
      ],
      say: { promptPhrase: "Hello, how are you doing today?" },
      own: { writingPrompt: "Graba una nota de voz preguntándole a tu Buddy cómo está.", inputType: 'audio' },
      recall: { 
        summaryFact: "'How are you?' es la llave para iniciar conversaciones.",
        activity: { type: 'multiple_choice', question: "Repaso Día 1: ¿Cuál es correcto para presentarte?", options: ["Nice to look.", "I is Maria.", "I am Maria."], correctIdx: 2 }
       }
    }
  },
  3: {
    day: 3, title: "Hablando de emociones",
    steps: {
      learn: { contentText: "Conectemos con nuestras emociones. 'Happy' significa feliz y 'Sad' triste." },
      try: [
        { type: 'listening', expectedAudioText: 'I am so happy!', question: 'Presta atención al tono de voz. ¿Cómo se siente?', options: ["Sad", "Happy", "Are"], correctIdx: 1 },
        { type: 'match_emoji', prompt: "Conecta la emoción:", pairs: [{ emoji: "😄", text: "Happy" }, { emoji: "😢", text: "Sad" }] },
        { type: 'fill_blank', beforeBlank: "Today, I am very ", afterBlank: "!", options: ["shoes", "happy", "water"], correctWord: "happy" },
        { type: 'multiple_choice', question: "Si alguien tiene una gran noticia, probablemente está...", options: ["Happy", "Sad", "Fast"], correctIdx: 0 },
        { type: 'fill_blank', beforeBlank: "I ", afterBlank: " sad today.", options: ["am", "is", "are"], correctWord: "am" }
      ],
      say: { promptPhrase: "Thank you, I am very happy today!" },
      own: { writingPrompt: "Escribe cómo te sientes hoy usando 'I am...'", inputType: 'text' },
      recall: { 
        summaryFact: "Usa 'I am...' más la emoción. Recuerda, 'am' es exclusivamente para 'I' (Yo).",
        activity: { type: 'fill_blank', beforeBlank: "Hello! ", afterBlank: " are you? I am happy.", options: ["Who", "How", "What"], correctWord: "How" }
      }
    }
  },
  4: {
    day: 4, title: "Emociones de los demás",
    steps: {
      learn: { 
        contentText: "Identifica a los demás: Tired (Cansado) o Angry (Enojado). Pregunta si ELLOS lo están invirtiendo el verbo: 'Are you tired?'",
        pronunciationTip: { tip: "Are you fluído suena casi como 'Arya'.", soundA: "Are you", soundB: "Are you angry?" } 
      },
      try: [
        { type: 'listening', expectedAudioText: 'Are you tired?', question: 'Escucha la entonación final. ¿Afirmación o pregunta?', options: ["Afirmación", "Pregunta"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "", afterBlank: " you tired?", options: ["Is", "Are", "Am"], correctWord: "Are" },
        { type: 'match_emoji', prompt: "Emociones extremas:", pairs: [{ emoji: "🥱", text: "Tired" }, { emoji: "😡", text: "Angry" }] },
        { type: 'multiple_choice', question: "Si lleva 3 turnos seguidos en el trabajo, está:", options: ["Happy", "Angry", "Tired"], correctIdx: 2 },
        { type: 'fill_blank', beforeBlank: "Why are you so ", afterBlank: "?", options: ["angry", "run"], correctWord: "angry" },
        { type: 'listening', expectedAudioText: 'I am not angry, I am tired.', question: '¿Cuál es la verdad?', options: ["Está enojado.", "Está cansado y lo quieren confundir con enojo."], correctIdx: 1 }
      ],
      say: { promptPhrase: "Are you tired? You should go home and rest." },
      own: { writingPrompt: "Grábate preguntándole a alguien 'Are you angry?' y respóndete feliz.", inputType: 'audio' },
      recall: { 
        summaryFact: "La regla de oro del inglés es darle la vuelta al verbo para preguntar: 'I am' -> 'Am I?' y 'You are' -> 'Are you?'.",
        activity: { type: 'multiple_choice', question: "¿Cómo preguntas la emoción de alguien directamente?", options: ["You are happy?", "Are you happy?", "Is you happy?"], correctIdx: 1 }
      }
    }
  },
  5: {
    day: 5, title: "Los primeros números",
    steps: {
      learn: { contentText: "¡A contar! La base de la vida: One (1), Two (2), Three (3), Four (4), Five (5)." },
      try: [
        { type: 'match_emoji', prompt: "La barrera inicial:", pairs: [{ emoji: "1️⃣", text: "One" }, { emoji: "3️⃣", text: "Three" }] },
        { type: 'listening', expectedAudioText: 'I have four brothers.', question: '¿Acerca de qué habla?', options: ["Brazos", "Mascotas", "Hermanos"], correctIdx: 2 },
        { type: 'fill_blank', beforeBlank: "I have ", afterBlank: " apples (5).", options: ["five", "two"], correctWord: "five" },
        { type: 'match_emoji', prompt: "Pares dobles:", pairs: [{ emoji: "2️⃣", text: "Two" }, { emoji: "4️⃣", text: "Four" }] },
        { type: 'multiple_choice', question: "Si prestaste atención en mate: 1 + 2 = ...", options: ["Five", "Three", "Four"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I am number ", afterBlank: " (1)!", options: ["on", "one", "won"], correctWord: "one" }
      ],
      say: { promptPhrase: "Hello! I have three dogs and four cats." },
      own: { writingPrompt: "Demuestra tu pronunciación contando alto y claro del uno al cinco.", inputType: 'audio' },
      recall: { 
        summaryFact: "El sonido de 'th' en Three no es una T seca, sopla un poco de aire entre los dientes.",
        activity: { type: 'multiple_choice', question: "[Trampa Curricular] ¿Recuerdas cómo presentarte?", options: ["How you are?", "I are Maria.", "I am Maria."], correctIdx: 2 }
       }
    }
  },
  6: {
    day: 6, title: "Contando al 10",
    steps: {
      learn: { contentText: "La cima básica: Six (6), Seven (7), Eight (8), Nine (9), Ten (10)." },
      try: [
        { type: 'listening', expectedAudioText: 'Eight', question: 'No te dejes engañar por la escritura. ¿Qué dijo?', options: ["Hate", "Eight", "Ate"], correctIdx: 1 },
        { type: 'multiple_choice', question: "Mate simple: 5 + 2 =", options: ["Ten", "Seven", "Nine"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I see ", afterBlank: " dogs (6).", options: ["six", "ten", "blue"], correctWord: "six" },
        { type: 'match_emoji', prompt: "Altos números:", pairs: [{ emoji: "8️⃣", text: "Eight" }, { emoji: "🔟", text: "Ten" }, { emoji: "9️⃣", text: "Nine" }] },
        { type: 'multiple_choice', question: "Cuenta atrás: Ten, Nine, ...", options: ["Six", "Seven", "Eight"], correctIdx: 2 },
        { type: 'fill_blank', beforeBlank: "I am number ", afterBlank: " (9).", options: ["nine", "six", "nyne"], correctWord: "nine" }
      ],
      say: { promptPhrase: "I see seven dogs, but I want ten." },
      own: { writingPrompt: "Escribe la respuesta en letra a esto: 5 + 3 = ___", inputType: 'text' },
      recall: { 
        summaryFact: "Ten cuidado histórico al escribir Eight (la 'gh' es muda total).",
        activity: { type: 'fill_blank', beforeBlank: "One, Two, Three, Four, ", afterBlank: ", Six.", options: ["Five", "Fift", "Seven"], correctWord: "Five" }
      }
    }
  },
  7: {
    day: 7, title: "Números adolescentes",
    steps: {
      learn: { 
        contentText: "Los que más confunden al inicio: Eleven (11), Twelve (12), Thirteen (13), Fourteen (14), Fifteen (15).",
        pronunciationTip: { tip: "Nota cómo la fuerza de la voz explota en el 'TEEN'.", soundA: "THIR-teen", soundB: "FIF-teen" }
      },
      try: [
        { type: 'match_emoji', prompt: "Más rebeldes:", pairs: [{ emoji: "11", text: "Eleven" }, { emoji: "12", text: "Twelve" }] },
        { type: 'listening', expectedAudioText: 'Thirteen', question: '¿Se refirió a 30 o a 13?', options: ["Trece", "Treinta"], correctIdx: 0 },
        { type: 'fill_blank', beforeBlank: "She is ", afterBlank: " years old (15).", options: ["fifteen", "fiveteen", "fifty"], correctWord: "fifteen" },
        { type: 'multiple_choice', question: "Después del doce sigue el...", options: ["Thirteen", "Fourteen", "Eleven"], correctIdx: 0 },
        { type: 'match_emoji', prompt: "Aseguremos de 4:", pairs: [{ emoji: "13", text: "Thirteen" }, { emoji: "14", text: "Fourteen" }, { emoji: "15", text: "Fifteen" }] },
        { type: 'multiple_choice', question: "Diez más dos = ", options: ["Twelve", "Twenty", "Ten-two"], correctIdx: 0 }
      ],
      say: { promptPhrase: "There are twelve months in one year." },
      own: { writingPrompt: "Escribe: 'I have fourteen...', complétalo con cualquier objeto.", inputType: 'text' },
      recall: { 
        summaryFact: "A partir de los 13, observa cómo terminan en '-teen' (sonido agudo, y sí, significa 'adolescente').",
        activity: { type: 'fill_blank', beforeBlank: "Repaso Día 4: Are ", afterBlank: " tired?", options: ["I", "she", "you"], correctWord: "you" }
      }
    }
  },
  8: {
    day: 8, title: "Recta al Veinte",
    steps: {
      learn: { contentText: "Solo añade la navaja suiza 'teen': Sixteen (16), Seventeen (17), Eighteen (18), Nineteen (19)... ¡Twenty (20)!" },
      try: [
        { type: 'listening', expectedAudioText: 'He has eighteen cars.', question: 'Escucha bien. ¿Cuántos autos tiene?', options: ["80", "18"], correctIdx: 1 },
        { type: 'multiple_choice', question: "¿Cómo se dice 20 en la calle conversacional rápida?", options: ["Twon", "Tween", "Twenty (Tweny)"], correctIdx: 2 },
        { type: 'fill_blank', beforeBlank: "I have ", afterBlank: " dollars (18).", options: ["eighteen", "eight"], correctWord: "eighteen" },
        { type: 'match_emoji', prompt: "Une la antesala de veinte:", pairs: [{ emoji: "16", text: "Sixteen" }, { emoji: "19", text: "Nineteen" }] },
        { type: 'fill_blank', beforeBlank: "I am number ", afterBlank: " (20).", options: ["twelve", "twenty"], correctWord: "twenty" },
        { type: 'multiple_choice', question: "Restaurante: 'Table for...', ¿17 personas?", options: ["Seventy", "Seventeen"], correctIdx: 1 },
        { type: 'listening', expectedAudioText: 'Sixteen or Seventeen', question: 'Me diste un rango. ¿Cuál fue?', options: ["16 a 17", "60 a 70"], correctIdx: 0 }
      ],
      say: { promptPhrase: "I am number twenty, but she is number sixteen." },
      own: { writingPrompt: "Manda un audio diciendo 'Sixteen, Seventeen, Eighteen, Nineteen, Twenty!'.", inputType: 'audio' },
      recall: { 
        summaryFact: "Concéntrate en exagerar la N final en las decenas para que el oído no lo confunda.",
        activity: { type: 'multiple_choice', question: "¿Recuerdas la gran diferencia fonética que te enseñé?", options: ["Tweny es igual a Twin.", "Sixteen termina fuerte en 'N', Sixteen es débil."], correctIdx: 1 }
      }
    }
  },
  9: {
    day: 9, title: "Saltando de a Diez",
    steps: {
      learn: { 
        contentText: "Las decenas maduras NO terminan en 'teen', terminan rapido en '-ty'. Thirty (30), Forty (40), Fifty (50), Sixty (60).",
        pronunciationTip: { tip: "13 es THIR-TEEN. 30 es THIR-ty. Un golpe corto al inicio.", soundA: "Thirteen", soundB: "Thirty" }
      },
      try: [
        { type: 'fill_blank', beforeBlank: "I found ", afterBlank: " dollars (40).", options: ["fourty", "forty", "forte"], correctWord: "forty" },
        { type: 'listening', expectedAudioText: 'I need fifty minutes.', question: 'Viene una reunión. ¿Cuánto tiempo necesita?', options: ["15", "50", "5"], correctIdx: 1 },
        { type: 'match_emoji', prompt: "Decenas firmes:", pairs: [{ emoji: "30", text: "Thirty" }, { emoji: "60", text: "Sixty" }] },
        { type: 'multiple_choice', question: "¿Cuánto es 30 + 20 escrito en inglés?", options: ["Forty", "Fifty"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I see ", afterBlank: " cars on the road (50).", options: ["fifty", "fifteen"], correctWord: "fifty" },
        { type: 'listening', expectedAudioText: 'It is roughly forty miles.', question: '¿Cuál fue la distancia?', options: ["Fourteen (14)", "Forty (40)"], correctIdx: 1 }
      ],
      say: { promptPhrase: "The limit is fifty people, please respect it." },
      own: { writingPrompt: "¿Cuántos minutos en total toma un partido de fútbol? (Escríbelo en inglés).", inputType: 'text' },
      recall: { 
        summaryFact: "'Fifteen' (15) se estira al final, 'Fifty' (50) es como un chispazo rápido.",
        activity: { type: 'fill_blank', beforeBlank: "Ayer me preguntaste cómo estoy. Hoy yo te pregunto: ", afterBlank: " are you?", options: ["Who", "How", "Am"], correctWord: "How" }
       }
    }
  },
  10: {
    day: 10, title: "Llegando al Cien",
    steps: {
      learn: { contentText: "Nos falta el tramo final: Seventy (70), Eighty (80), Ninety (90), y por fin... One Hundred (100)!" },
      try: [
        { type: 'match_emoji', prompt: "Domina a los gigantes:", pairs: [{ emoji: "70", text: "Seventy" }, { emoji: "90", text: "Ninety" }, { emoji: "100", text: "One Hundred" }] },
        { type: 'fill_blank', beforeBlank: "That is ", afterBlank: " percent safe (100).", options: ["one hundred", "ten hundred"], correctWord: "one hundred" },
        { type: 'listening', expectedAudioText: 'Eighty percent of the time.', question: '¿Habló de probabilidad? ¿A qué porcentaje?', options: ["18%", "80%"], correctIdx: 1 },
        { type: 'multiple_choice', question: "Pagas una multa de 90 dólares...", options: ["Ninety dollars", "Nineteen dollars"], correctIdx: 0 },
        { type: 'fill_blank', beforeBlank: "My grandfather is ", afterBlank: " years old (70).", options: ["seventeen", "seventy"], correctWord: "seventy" }
      ],
      say: { promptPhrase: "Wow! That ticket costs one hundred dollars." },
      own: { writingPrompt: "Grabando nivel locutor: 'I am one hundred percent happy today!'", inputType: 'audio' },
      recall: { 
        summaryFact: "One Hundred te abre las puertas a cualquier cifra mayor. A partir de aquí todo es combinar y triunfar.",
        activity: { type: 'multiple_choice', question: "Rebobinando el Día 3: ¿Qué significa 'Angry' y 'Sad'?", options: ["Alegre y triste", "Enojado y feliz", "Enojado y triste"], correctIdx: 2 }
      }
    }
  },
  11: {
    day: 11, title: "¿Cuál es tu edad?",
    steps: {
      learn: { 
        contentText: "El error trampa #1 que rompe el cerebro hispano. En inglés NO 'tenemos' años; somos literalemente 'años viejos'. Prohibido usar 'have' (tener). Todo es con el verbo ser (I am). Ej: I am 25 years old.",
        pronunciationTip: { tip: "Years Old arrastra la 'S' a la vocal. Suena corrido: 'Year_sold'.", soundA: "Years old", soundB: "Yearzold" }
      },
      try: [
        { type: 'fill_blank', beforeBlank: "I ", afterBlank: " twenty years old.", options: ["have", "am", "is"], correctWord: "am" },
        { type: 'multiple_choice', question: "¿Detectas al espía? (La única frase correcta para un nativo):", options: ["I have twenty years.", "I are twenty years old.", "I am twenty years old."], correctIdx: 2 },
        { type: 'fill_blank', beforeBlank: "She ", afterBlank: " 30 years old.", options: ["is", "has", "have"], correctWord: "is" },
        { type: 'listening', expectedAudioText: 'I am fifty years old.', question: '¿Entendiste la edad?', options: ["15", "50", "I have 50"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "They ", afterBlank: " fifteen years old.", options: ["is", "are", "have"], correctWord: "are" },
        { type: 'multiple_choice', question: "Literalmente, ¿qué estamos diciendo cuando usamos 'years old'?", options: ["Tengo un cumpleaños.", "Soy tantos años viejo."], correctIdx: 1 }
      ],
      say: { promptPhrase: "I am twenty years old, and I am very happy." },
      own: { writingPrompt: "Escribe tu edad real, pero si prefieres métela disfrazada en inglés: 'I am ... years old'.", inputType: 'text' },
      recall: { 
        summaryFact: "Promesa solemne: El mayor error de todos es decir 'I have 20 years'. Tú jamás volverás a cometerlo.",
        activity: { type: 'fill_blank', beforeBlank: "Tú no 'tienes' años. I ", afterBlank: " twenty-five years old.", options: ["has", "am"], correctWord: "am" }
       }
    }
  },
  12: {
    day: 12, title: "Preguntando la edad del prójimo",
    steps: {
      learn: { contentText: "Igual que nosotros decimos ser viejos, le preguntamos a ellos '¿Qué tan viejos son?'. Usamos: 'How old are you?'." },
      try: [
        { type: 'multiple_choice', question: "Llega un niño y necesitas saber su edad. Disparas la frase:", options: ["What is your age?", "How old are you?", "How many years you have?"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "How ", afterBlank: " are you?", options: ["many", "old", "years"], correctWord: "old" },
        { type: 'listening', expectedAudioText: 'How old is he?', question: '¿Por quién están preguntando la edad?', options: ["Por ti", "Por una mujer", "Por un hombre (él)"], correctIdx: 2 },
        { type: 'match_emoji', prompt: "Conceptos vitales invertidos:", pairs: [{ emoji: "🎂", text: "Years old" }, { emoji: "❓", text: "How old" }] },
        { type: 'fill_blank', beforeBlank: "How old ", afterBlank: " she?", options: ["is", "are"], correctWord: "is" },
        { type: 'multiple_choice', question: "Quiero preguntar por la edad de 'ellos':", options: ["How old are they?", "How old are you?", "They have years?"], correctIdx: 0 }
      ],
      say: { promptPhrase: "Excuse me buddy, how old are you?" },
      own: { writingPrompt: "Ponte loco. Manda un audio fingiendo ser un policía preguntando 'How old are you?' muy severamente.", inputType: 'audio' },
      recall: { 
        summaryFact: "Piensa en la palabra 'Old' siempre. El inglés envuelve la edad sobre el tiempo acumulado.",
        activity: { type: 'multiple_choice', question: "Repaso profundo: 'Eighty' y 'Eighteen', ¿cuál es cuál?", options: ["80 y 18", "18 y 80"], correctIdx: 0 }
      }
    }
  },
  // Day 13 to 20 expanded massively below following the schema limits.
  13: {
    day: 13, title: "Pintando el mundo de color",
    steps: {
      learn: { contentText: "Entremos al espectro. Red (Rojo), Blue (Azul), Green (Verde), Yellow (Amarillo). Recuerda que en inglés el color define primero, luego la cosa: 'A red car', y jamás 'A car red'." },
      try: [
        { type: 'match_emoji', prompt: "Relaciona la cromaticidad:", pairs: [{ emoji: "🟦", text: "Blue" }, { emoji: "🟩", text: "Green" }] },
        { type: 'fill_blank', beforeBlank: "The hot sun is ", afterBlank: ".", options: ["red", "yellow", "blue"], correctWord: "yellow" },
        { type: 'listening', expectedAudioText: 'I want the red car.', question: '¿Cuál es el error común que el audio NO comete?', options: ["Decir the car red", "Decir I want", "Decir red"], correctIdx: 0 },
        { type: 'match_emoji', prompt: "Colores calientes:", pairs: [{ emoji: "🟥", text: "Red" }, { emoji: "🟨", text: "Yellow" }] },
        { type: 'fill_blank', beforeBlank: "I see a ", afterBlank: " bird flying.", options: ["blue", "read"], correctWord: "blue" },
        { type: 'fill_blank', beforeBlank: "Look at the ", afterBlank: " grass.", options: ["green", "yellow"], correctWord: "green" }
      ],
      say: { promptPhrase: "The sky is blue today and the sun is yellow." },
      own: { writingPrompt: "Describe sin pena la mesa o la sábana que tienes enfrente, integrando su color (Ej. My cup is green).", inputType: 'text' },
      recall: { 
        summaryFact: "Lo invertido tiene sentido táctico. En inglés previsualizamos la propiedad, y luego la aplicamos al objeto.",
        activity: { type: 'fill_blank', beforeBlank: "Regla del adjetivo: A ", afterBlank: " car.", options: ["car red", "red car"], correctWord: "red" }
      }
    }
  },
  14: {
    day: 14, title: "Declarando tu favorito",
    steps: {
      learn: { contentText: "Expresa tu identidad al máximo usando: 'My favorite color is...'" },
      try: [
        { type: 'fill_blank', beforeBlank: "My ", afterBlank: " color is green.", options: ["love", "favorite", "most"], correctWord: "favorite" },
        { type: 'listening', expectedAudioText: 'His favorite color is yellow.', question: 'Escucha este cambio de pronombre. ¿A quién le gusta el amarillo?', options: ["A ti", "A ella", "A él"], correctIdx: 2 },
        { type: 'multiple_choice', question: "Defiende cuál de estas dos construcciones es nativa:", options: ["I love the green color.", "My favorite color is green."], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "Her favorite color ", afterBlank: " red.", options: ["are", "is"], correctWord: "is" },
        { type: 'fill_blank', beforeBlank: "What ", afterBlank: " your favorite color?", options: ["is", "are", "do"], correctWord: "is" }
      ],
      say: { promptPhrase: "Hi! I am twenty years old and my favorite color is orange." },
      own: { writingPrompt: "Demuestra tu progreso holístico grabando: 'My name is [Nombre], I am [Edad] years old and my favorite color is [Color]'.", inputType: 'audio' },
      recall: { 
        summaryFact: "El posesivo 'My' ancla las cosas directo a tu corazón, y puedes usar 'favorite' para comida, películas, etc.",
        activity: { type: 'multiple_choice', question: "Viaje al pasado (Día 11): ¿Qué dice un nativo para expresar que tiene cuarenta de edad?", options: ["I have forty years.", "I are forty old.", "I am forty years old."], correctIdx: 2 }
       }
    }
  },
  15: {
    day: 15, title: "Los lazos de Familia",
    steps: {
      learn: { 
        contentText: "El núcleo duro: Mother (Madre), Father (Padre), Sister (Hermana), Brother (Hermano).",
        pronunciationTip: { tip: "El sonido de 'th' en Mother/Father no es una D hispana fuerte. Es como una 'd' rozando los dientes y dejando escapar aire suavemente.", soundA: "Mother", soundB: "Father" }
      },
      try: [
        { type: 'match_emoji', prompt: "Núcleos parentales:", pairs: [{ emoji: "👩‍👧‍👦", text: "Mother" }, { emoji: "👨‍👦", text: "Father" }] },
        { type: 'fill_blank', beforeBlank: "He is my ", afterBlank: " (Hermano).", options: ["brother", "sister"], correctWord: "brother" },
        { type: 'listening', expectedAudioText: 'She is my sister.', question: 'Estás deduciendo relaciones de género. ¿Qué dijo el audio?', options: ["A mi madre", "A un hombre", "A una chica hermana"], correctIdx: 2 },
        { type: 'match_emoji', prompt: "Descendencia compartida:", pairs: [{ emoji: "👧", text: "Sister" }, { emoji: "👦", text: "Brother" }] },
        { type: 'fill_blank', beforeBlank: "I have one ", afterBlank: " and one brother.", options: ["sister", "father"], correctWord: "sister" },
        { type: 'multiple_choice', question: "¿Quién es 'He' (Él)?", options: ["Mother", "Father", "Sister"], correctIdx: 1 }
      ],
      say: { promptPhrase: "I am very happy, I have one brother and one sister!" },
      own: { writingPrompt: "Redacta tu primer texto personal detallando cuántos hermanos tienes reales (Ej: I have two brothers).", inputType: 'text' },
      recall: { 
        summaryFact: "El plural de 'Brother' puede ser 'Brothers', pero el de 'Sibling' ya cubre ambos (Hermanos/as en masa).",
        activity: { type: 'fill_blank', beforeBlank: "Conexiones cruzadas (Día 5): I have ", afterBlank: " (5) sisters.", options: ["five", "two"], correctWord: "five" }
      }
    }
  },
  16: {
    day: 16, title: "Enseñando fotografías",
    steps: {
      learn: { contentText: "Estás en el dentista, sacas el celular y muestras la foto familiar. Aquí usas obligatoriamente la frase 'This is my...' asegurando cercanía espacial." },
      try: [
        { type: 'fill_blank', beforeBlank: "This ", afterBlank: " my mother.", options: ["are", "is", "am"], correctWord: "is" },
        { type: 'multiple_choice', question: "¿Qué estructura es mejor para exhibir a alguien de cerca en una imagen?", options: ["This is my...", "Look my..."], correctIdx: 0 },
        { type: 'listening', expectedAudioText: 'This is my father, he is sad.', question: 'Audición Doble. ¿Qué nos dijo el audio?', options: ["Es su papá y está enojado", "Es su hermano y está triste", "Es su padre y está triste"], correctIdx: 2 },
        { type: 'fill_blank', beforeBlank: "This is ", afterBlank: " brother.", options: ["my", "me"], correctWord: "my" },
        { type: 'multiple_choice', question: "¿Por qué decimos 'This is' y no 'They are' en una foto individual?", options: ["Porque es singular (1 persona)", "Porque es plural"], correctIdx: 0 },
        { type: 'fill_blank', beforeBlank: "This is my sister, ", afterBlank: " is ten years old.", options: ["he", "she"], correctWord: "she" }
      ],
      say: { promptPhrase: "This is my mother, she is fifty years old and she is happy." },
      own: { writingPrompt: "Ubica a tu gato, tu mamá, tu perro, lo que quieras en tu mente, y preséntamelo por audio con 'This is my...'.", inputType: 'audio' },
      recall: { 
        summaryFact: "El 'This' es tu dedo digital apuntando directamente a algo que posees espacialmente.",
        activity: { type: 'multiple_choice', question: "Traición Aleatoria: ¿Qué significa exactamente 'Are you tired?'", options: ["Tengo sueño", "¿Estás cansado?", "¿Ellos están cansados?"], correctIdx: 1 }
       }
    }
  },
  17: {
    day: 17, title: "Declarando aficiones (Me gusta, te gusta)",
    steps: {
      learn: { contentText: "Hagamos el paso más grande interaccional: Expresar gusto personal. En el inglés, la construcción es ultra directa; nosotros usamos 'I like...' directo acoplado a la cosa." },
      try: [
        { type: 'multiple_choice', question: "¿Detectas al nativo?:", options: ["I like the pizza.", "Me like pizza.", "I like pizza."], correctIdx: 2 },
        { type: 'fill_blank', beforeBlank: "I ", afterBlank: " blue apples.", options: ["likes", "like", "liking"], correctWord: "like" },
        { type: 'listening', expectedAudioText: 'I like green cars.', question: 'Combinamos gustos y colores, ¿qué ama él?', options: ["Carros verdes", "Sábanas rojas"], correctIdx: 0 },
        { type: 'match_emoji', prompt: "Asignación psicológica:", pairs: [{ emoji: "👍", text: "I like" }, { emoji: "😋", text: "Yummy" }] },
        { type: 'fill_blank', beforeBlank: "She ", afterBlank: " pizza very much.", options: ["like", "likes"], correctWord: "likes" },
        { type: 'multiple_choice', question: "Dato de gramática: Si hablas de ELLA (she), ¿qué le pasa a 'like'?", options: ["Se vuelve liking", "Recibe una S al final (likes)"], correctIdx: 1 }
      ],
      say: { promptPhrase: "Hello buddy! I really like coffee in the morning and I like blue." },
      own: { writingPrompt: "Obligatorio: Escribe una oración detallando un hobby o comida que amas usando 'I like... y tu color favorito'.", inputType: 'text' },
      recall: { 
        summaryFact: "'Like' suena seco en la boca y jamás requiere un preámbulo extraño de sujeto invertido como ocurre en el español ('A mi me'). Simplemente: Yo gusto. I Like.",
        activity: { type: 'fill_blank', beforeBlank: "(Día 1) El gran origen... Nice to ", afterBlank: " you!", options: ["eat", "meet"], correctWord: "meet" }
       }
    }
  },
  18: {
    day: 18, title: "Poniendo Límites (No me gusta)",
    steps: {
      learn: { contentText: "Saber rechazar es igual de importante. Solo inyecta el martillo de la negación: 'don't' entre el Yo y el gusto. Resultado magistral: I don't like..." },
      try: [
        { type: 'fill_blank', beforeBlank: "I ", afterBlank: " like cold weather.", options: ["not", "don't", "no"], correctWord: "don't" },
        { type: 'listening', expectedAudioText: 'He doesn\'t like red.', question: 'Presta atención al espía (Doesn\'t en vez de don\'t). ¿De quién habla?', options: ["De Mí (Yo)", "De Él"], correctIdx: 1 },
        { type: 'multiple_choice', question: "Significado subyacente de 'I don't like rain':", options: ["Odio la lluvia furiosamente.", "No me gusta la lluvia."], correctIdx: 1 },
        { type: 'match_emoji', prompt: "Rechazos binarios:", pairs: [{ emoji: "👎🏼", text: "Don't like" }, { emoji: "👍🏼", text: "Like" }] },
        { type: 'fill_blank', beforeBlank: "We ", afterBlank: " like sad movies.", options: ["don't", "isn't"], correctWord: "don't" },
        { type: 'multiple_choice', question: "¿De dónde demonios sale el 'don't'?", options: ["Es magia celta.", "Es la contracción veloz de 'Do Not'."], correctIdx: 1 }
      ],
      say: { promptPhrase: "To be completely honest with you, I don't like cold weather." },
      own: { writingPrompt: "Destroza algo feo. Manda tu audio más honesto del curso quejándote de algo usando 'I don't like...'", inputType: 'audio' },
      recall: { 
        summaryFact: "Don't es la vida inglesa. Es crudo y rápido. El 'not' separado suele sonar súper robótico.",
        activity: { type: 'multiple_choice', question: "¿Trampa 40 o 14?, Si ves escrito 'Fourteen', es...", options: ["14", "40"], correctIdx: 0 }
      }
    }
  },
  19: {
    day: 19, title: "Día Final Pre-Examen: La Gran Síntesis",
    steps: {
      learn: { contentText: "Tu cerebro ya alambró el verbo To Be, sentimientos, numeración alta y preferencias. En este simulador usarás todo como conectores lego de alta presión." },
      try: [
        { type: 'fill_blank', beforeBlank: "Hello, I ", afterBlank: " Maria.", options: ["are", "am"], correctWord: "am" },
        { type: 'fill_blank', beforeBlank: "I am twenty ", afterBlank: " old.", options: ["years", "has", "year"], correctWord: "years" },
        { type: 'listening', expectedAudioText: 'I am angry because I don\'t like yellow.', question: 'Combinación brutal. Dijo cómo se sentía y el porqué. ¿Qué entendiste?', options: ["Está feliz y quiere amarillo.", "Está molesto y no le gusta el amarillo."], correctIdx: 1 },
        { type: 'match_emoji', prompt: "Repaso mental relámpago:", pairs: [{ emoji: "👋", text: "Hello" }, { emoji: "🎂", text: "Age" }, { emoji: "👍", text: "I like" }, { emoji: "👎", text: "I don't" }] },
        { type: 'fill_blank', beforeBlank: "This is my mother, she ", afterBlank: " fifty years old.", options: ["is", "are", "have"], correctWord: "is" },
        { type: 'fill_blank', beforeBlank: "My favorite color is red, and I ", afterBlank: " pizza very much.", options: ["likes", "like", "not"], correctWord: "like" },
        { type: 'multiple_choice', question: "¿Puedes detectar la que NO tiene error gramatical de español?", options: ["I have tired.", "I am twelve years old.", "I like the color of blue."], correctIdx: 1 }
      ],
      say: { promptPhrase: "Hello everybody! I am thirty years old, I have two brothers and I don't like blue." },
      own: { writingPrompt: "Escribe tu párrafo definitivo entrelazando 3 frases sin parar (Ej. Hola, yo soy, tengo años, mi color favorito).", inputType: 'text' },
      recall: { 
        summaryFact: "Aprender un lenguaje no es memorizar diccionarios aislados e infinitos, es ganar pericia armando bloques lego una y otra vez con total libertad.",
        activity: { type: 'fill_blank', beforeBlank: "Si te pregunto: 'How ", afterBlank: " are you?' me respondes con un número.", options: ["old", "many", "is"], correctWord: "old" }
       }
    }
  },
  20: {
    day: 20, title: "El Gran Juicio (Graduación)",
    steps: {
      learn: { contentText: "Terminaste. Has construido de forma empírica y guiada las bases para presentarte y conversar en Inglés ante el mundo. ¡Despliega tu magia final para ganar tu insignia definitiva!" },
      try: [
        { type: 'multiple_choice', question: "¿Cuál es la única manera correcta de afrontar ensayos conversacionales?", options: ["Aterrorizado buscando perfección gramatical.", "Seguro, divirtiéndote y abrazando tus equivocaciones lógicas."], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I got ", afterBlank: "!", options: ["this", "lost", "nothing"], correctWord: "this" },
        { type: 'listening', expectedAudioText: 'Congratulations. You are amazing and I am so happy for you.', question: 'Mensaje de parte de tu Coach:', options: ["Que desistes.", "Que estoy ultra felíz por ti, felicidades."], correctIdx: 1 }
      ],
      say: { promptPhrase: "Hello! I am [Nombre]. I am [Edad] years old. This is my [Familiar]. My favorite color is [Color], and honestly I like [Gusto]. Nice to meet you perfectly!" },
      own: { writingPrompt: "APRIETA GRABAR: Cuéntanos TODO sobre ti uniendo lo de los últimos 20 días en una sola toma épica de audio sin miedo.", inputType: 'audio' },
      recall: { 
        summaryFact: "¡Has cruzado la meta! El abismo real y más infranqueable que divide a los estancados de las leyendas bilingües, radica en el terror a hablar. Tú lo cruzaste rompiéndote a grabaciones de la mano de un método iterativo.",
        activity: { type: 'multiple_choice', question: "Evaluación Crítica final: A partir de HOY, si alguien te grita un saludo en la calle, te pregunta tu edad, te indica qué le gusta y te presenta a su hermana...", options: ["Me quedo en shock pensando en la gramática", "Comprendes y respondes las bases del 90% con fluidez nativa y atajo cerebral"], correctIdx: 1 }
      }
    }
  }
};

export function getLesson(day: number): LessonContent | undefined {
  return LESSONS[day];
}
