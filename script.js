// Banco de 20 preguntas sobre IA
const questionBank = [
    {
        question: "¿Qué significa 'IA'?",
        options: ["Inteligencia Artificial", "Informática Avanzada", "Interfaz Automática", "Integración Algorítmica"],
        correct: 0
    },
    {
        question: "¿Quién es considerado el padre de la Inteligencia Artificial?",
        options: ["Alan Turing", "Elon Musk", "Bill Gates", "Steve Jobs"],
        correct: 0
    },
    {
        question: "¿Qué es el Machine Learning?",
        options: ["Un lenguaje de programación", "Aprendizaje automático de máquinas", "Un tipo de hardware", "Un sistema operativo"],
        correct: 1
    },
    {
        question: "¿Qué prueba evalúa si una máquina puede mostrar comportamiento inteligente?",
        options: ["Test de IQ", "Test de Turing", "Test de Velocidad", "Test de Benchmark"],
        correct: 1
    },
    {
        question: "¿Qué es una red neuronal?",
        options: ["Una red de computadoras", "Un modelo inspirado en el cerebro humano", "Un cable de internet", "Un tipo de base de datos"],
        correct: 1
    },
    {
        question: "¿Qué significa 'Deep Learning'?",
        options: ["Aprendizaje profundo", "Aprendizaje superficial", "Estudio intensivo", "Programación avanzada"],
        correct: 0
    },
    {
        question: "¿Cuál es un ejemplo de IA débil o estrecha?",
        options: ["Un robot humanoide consciente", "Siri o Alexa", "Skynet", "Una IA que siente emociones"],
        correct: 1
    },
    {
        question: "¿Qué empresa desarrolló ChatGPT?",
        options: ["Google", "Microsoft", "OpenAI", "Meta"],
        correct: 2
    },
    {
        question: "¿Qué es el procesamiento del lenguaje natural (NLP)?",
        options: ["Traducir código binario", "Comprensión del lenguaje humano por máquinas", "Crear lenguajes de programación", "Optimizar bases de datos"],
        correct: 1
    },
    {
        question: "¿Qué es un algoritmo?",
        options: ["Un dispositivo físico", "Una serie de instrucciones para resolver un problema", "Un tipo de virus", "Una marca de computadora"],
        correct: 1
    },
    {
        question: "¿Qué es la visión por computadora?",
        options: ["Ver videos en línea", "Capacidad de las máquinas para interpretar imágenes", "Usar gafas VR", "Tomar fotografías"],
        correct: 1
    },
    {
        question: "¿Qué año se acuñó oficialmente el término 'Inteligencia Artificial'?",
        options: ["1945", "1956", "1970", "1985"],
        correct: 1
    },
    {
        question: "¿Qué es el aprendizaje supervisado?",
        options: ["Aprender sin datos etiquetados", "Aprender con datos etiquetados", "Aprender solo", "Aprender de errores"],
        correct: 1
    },
    {
        question: "¿Qué es un chatbot?",
        options: ["Un robot físico", "Un programa que simula conversación humana", "Un juego de video", "Un antivirus"],
        correct: 1
    },
    {
        question: "¿Qué significa AGI?",
        options: ["Artificial General Intelligence", "Advanced Global Internet", "Automated Graphical Interface", "Applied Genetic Information"],
        correct: 0
    },
    {
        question: "¿Qué es el sobreajuste (overfitting) en ML?",
        options: ["Cuando el modelo es muy simple", "Cuando el modelo memoriza los datos de entrenamiento", "Cuando falta datos", "Cuando el modelo es rápido"],
        correct: 1
    },
    {
        question: "¿Qué compañía creó TensorFlow?",
        options: ["Facebook", "Amazon", "Google", "IBM"],
        correct: 2
    },
    {
        question: "¿Qué es un sistema experto?",
        options: ["Una persona experta en IA", "Un sistema que imita la capacidad de decisión humana", "Un curso avanzado", "Un tipo de sensor"],
        correct: 1
    },
    {
        question: "¿Qué es la ética en IA?",
        options: ["Programar más rápido", "Principios morales en el desarrollo de IA", "Vender más software", "Crear robots bonitos"],
        correct: 1
    },
    {
        question: "¿Qué es el reconocimiento de patrones?",
        options: ["Dibujar formas geométricas", "Identificar regularidades en datos", "Crear patrones de diseño", "Jugar ajedrez"],
        correct: 1
    }
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// Elementos del DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionSpan = document.getElementById('current-question');
const progressFill = document.getElementById('progress');
const scoreSpan = document.getElementById('score');
const feedbackMessage = document.getElementById('feedback-message');

// Función para mezclar array (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Seleccionar 5 preguntas aleatorias
function selectRandomQuestions() {
    const shuffled = shuffleArray(questionBank);
    return shuffled.slice(0, 5);
}

// Iniciar test
function startQuiz() {
    currentQuestions = selectRandomQuestions();
    currentQuestionIndex = 0;
    score = 0;
    
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    showQuestion();
}

// Mostrar pregunta actual
function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Actualizar barra de progreso
    const progress = ((currentQuestionIndex) / 5) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Generar opciones
    optionsContainer.innerHTML = '';
    selectedOption = null;
    nextBtn.disabled = true;
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(index, button);
        optionsContainer.appendChild(button);
    });
}

// Seleccionar opción
function selectOption(index, button) {
    // Remover selección previa
    const allOptions = optionsContainer.querySelectorAll('.option-btn');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Marcar nueva selección
    button.classList.add('selected');
    selectedOption = index;
    nextBtn.disabled = false;
}

// Ir a siguiente pregunta o mostrar resultados
function nextQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const allOptions = optionsContainer.querySelectorAll('.option-btn');
    
    // Mostrar respuesta correcta/incorrecta
    if (selectedOption === question.correct) {
        score++;
        allOptions[selectedOption].classList.add('correct');
    } else {
        allOptions[selectedOption].classList.add('incorrect');
        allOptions[question.correct].classList.add('correct');
    }
    
    // Deshabilitar todos los botones
    allOptions.forEach(opt => opt.style.pointerEvents = 'none');
    nextBtn.disabled = true;
    
    // Esperar y continuar
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < 5) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// Mostrar resultados
function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    scoreSpan.textContent = score;
    
    // Mensaje según puntuación
    if (score === 5) {
        feedbackMessage.textContent = "¡Excelente! Eres un experto en IA 🎉";
    } else if (score >= 3) {
        feedbackMessage.textContent = "¡Muy bien! Tienes buenos conocimientos 👍";
    } else {
        feedbackMessage.textContent = "Sigue aprendiendo sobre IA 📚";
    }
}

// Reiniciar test
function restartQuiz() {
    startQuiz();
}

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
