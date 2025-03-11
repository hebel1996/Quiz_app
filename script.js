const quizData = {
    easy: [
        { question: "1. What is 4 + 2?", answers: ["3", "4", "5", "6"], correct: 3},
        { question: "2. የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ጥምቀት የሚከበረው በየትኛው ወር ነው?", answers: ["ጥር", "ሐምሌ", "መስከረም", " ታኅሳስ"], correct: 0 },
        { question: "3. What is the capital of France?", answers: ["Paris", "London", "Rome", "Berlin"], correct: 0 },
        {question: "4. ዓለም ላይ ትልቁ ውቅያኖስ የቱ ነው?", answers: ["ፓስፊክ", "አትላንቲክ", "ህንድ", " አክቲክ"], correct: 0 },
        { question: "What color is the sky on a clear day?", answers: ["Blue", "Green", "Red", "Yellow"], correct: 0 },
        { question: "How many legs does a spider have?", answers: ["6", "8", "10", "12"], correct: 1 },
        { question: "Which animal says 'Meow'?", answers: ["Dog", "Cat", "Cow", "Sheep"], correct: 1 },
        { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: 2 },
        { question: "Which is the largest planet?", answers: ["Mars", "Venus", "Earth", "Jupiter"], correct: 3 },
        { question: "What is the opposite of 'Hot'?", answers: ["Warm", "Cold", "Cool", "Mild"], correct: 1 },
        { question: "How many fingers do humans have?", answers: ["8", "10", "12", "5"], correct: 1 },
        { question: "What does a thermometer measure?", answers: ["Weight", "Height", "Temperature", "Speed"], correct: 2 },
      
    ],
    medium: [
        { question: "Which planet has rings?", answers: ["Mars", "Jupiter", "Saturn", "Venus"], correct: 2 },
        { question: "What is 15 x 3?", answers: ["30", "45", "60", "75"], correct: 1 },
        { question: "Who wrote 'Hamlet'?", answers: ["Shakespeare", "Hemingway", "Dickens", "Austen"], correct: 0 },
        { question: "What is the square root of 64?", answers: ["6", "8", "10", "12"], correct: 1 },
        { question: "Which gas do plants need for photosynthesis?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 1 },
        { question: "What is the chemical symbol for gold?", answers: ["Go", "Ag", "Au", "Gd"], correct: 2 },
        { question: "Which ocean is the largest?", answers: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 },
        { question: "What is the capital of Japan?", answers: ["Beijing", "Seoul", "Bangkok", "Tokyo"], correct: 3 },
        { question: "What is the boiling point of water?", answers: ["90°C", "100°C", "110°C", "120°C"], correct: 1 },
        { question: "What is the hardest natural substance?", answers: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2 }
    ],
    hard: [
        { question: "Who developed the Theory of Relativity?", answers: ["Newton", "Einstein", "Tesla", "Galileo"], correct: 1 },
        { question: "What is 144 ÷ 12?", answers: ["10", "12", "14", "16"], correct: 1 },
        { question: "What is the powerhouse of the cell?", answers: ["Nucleus", "Ribosome", "Mitochondria", "Cell Membrane"], correct: 2 },
        { question: "What is the square root of 256?", answers: ["14", "15", "16", "17"], correct: 2 },
        { question: "Which element has the atomic number 1?", answers: ["Oxygen", "Hydrogen", "Helium", "Carbon"], correct: 1 },
        { question: "What is the longest river in the world?", answers: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
        { question: "Who painted the Mona Lisa?", answers: ["Michelangelo", "Van Gogh", "Leonardo da Vinci", "Picasso"], correct: 2 },
        { question: "Which is the smallest country in the world?", answers: ["Monaco", "Vatican City", "Luxembourg", "Malta"], correct: 1 },
        { question: "Which blood type is the universal donor?", answers: ["A", "B", "O", "AB"], correct: 2 },
        { question: "What is the speed of light?", answers: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"], correct: 0 }
    ]
};


let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const landingContainer = document.getElementById("landing-container");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const finalScore = document.getElementById("final-score");

function startQuiz(level) {
    selectedQuestions = quizData[level];
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 15;

    landingContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    resetState();
    const questionData = selectedQuestions[currentQuestionIndex];
    questionElement.innerText = questionData.question;
    
    questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(index, questionData.correct));
        answerButtons.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    timeLeft = 15;
    timerDisplay.innerText = `⏳ Time Left: ${timeLeft}s`;
    
    clearInterval(timer); // Prevent multiple timers from running
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `⏳ Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            resultDisplay.innerText = "⏳ Time’s Up! ❌";
            nextButton.classList.remove("hidden");
        }
    }, 1000);
}

function resetState() {
    answerButtons.innerHTML = "";
    resultDisplay.innerText = "";
    nextButton.classList.add("hidden");
}

function selectAnswer(selected, correct) {
    clearInterval(timer); // Stop timer when an answer is selected

    if (selected === correct) {
        score++;
        resultDisplay.innerText = "✅ Correct!";
    } else {
        resultDisplay.innerText = "❌ Wrong!";
    }

    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    quizContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    finalScore.innerText = `You scored ${score} out of ${selectedQuestions.length}!`;
}

function restartQuiz() {
    scoreContainer.classList.add("hidden");
    landingContainer.classList.remove("hidden");
}
