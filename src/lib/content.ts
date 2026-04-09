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
    day: 1, title: "Saludos Básicos",
    steps: {
      learn: { 
        contentText: "¡Bienvenido a Study Buddy! Aprenderemos a presentarnos usando 'Hello' o 'Hi', y 'My name is...'.",
        pronunciationTip: { tip: "Nota cómo la 'H' en Hello suena como una suave aspiración (como echando vaho).", soundA: "Hello", soundB: "Hi" }
      },
      try: [
        { type: 'match_emoji', prompt: "Relaciona el saludo:", pairs: [{ emoji: "👋", text: "Hello" }, { emoji: "🤝", text: "Nice to meet you" }] },
        { type: 'multiple_choice', question: "Llegas casualmente, ¿cuál es la mejor forma de empezar?", options: ["My name", "Hi", "Bye"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "Hi, my name ", afterBlank: " Lily.", options: ["is", "are", "am"], correctWord: "is" },
        { type: 'listening', expectedAudioText: 'Hello, my name is John.', question: 'Escucha el audio: ¿Cuál es el nombre de la persona que habla?', options: ["Pedro", "John"], correctIdx: 1 },
        { type: 'multiple_choice', question: "¿Qué suena más natural y correcto?", options: ["Name is I", "My name is..."], correctIdx: 1 }
      ],
      say: { promptPhrase: "Hello, my name is [Tu Nombre]. Nice to meet you!" },
      own: { writingPrompt: "Escribe tu presentación real: 'Hi, my name is...'", inputType: 'text' },
      recall: { 
        summaryFact: "Usa 'Hello' o 'Hi' para saludar, seguido directa y sencillamente de 'My name is'.",
        activity: { type: 'fill_blank', beforeBlank: "Hello, ", afterBlank: " name is Ana.", options: ["my", "I"], correctWord: "my" }
      }
    }
  },
  2: {
    day: 2, title: "¿Cómo estás?",
    steps: {
      learn: { contentText: "Saludar es solo la mitad. Pregunta '¿Cómo estás?' diciendo 'How are you?'. Puedes responder: I'm fine (bien), tired (cansado/a), nervous (nervioso/a), happy (feliz) o sad (triste)." },
      try: [
        { type: 'match_emoji', prompt: "Une estados de ánimo:", pairs: [{ emoji: "😴", text: "tired" }, { emoji: "😅", text: "nervous" }, { emoji: "🙂", text: "fine" }] },
        { type: 'fill_blank', beforeBlank: "Hello, how ", afterBlank: " you?", options: ["are", "is", "am"], correctWord: "are" },
        { type: 'multiple_choice', question: "Tuviste un día pesadísimo de mucho trabajo, tu respuesta es:", options: ["I'm fine", "I'm sad", "I'm tired"], correctIdx: 2 },
        { type: 'listening', expectedAudioText: 'I am very nervous.', question: 'Escucha la voz: ¿Cómo se siente realmente?', options: ["Happy", "Nervous"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "Hi, ", afterBlank: " name is John and I'm happy.", options: ["my", "you", "fine"], correctWord: "my" }
      ],
      say: { promptPhrase: "Hi, how are you? I'm fine today!" },
      own: { writingPrompt: "Graba una nota de voz preguntándole a tu Buddy cómo está.", inputType: 'audio' },
      recall: { 
        summaryFact: "'How are you?' es clave. Responde siempre con 'I am' o 'I'm' seguido de la emoción.",
        activity: { type: 'match_emoji', prompt: "Emociones extra:", pairs: [{ emoji: "😄", text: "happy" }, { emoji: "😢", text: "sad" }] }
      }
    }
  },
  3: {
    day: 3, title: "Números 1, 2 y 3",
    steps: {
      learn: { contentText: "Introducción a los números básicos: One (1), Two (2), Three (3)." },
      try: [
        { type: 'match_emoji', prompt: "Relaciona:", pairs: [{ emoji: "1️⃣", text: "One" }, { emoji: "2️⃣", text: "Two" }, { emoji: "3️⃣", text: "Three" }] },
        { type: 'multiple_choice', question: "Tienes un café y un té en la mesa. ¿En total cuántas bebidas tienes?", options: ["One", "Two", "Three"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I have ", afterBlank: " dogs (3).", options: ["one", "two", "three"], correctWord: "three" },
        { type: 'listening', expectedAudioText: 'Three, Two, One.', question: '¿En qué orden están contando?', options: ["Para arriba (1,2,3)", "Cuenta regresiva (3,2,1)"], correctIdx: 1 },
        { type: 'multiple_choice', question: "Suma simple: One + Two = ", options: ["Three", "One", "Two"], correctIdx: 0 }
      ],
      say: { promptPhrase: "One, two, three!" },
      own: { writingPrompt: "Cuenta del 1 al 3 en un audio grabando tu pronunciación.", inputType: 'audio' },
      recall: { 
        summaryFact: "Recuerda que 'Three' suena con una sutil 'z', no con una 't' fuerte.",
        activity: { type: 'fill_blank', beforeBlank: "Repaso: I ", afterBlank: " happy! (Feliz)", options: ["are", "am"], correctWord: "am" }
      }
    }
  },
  4: {
    day: 4, title: "Números 4, 5 y 6",
    steps: {
      learn: { contentText: "Continuemos contando: Four (4), Five (5), Six (6)." },
      try: [
        { type: 'match_emoji', prompt: "Acomoda:", pairs: [{ emoji: "4️⃣", text: "Four" }, { emoji: "5️⃣", text: "Five" }, { emoji: "6️⃣", text: "Six" }] },
        { type: 'multiple_choice', question: "Five equivale a qué número:", options: ["15", "5", "50"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "The car has ", afterBlank: " wheels (4).", options: ["two", "four", "six"], correctWord: "four" },
        { type: 'listening', expectedAudioText: 'He has five apples.', question: '¿Cuántas manzanas tiene?', options: ["4", "5", "6"], correctIdx: 1 },
        { type: 'multiple_choice', question: "Matemática rápida: Two + Two =", options: ["Six", "Three", "Four"], correctIdx: 2 }
      ],
      say: { promptPhrase: "I have four books, five apples and six pens." },
      own: { writingPrompt: "Escribe 3 frases sencillas diciendo cuántas cosas ves: 'I see four...'", inputType: 'text' },
      recall: { 
        summaryFact: "Four, Five y Six amplían tu visión para hacer inventarios rápidos del mundo a tu alrededor.",
        activity: { type: 'fill_blank', beforeBlank: "Repaso Día 2: Are you ", afterBlank: "? (Cansado)", options: ["tired", "six", "four"], correctWord: "tired" }
      }
    }
  },
  5: {
    day: 5, title: "Números 7 al 10",
    steps: {
      learn: { contentText: "Cerrando el primer bloque: Seven (7), Eight (8), Nine (9), Ten (10). ¡Y haremos un repaso del 1 al 10!" },
      try: [
        { type: 'match_emoji', prompt: "Relaciona:", pairs: [{ emoji: "7️⃣", text: "Seven" }, { emoji: "9️⃣", text: "Nine" }, { emoji: "🔟", text: "Ten" }] },
        { type: 'fill_blank', beforeBlank: "I see ", afterBlank: " stars (8).", options: ["eight", "seven", "ten"], correctWord: "eight" },
        { type: 'multiple_choice', question: "Cuenta atrás: Ten, Nine...", options: ["Seven", "Eight", "Four"], correctIdx: 1 },
        { type: 'listening', expectedAudioText: 'Seven', question: 'No te dejes engañar. ¿Qué número escuchas?', options: ["7", "11", "9"], correctIdx: 0 },
        { type: 'fill_blank', beforeBlank: "Five + Five = ", afterBlank: "", options: ["eight", "ten", "nine"], correctWord: "ten" }
      ],
      say: { promptPhrase: "Seven, eight, nine, ten!" },
      own: { writingPrompt: "Demuestra tu progreso contando en audio rápido del 1 al 10.", inputType: 'audio' },
      recall: { 
        summaryFact: "La base decimal es fundamental. Ten mucho cuidado fonético al decir 'Eight', ya que se pronuncia /eit/ seco.",
        activity: { type: 'multiple_choice', question: "Repaso Total (1-10): Five + Two =", options: ["Seven", "Nine", "Ten"], correctIdx: 0 }
      }
    }
  },
  6: {
    day: 6, title: "Números Adolescentes (Teens)",
    steps: {
      learn: { 
        contentText: "Del 11 al 19. Eleven (11), Twelve (12), Thirteen (13), Fourteen (14). A partir del 13 observa el patrón '-teen' (sonido largo).",
        pronunciationTip: { tip: "Ese -TEEN estirado ayuda a no confundir, por ejemplo, 14 con 40.", soundA: "Thirteen", soundB: "Fourteen" }
      },
      try: [
        { type: 'match_emoji', prompt: "Los rebeldes:", pairs: [{ emoji: "11", text: "Eleven" }, { emoji: "12", text: "Twelve" }] },
        { type: 'listening', expectedAudioText: 'Thirteen', question: '¿Escuchas un número joven (teen) del 13-19, o redondo de decenas?', options: ["Joven (13)", "Decena (30)"], correctIdx: 0 },
        { type: 'fill_blank', beforeBlank: "I have ", afterBlank: " years (15) ... ¡Ouch! Error, espera a aprender la edad después, usa: I see 15 cars.", options: ["fifteen", "fiveteen", "ten"], correctWord: "fifteen" },
        { type: 'multiple_choice', question: "Después del 18 (Eighteen) viene el...", options: ["Seventeen", "Nineteen", "Twenty"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "Ten + Two is ", afterBlank: ".", options: ["twelve", "eleven", "fourteen"], correctWord: "twelve" }
      ],
      say: { promptPhrase: "Eleven, twelve, thirteen, fourteen, fifteen!" },
      own: { writingPrompt: "Responde: ¿Cuál es el número que va entre 16 y 18 escrito en letra?", inputType: 'text' },
      recall: { 
        summaryFact: "Todos los números del 13 al 19 terminan en -teen.",
        activity: { type: 'multiple_choice', question: "Repaso Día 2: ¿Cómo dices que estás triste?", options: ["I'm happy", "I'm nervous", "I'm sad"], correctIdx: 2 }
      }
    }
  },
  7: {
    day: 7, title: "Las primeras decenas",
    steps: {
      learn: { contentText: "Decenas firmes y rápidas: Twenty (20), Thirty (30), Forty (40). A diferencia de 'teen', las decenas terminan en '-ty' rápido." },
      try: [
        { type: 'match_emoji', prompt: "Decenas:", pairs: [{ emoji: "20", text: "Twenty" }, { emoji: "30", text: "Thirty" }, { emoji: "40", text: "Forty" }] },
        { type: 'fill_blank', beforeBlank: "I found ", afterBlank: " dollars (40).", options: ["forty", "fourteen", "two"], correctWord: "forty" },
        { type: 'listening', expectedAudioText: 'Thirty minutes left.', question: '¿Cúanto tiempo queda?', options: ["13 minutos", "30 minutos"], correctIdx: 1 },
        { type: 'multiple_choice', question: "Ten + Ten = ", options: ["Twenty", "Thirty", "Forty"], correctIdx: 0 },
        { type: 'fill_blank', beforeBlank: "We need ", afterBlank: " chairs (30).", options: ["thirteen", "thirty", "twelve"], correctWord: "thirty" }
      ],
      say: { promptPhrase: "I need twenty, thirty or forty minutes." },
      own: { writingPrompt: "Graba un audio diciendo: 'Ten, twenty, thirty, forty'.", inputType: 'audio' },
      recall: { 
        summaryFact: "Evita la 'u' en Forty (No escribimos Fourty). Es F-O-R-T-Y.",
        activity: { type: 'multiple_choice', question: "Crucemos decenas y saludo inicial:", options: ["Hi, thirty!", "Hi, I am tired.", "Hello forty name is."], correctIdx: 1 }
      }
    }
  },
  8: {
    day: 8, title: "Decenas Altas",
    steps: {
      learn: { contentText: "Completamos el combo: Fifty (50), Sixty (60), Seventy (70), Eighty (80), Ninety (90)." },
      try: [
        { type: 'match_emoji', prompt: "Relaciona alto:", pairs: [{ emoji: "50", text: "Fifty" }, { emoji: "80", text: "Eighty" }] },
        { type: 'fill_blank', beforeBlank: "I see ", afterBlank: " birds (70).", options: ["seventeen", "seventy", "seve"], correctWord: "seventy" },
        { type: 'listening', expectedAudioText: 'Ninety dollars.', question: 'Precio final...', options: ["19 dólares", "90 dólares"], correctIdx: 1 },
        { type: 'multiple_choice', question: "Si Forty es 40, y Fifty es 50, ¿Qué es Sixty?", options: ["16", "6", "60"], correctIdx: 2 },
        { type: 'fill_blank', beforeBlank: "She has ", afterBlank: " books (80).", options: ["eighty", "seven", "nine"], correctWord: "eighty" }
      ],
      say: { promptPhrase: "Fifty, sixty, seventy, eighty, ninety!" },
      own: { writingPrompt: "Escribe en letra cuánto es: Cuarenta más cuarenta.", inputType: 'text' },
      recall: { 
        summaryFact: "Al igual que con el 40, presta atención a la terminación -ty que es corta y seca.",
        activity: { type: 'multiple_choice', question: "¿Recuerdas la diferencia crucial?", options: ["Sixty (60) vs Sixteen (16)", "Sixty es 6"], correctIdx: 0 }
      }
    }
  },
  9: {
    day: 9, title: "Combinando Números",
    steps: {
      learn: { contentText: "Llegó la hora de unirlos: 21 es Twenty-one, 34 es Thirty-four, 56 es Fifty-six, 68 es Sixty-eight." },
      try: [
        { type: 'multiple_choice', question: "¿Cómo dirías 21?", options: ["Two-one", "Twenty-one", "Twelve-one"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I need ", afterBlank: " pencils (34).", options: ["thirty-four", "four-thirty"], correctWord: "thirty-four" },
        { type: 'listening', expectedAudioText: 'Fifty-six.', question: 'Identifica los bloques que componen el número:', options: ["50 y 6", "15 y 60"], correctIdx: 0 },
        { type: 'match_emoji', prompt: "Acomoda:", pairs: [{ emoji: "68", text: "Sixty-eight" }, { emoji: "56", text: "Fifty-six" }] },
        { type: 'fill_blank', beforeBlank: "We have ", afterBlank: " tickets. (21)", options: ["twenty-one", "thirty", "ten"], correctWord: "twenty-one" }
      ],
      say: { promptPhrase: "Twenty-one, thirty-four, fifty-six, sixty-eight." },
      own: { writingPrompt: "Inventa 2 números aleatorios del 22 al 99 y envíalos pronunciados por audio.", inputType: 'audio' },
      recall: { 
        summaryFact: "Observa siempre el guion (-) medio entre las decenas y las unidades.",
        activity: { type: 'fill_blank', beforeBlank: "Repaso de saludos: ", afterBlank: " name is Ana.", options: ["My", "I am"], correctWord: "My" }
      }
    }
  },
  10: {
    day: 10, title: "Diciendo la Edad",
    steps: {
      learn: { contentText: "Nunca usamos 'tengo años'. Decimos 'Yo soy ... años viejo'. Usa la fórmula magistral: I'm + age." },
      try: [
        { type: 'multiple_choice', question: "¿Cuál es la expresión correcta para decir que tienes 25 años?", options: ["I have twenty-five years.", "I'm twenty-five.", "My years are 25."], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I ", afterBlank: " thirty-four.", options: ["have", "am", "is"], correctWord: "am" },
        { type: 'listening', expectedAudioText: 'I am forty years old.', question: '¿Cuál es su edad?', options: ["14", "40", "40 años viejo (Literal)"], correctIdx: 2 },
        { type: 'match_emoji', prompt: "Relaciona:", pairs: [{ emoji: "🎂 21", text: "I'm twenty-one" }, { emoji: "🎂 56", text: "I'm fifty-six" }] },
        { type: 'fill_blank', beforeBlank: "She ", afterBlank: " sixty-eight years old.", options: ["is", "have", "am"], correctWord: "is" }
      ],
      say: { promptPhrase: "I am twenty-five years old." },
      own: { writingPrompt: "Escribe tu edad real usando: I'm [Número en Letra].", inputType: 'text' },
      recall: { 
        summaryFact: "Es el error más común del hispanohablante. Jamás usarás HAVE para la edad de nuevo.",
        activity: { type: 'multiple_choice', question: "Pregunta cruzada: ¿Cómo saludas a alguien por primera vez y das tu edad?", options: ["Hello, I have 30.", "Hi, my name is John and I'm thirty."], correctIdx: 1 }
      }
    }
  },
  11: {
    day: 11, title: "Quiero y Necesito",
    steps: {
      learn: { contentText: "Introducción a los verbos 'I want' (Yo quiero) e 'I need' (Yo necesito). Expresa tus necesidades y deseos básicos sin rodeos." },
      try: [
        { type: 'match_emoji', prompt: "Deseo vs Necesidad:", pairs: [{ emoji: "🤩🎁", text: "I want" }, { emoji: "🆘💊", text: "I need" }] },
        { type: 'fill_blank', beforeBlank: "I ", afterBlank: " sleep. (Necesito de urgencia)", options: ["want", "need", "am"], correctWord: "need" },
        { type: 'multiple_choice', question: "En una tienda y quieres comprar algo no esencial, usarías:", options: ["I need", "I want"], correctIdx: 1 },
        { type: 'listening', expectedAudioText: 'I need water.', question: 'Escucha atentamente. ¿Es un deseo o una necesidad de sobrevivir?', options: ["Deseo (want)", "Necesidad (need)"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I ", afterBlank: " a new car.", options: ["want", "nervous"], correctWord: "want" }
      ],
      say: { promptPhrase: "I want a book and I need a pen." },
      own: { writingPrompt: "Manda un audio diciendo algo que deseas profundamente (I want...) y algo que necesitas para vivir (I need...).", inputType: 'audio' },
      recall: { 
        summaryFact: "'Need' suena urgente. 'Want' denota preferencia. La 'W' en Want suena como una fuerte 'U' en español (Uant).",
        activity: { type: 'multiple_choice', question: "Cruzando verbos y edad: Si quiero celebrar mi cumple...", options: ["I have twenty and want cake.", "I am twenty and I want cake."], correctIdx: 1 }
      }
    }
  },
  12: {
    day: 12, title: "Vocabulario de Necesidades",
    steps: {
      learn: { contentText: "Agrega cosas cotidianas al frame de ayer: water (agua), food (comida), y un salvavidas: bathroom (baño)." },
      try: [
        { type: 'match_emoji', prompt: "Relaciona necesidades vitales:", pairs: [{ emoji: "💧", text: "water" }, { emoji: "🍔", text: "food" }, { emoji: "🚽", text: "bathroom" }] },
        { type: 'fill_blank', beforeBlank: "I need ", afterBlank: " please. (Agua)", options: ["food", "water", "bathroom"], correctWord: "water" },
        { type: 'multiple_choice', question: "Al restaurante te mueres de hambre...", options: ["I want bathroom", "I need food"], correctIdx: 1 },
        { type: 'listening', expectedAudioText: 'I need the bathroom right now.', question: '¿Cuál es su urgencia?', options: ["Comida", "El baño"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I want ", afterBlank: " for dinner. (Comida)", options: ["food", "bath", "fine"], correctWord: "food" }
      ],
      say: { promptPhrase: "Hello. I am tired and I need food." },
      own: { writingPrompt: "Redacta: Qué necesitas ahora mismo. Ej. 'I need water.'", inputType: 'text' },
      recall: { 
        summaryFact: "'Bathroom' incluye un fonema engañoso. Reemplaza la 'th' por una suave fricción dental.",
        activity: { type: 'multiple_choice', question: "Día 2 mix: Llegas sediento del desierto y alguien te pregunta 'How are you?'.", options: ["I am fine.", "I am tired, I need water!"], correctIdx: 1 }
      }
    }
  },
  13: {
    day: 13, title: "Tus Gustos Simples",
    steps: {
      learn: { contentText: "Dile al mundo lo que prefieres. Usamos 'I like' (Me gusta) seguido de la comida: coffee (café), pizza, tacos." },
      try: [
        { type: 'match_emoji', prompt: "Menú básico:", pairs: [{ emoji: "☕", text: "coffee" }, { emoji: "🍕", text: "pizza" }, { emoji: "🌮", text: "tacos" }] },
        { type: 'fill_blank', beforeBlank: "I ", afterBlank: " coffee in the morning.", options: ["need", "like", "am"], correctWord: "like" },
        { type: 'multiple_choice', question: "Amas el café pero odias la pizza. Para la pizza puedes usar:", options: ["I not like pizza", "I don't like pizza"], correctIdx: 1 },
        { type: 'listening', expectedAudioText: 'I really like tacos.', question: 'Su comida amada es...', options: ["Pizza", "Tacos"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I am fine, I ", afterBlank: " pizza and water.", options: ["like", "have"], correctWord: "like" }
      ],
      say: { promptPhrase: "I like coffee and I like pizza." },
      own: { writingPrompt: "Manda un audio diciendo: 'Hi, I like...' agregando tu bebida y comida favorita real.", inputType: 'audio' },
      recall: { 
        summaryFact: "Coffee lleva doble f y doble e en inglés, y su pronunciación enfatiza levemente la fuerza al inicio (COF-fee).",
        activity: { type: 'multiple_choice', question: "Repaso integral. Si cumples años hoy y amas tu pizza:", options: ["I am thirty! I want pizza!", "I have thirty! I like tacos."], correctIdx: 0 }
      }
    }
  },
  14: {
    day: 14, title: "Lazos de Familia",
    steps: {
      learn: { contentText: "Tu círculo más cercano y relevante. Vocabulario: mom (mamá), dad (papá), husband (esposo), wife (esposa), son (hijo), daughter (hija)." },
      try: [
        { type: 'match_emoji', prompt: "Roles primarios:", pairs: [{ emoji: "👩", text: "mom" }, { emoji: "👨", text: "dad" }] },
        { type: 'fill_blank', beforeBlank: "She is my ", afterBlank: ". (Esposa)", options: ["husband", "wife", "son"], correctWord: "wife" },
        { type: 'multiple_choice', question: "Si alguien tiene un hijo y una hija, la hija es la:", options: ["Son", "Daughter"], correctIdx: 1 },
        { type: 'listening', expectedAudioText: 'My son is twenty years old.', question: '¿La edad de quién escuchaste?', options: ["De su papá", "De su hijo varón (son)"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "My ", afterBlank: " requires water. (Mamá)", options: ["mom", "dad", "food"], correctWord: "mom" }
      ],
      say: { promptPhrase: "This is my mom and this is my husband." },
      own: { writingPrompt: "Escribe presentando a un miembro real (ej: My son is 5 / My mom is fine).", inputType: 'text' },
      recall: { 
        summaryFact: "'Daughter' puede asustar al leerse. Solo ignora la 'gh'. Se pronuncia (DO-ter).",
        activity: { type: 'fill_blank', beforeBlank: "Repaso de Gustos: My dad ", afterBlank: " tacos.", options: ["like", "likes"], correctWord: "likes" }
      }
    }
  },
  15: {
    day: 15, title: "Elecciones Reales (Integración)",
    steps: {
      learn: { contentText: "Vamos a fusionar likes (gustos) y wants (deseos puntuales). Puedes decir 'I like coffee' pero 'I want water' en este momento." },
      try: [
        { type: 'multiple_choice', question: "Situación real: Tu bebida favorita de toda la vida es el café, pero cruzaste un desierto y necesitas agua ya.", options: ["I like water, I want coffee.", "I like coffee, I need water."], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I like pizza, but right now I ", afterBlank: " tacos.", options: ["want", "am", "five"], correctWord: "want" },
        { type: 'listening', expectedAudioText: 'I like food but I want water.', question: 'Él afirma un gusto general, pero su deseo inmediato es:', options: ["Agua", "Comida"], correctIdx: 0 },
        { type: 'fill_blank', beforeBlank: "My mom ", afterBlank: " coffee.", options: ["want", "wants", "am"], correctWord: "wants" },
        { type: 'match_emoji', prompt: "Gusto permanente vs Deseo del momento:", pairs: [{ emoji: "❤️", text: "Like" }, { emoji: "☝️", text: "Want" }] }
      ],
      say: { promptPhrase: "I like pizza, but I want tacos today." },
      own: { writingPrompt: "Graba un audio diciendo: 'I like [comida general] but I want / need [comida/bebida ahora]'.", inputType: 'audio' },
      recall: { 
        summaryFact: "'Like' marca tu esencia o personalidad, 'Want/Need' resuelven tu momento actual en el mundo físico.",
        activity: { type: 'multiple_choice', question: "Recordatorio Día 10: ¿Cuál es correcto?", options: ["My husband is thirty.", "My husband has thirty years."], correctIdx: 0 }
      }
    }
  },
  16: {
    day: 16, title: "Lugares Muy Útiles",
    steps: {
      learn: { contentText: "Ubicando establecimientos fundamentales. Vocabulario: bathroom (baño), restaurant (restaurante), hotel (hotel)." },
      try: [
        { type: 'match_emoji', prompt: "Asigna el edificio:", pairs: [{ emoji: "🏨", text: "hotel" }, { emoji: "🍽️", text: "restaurant" }] },
        { type: 'fill_blank', beforeBlank: "I need food, I want a ", afterBlank: ".", options: ["bathroom", "restaurant", "hotel"], correctWord: "restaurant" },
        { type: 'multiple_choice', question: "Vas a dormir esta noche...", options: ["I need a hotel.", "I want a bathroom."], correctIdx: 0 },
        { type: 'listening', expectedAudioText: 'I want the hotel bathroom.', question: 'Locación específica, ¿qué busca?', options: ["El hotel del baño", "El baño del hotel"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "We need the ", afterBlank: ". (Baño)", options: ["bathroom", "food", "my"], correctWord: "bathroom" }
      ],
      say: { promptPhrase: "I am very tired, I need a hotel and a restaurant." },
      own: { writingPrompt: "Escribe 2 frases: Una pidiendo la ubicación que necesitas más urgente ahora.", inputType: 'text' },
      recall: { 
        summaryFact: "La 'h' en hotel suena claramente expulsando aire, igual que en Hello. No es muda.",
        activity: { type: 'multiple_choice', question: "Día 11: Quiero comida. ¿Cómo es más natural pedir algo?", options: ["I want food.", "I have want food."], correctIdx: 0 }
      }
    }
  },
  17: {
    day: 17, title: "Buscando Dirección",
    steps: {
      learn: { contentText: "Salvas tu viaje al extranjero agregando: 'Where is the...?' (¿Dónde está...?) a lugares críticos como 'hospital' y 'school' (escuela)." },
      try: [
        { type: 'match_emoji', prompt: "Relaciona nuevos lugares:", pairs: [{ emoji: "🏥", text: "hospital" }, { emoji: "🏫", text: "school" }] },
        { type: 'fill_blank', beforeBlank: "Excuse me, ", afterBlank: " is the bathroom?", options: ["what", "where", "how"], correctWord: "where" },
        { type: 'multiple_choice', question: "Emergencia médica, debes preguntar de inmediato:", options: ["Where is the hospital?", "Where is the restaurant?"], correctIdx: 0 },
        { type: 'listening', expectedAudioText: 'Where is the school?', question: '¿A dónde busca ir prestando atención a la pregunta?', options: ["Al restaurante", "A la escuela (school)"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "Where ", afterBlank: " the hotel?", options: ["is", "are", "am"], correctWord: "is" }
      ],
      say: { promptPhrase: "Excuse me, where is the hospital? I need help." },
      own: { writingPrompt: "Estás perdido en Nueva York. Manda audio actuando pánico y preguntando: 'Where is the...?' (el lugar que elijas).", inputType: 'audio' },
      recall: { 
        summaryFact: "'Where' = Dónde. 'Is' = Está. 'The' = El/La. Todo en orden inverso no existe en este bloque, se mapea literal como en español.",
        activity: { type: 'fill_blank', beforeBlank: "Repaso familia (Día 14): Where is my ", afterBlank: "? (Hijo)", options: ["hotel", "son", "twenty"], correctWord: "son" }
      }
    }
  },
  18: {
    day: 18, title: "Indicando el Camino",
    steps: {
      learn: { contentText: "Si te responden a 'Where is the..', necesitas entender: left (Izquierda), right (Derecha), here (Aquí), there (Allá)." },
      try: [
        { type: 'match_emoji', prompt: "Navegación espacial:", pairs: [{ emoji: "👈", text: "left" }, { emoji: "👉", text: "right" }] },
        { type: 'fill_blank', beforeBlank: "The hospital is ", afterBlank: ". (Derecha)", options: ["right", "left", "here"], correctWord: "right" },
        { type: 'multiple_choice', question: "Llegas a la ventanilla del hotel y dices con las maletas:", options: ["I am here.", "I am left."], correctIdx: 0 },
        { type: 'listening', expectedAudioText: 'The bathroom is right there.', question: 'Presta atención a The Bathroom...', options: ["Está allá de inmediato/a la derecha", "Está escondido a la izquierda"], correctIdx: 0 },
        { type: 'fill_blank', beforeBlank: "My school is ", afterBlank: ". (A la izquierda)", options: ["right", "left", "there"], correctWord: "left" }
      ],
      say: { promptPhrase: "The restaurant is on the left, and the hotel is there." },
      own: { writingPrompt: "Toma un objeto que tengas cerca (Ej. water) y escribe 'The water is here' o 'there'.", inputType: 'text' },
      recall: { 
        summaryFact: "Left y Right no solo te manejan en la calle, te orientan al leer. Domina 'Right' (con R fuerte y sin tocar el paladar largo).",
        activity: { type: 'multiple_choice', question: "Uniendo familia y lugares: ¿Qué dice 'My son is at school'?", options: ["Mi hijo es una escuela.", "Mi hijo está en la escuela."], correctIdx: 1 }
      }
    }
  },
  19: {
    day: 19, title: "Mini Conversación",
    steps: {
      learn: { contentText: "Armaremos una mini conversación guiada integrando saludo primario, cómo se sienten, manifestando la edad real y dando los gustos personales." },
      try: [
        { type: 'multiple_choice', question: "Orden lógico de presentación 101:", options: ["Saludo > Edad > Nombre > Gustos", "Saludo > Nombre > Edad > Gustos"], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "Hello, my name is Ana. I ", afterBlank: " twenty.", options: ["am", "have", "want"], correctWord: "am" },
        { type: 'listening', expectedAudioText: 'I am fine, I am thirty and I like coffee.', question: 'Combinación mortal de 3 frases. Entendiste...', options: ["Está bien, tiene 30 y le gusta el café.", "Está cansado, tiene 30 y quiere comida."], correctIdx: 0 },
        { type: 'fill_blank', beforeBlank: "Hi! How ", afterBlank: " you? I am fine.", options: ["is", "are", "name"], correctWord: "are" },
        { type: 'match_emoji', prompt: "Relaciona tu repertorio:", pairs: [{ emoji: "🗣️", text: "My name is" }, { emoji: "❤️", text: "I like" }, { emoji: "🎂", text: "I am ... years old" }] }
      ],
      say: { promptPhrase: "Hello. My name is Alex. I am fine. I am thirty years old. I like tacos." },
      own: { writingPrompt: "Escribe TODO un texto completo (Tus 4 frases) presentándote al mundo desde ceros como si estuvieras en una entrevista.", inputType: 'text' },
      recall: { 
        summaryFact: "Las neuronas que disparan juntas, permanecen juntas. Al agrupar lo simple has formado párrafos complejos e inteligibles para cualquier nativo.",
        activity: { type: 'fill_blank', beforeBlank: "A la mitad de esa entrevista pides ir al baño: Where ", afterBlank: " the bathroom?", options: ["am", "are", "is"], correctWord: "is" }
      }
    }
  },
  20: {
    day: 20, title: "Conversación Final Real",
    steps: {
      learn: { contentText: "¡Prueba Máxima! Una fluidez básica es todo lo que necesitas para sobrevivir el 90% real: Saludo, nombre, edad, likes/wants y lugares. (Ej: Hello, my name is Ana. I’m fine. I’m 56. I like coffee. I want water. Where is the bathroom?)" },
      try: [
        { type: 'listening', expectedAudioText: 'Hello, my name is Ana. I am fine. I am 56. I like coffee. I want water. Where is the bathroom?', question: '¡La secuencia real! ¿Todo tiene perfecto sentido comunicativo?', options: ["No, Ana debió decir I have 56 years.", "Sí, Ana está comunicándose fluidamente al 100%."], correctIdx: 1 },
        { type: 'fill_blank', beforeBlank: "I'm 56. I like coffee. I ", afterBlank: " water.", options: ["want", "am", "is"], correctWord: "want" },
        { type: 'multiple_choice', question: "¿Qué lograste al erradicar por completo decir 'I have 56 years'?", options: ["Sonar como un diccionario robot.", "Sonar mucho más cercano a un hablante real nativo del inglés."], correctIdx: 1 },
        { type: 'match_emoji', prompt: "Último match estructural:", pairs: [{ emoji: "📍", text: "Where is the...?" }, { emoji: "🌟", text: "I am ... years old" }] },
        { type: 'fill_blank', beforeBlank: "I want water. Where is the ", afterBlank: "?", options: ["hello", "bathroom", "tired"], correctWord: "bathroom" }
      ],
      say: { promptPhrase: "Hello, my name is Ana. I’m fine. I’m 56. I like coffee. I want water. Where is the bathroom?" },
      own: { writingPrompt: "GRAN FINAL: Graba en un solo gran audio toda tu secuencia de supervivencia. (Mete tu nombre, edad y gustos reales y pregunta por el baño al final). ¡Celebremos!", inputType: 'audio' },
      recall: { 
        summaryFact: "¡Conquista Total! Ya no le tienes pavor al inglés hablado. Sabes armar frases modulares que resuelven.",
        activity: { type: 'multiple_choice', question: "Dime desde tu corazón neuroeducado, ¿el miedo hablar frenó o aceleró tu primer día?", options: ["El miedo frenaba mi voz al equivocarme.", "Equivocarme aceleró el aprendizaje real."], correctIdx: 1 }
      }
    }
  }
};

export function getLesson(day: number): LessonContent | undefined {
  return LESSONS[day];
}
