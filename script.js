// ==============================
// FLASHCARD DATA
// ==============================

const flashcards = [
  {
    question: "Apa itu JavaScript?",
    answer: "Bahasa pemrograman untuk membuat website interaktif.",
  },
  {
    question: "Apa fungsi let?",
    answer: "Membuat variabel yang nilainya bisa diubah.",
  },
  {
    question: "Apa fungsi const?",
    answer: "Membuat variabel yang tidak bisa di-assign ulang.",
  },
  {
    question: "Apa itu Array?",
    answer: "Struktur data untuk menyimpan banyak nilai.",
  },
];

let cardIndex = 0;
let isFlipped = false;

// ==============================
// QUIZ DATA
// ==============================

const questions = [
  {
    question: "Keyword untuk membuat variabel yang nilainya bisa diubah?",
    options: ["const", "let", "static", "fixed"],
    answer: "let",
  },
  {
    question: "Apa tipe data dari true?",
    options: ["String", "Number", "Boolean", "Object"],
    answer: "Boolean",
  },
  {
    question: "Apa hasil dari 10 + 5 * 2?",
    options: ["30", "20", "25", "15"],
    answer: "20",
  },
  {
    question: "Operator untuk membandingkan nilai dan tipe data?",
    options: ["==", "=", "===", "!="],
    answer: "===",
  },
  {
    question: "Cara menulis kondisi JavaScript?",
    options: ["if (condition)", "when()", "check()", "case()"],
    answer: "if (condition)",
  },
  {
    question: "Index pertama array adalah?",
    options: ["1", "-1", "0", "2"],
    answer: "0",
  },
  {
    question: "Method menambahkan item ke akhir array?",
    options: ["pop()", "push()", "shift()", "slice()"],
    answer: "push()",
  },
  {
    question: "Contoh object JavaScript yang benar?",
    options: ["{name: 'Alex'}", "[name: 'Alex']", "(name)", "<name>"],
    answer: "{name: 'Alex'}",
  },
  {
    question: "Keyword untuk mengembalikan nilai function?",
    options: ["break", "return", "continue", "yield"],
    answer: "return",
  },
  {
    question: "Loop yang umum digunakan untuk pengulangan?",
    options: ["for", "if", "switch", "try"],
    answer: "for",
  },
  {
    question: "Apa fungsi console.log()?",
    options: [
      "Menghapus data",
      "Menampilkan informasi di console",
      "Membuat variabel",
      "Mengubah HTML",
    ],
    answer: "Menampilkan informasi di console",
  },
  {
    question: "Method mengambil elemen berdasarkan ID?",
    options: [
      "getElementById()",
      "getElementByClass()",
      "findElement()",
      "selectHTML()",
    ],
    answer: "getElementById()",
  },
  {
    question: "Apa fungsi addEventListener()?",
    options: [
      "Membuat CSS",
      "Mendengarkan event",
      "Menghapus array",
      "Menghentikan browser",
    ],
    answer: "Mendengarkan event",
  },
  {
    question: "Apa hasil typeof 'Quizly'?",
    options: ["number", "boolean", "string", "undefined"],
    answer: "string",
  },
  {
    question: "Method mengubah string menjadi huruf kapital?",
    options: ["toLowerCase()", "toUpperCase()", "capitalize()", "upper()"],
    answer: "toUpperCase()",
  },
  {
    question: "Apa hasil [1, 2, 3].length?",
    options: ["2", "3", "4", "1"],
    answer: "3",
  },
  {
    question: "Cara membuat arrow function yang benar?",
    options: ["function => {}", "() => {}", "=> function {}", "function() =>"],
    answer: "() => {}",
  },
  {
    question: "Apa fungsi JSON.parse()?",
    options: [
      "Mengubah JSON string menjadi nilai JavaScript",
      "Menghapus JSON",
      "Mengubah HTML menjadi CSS",
      "Menampilkan JSON",
    ],
    answer: "Mengubah JSON string menjadi nilai JavaScript",
  },
  {
    question: "Di mana Local Storage menyimpan data?",
    options: [
      "Di server saja",
      "Di penyimpanan browser",
      "Di file CSS",
      "Di console",
    ],
    answer: "Di penyimpanan browser",
  },
  {
    question: "Apa fungsi map() pada array?",
    options: [
      "Menghapus semua item",
      "Membuat array baru dari transformasi setiap item",
      "Mengurutkan array saja",
      "Menghentikan loop",
    ],
    answer: "Membuat array baru dari transformasi setiap item",
  },
];

let currentQuestion = 0;
let score = 0;
let answered = false;

// ==============================
// ELEMENTS
// ==============================

const flashcard = document.getElementById("flashcard");
const prevCard = document.getElementById("prevCard");
const nextCard = document.getElementById("nextCard");
const flipCard = document.getElementById("flipCard");

const flashcardTab = document.getElementById("flashcardTab");
const quizTab = document.getElementById("quizTab");

const flashcardSection = document.getElementById("flashcardSection");
const quizSection = document.getElementById("quizSection");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextQuestionBtn = document.getElementById("nextQuestion");
const resultElement = document.getElementById("result");

const questionCounter = document.getElementById("questionCounter");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressBar = document.getElementById("progressBar");

// ==============================
// FLASHCARD FUNCTIONS
// ==============================

function showFlashcard() {
  const card = flashcards[cardIndex];

  flashcard.textContent = isFlipped ? card.answer : card.question;
}

function flipFlashcard() {
  isFlipped = !isFlipped;
  showFlashcard();
}

function nextFlashcard() {
  cardIndex = (cardIndex + 1) % flashcards.length;
  isFlipped = false;
  showFlashcard();
}

function previousFlashcard() {
  cardIndex = (cardIndex - 1 + flashcards.length) % flashcards.length;

  isFlipped = false;
  showFlashcard();
}

// ==============================
// TAB FUNCTIONS
// ==============================

function showFlashcardTab() {
  flashcardSection.classList.remove("hidden");
  quizSection.classList.add("hidden");

  flashcardTab.classList.add("active");
  quizTab.classList.remove("active");
}

function showQuizTab() {
  flashcardSection.classList.add("hidden");
  quizSection.classList.remove("hidden");

  quizTab.classList.add("active");
  flashcardTab.classList.remove("active");
}

// ==============================
// QUIZ FUNCTIONS
// ==============================

function showQuestion() {
  answered = false;

  const question = questions[currentQuestion];

  questionElement.textContent = question.question;

  questionCounter.textContent = `${currentQuestion + 1} / ${questions.length}`;

  scoreDisplay.textContent = score;

  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;

  answersElement.innerHTML = "";
  feedbackElement.textContent = "";

  nextQuestionBtn.classList.add("hidden");
  resultElement.classList.add("hidden");

  question.options.forEach((option) => {
    const button = document.createElement("button");

    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(option, button);
    });

    answersElement.appendChild(button);
  });
}

function checkAnswer(selectedAnswer, selectedButton) {
  if (answered) return;

  answered = true;

  const correctAnswer = questions[currentQuestion].answer;

  if (selectedAnswer === correctAnswer) {
    score++;
    feedbackElement.textContent = "🎉 Correct! Great job!";
    selectedButton.style.background = "#b8f28b";
  } else {
    feedbackElement.textContent = `❌ Not quite! Correct answer: ${correctAnswer}`;

    selectedButton.style.background = "#ffb7c5";
  }

  scoreDisplay.textContent = score;

  Array.from(answersElement.children).forEach((button) => {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.style.background = "#b8f28b";
    }
  });

  nextQuestionBtn.classList.remove("hidden");

  if (currentQuestion === questions.length - 1) {
    nextQuestionBtn.textContent = "See My Result →";
  } else {
    nextQuestionBtn.textContent = "Next Question →";
  }
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionElement.classList.add("hidden");
  answersElement.classList.add("hidden");
  feedbackElement.classList.add("hidden");
  nextQuestionBtn.classList.add("hidden");

  progressBar.style.width = "100%";

  resultElement.classList.remove("hidden");

  const percentage = Math.round((score / questions.length) * 100);

  let message = "Keep practicing! You can do it!";

  if (percentage >= 80) {
    message = "Amazing! You're a JavaScript superstar! 🌟";
  } else if (percentage >= 60) {
    message = "Good job! Keep improving! 🚀";
  }

  resultElement.innerHTML = `
    <h2>Quiz Completed! 🎉</h2>
    <h1>${score} / ${questions.length}</h1>
    <p>${percentage}% correct answers</p>
    <p>${message}</p>
    <button id="restartQuiz">Try Again ↻</button>
  `;

  document.getElementById("restartQuiz").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;

  questionElement.classList.remove("hidden");
  answersElement.classList.remove("hidden");
  feedbackElement.classList.remove("hidden");

  nextQuestionBtn.textContent = "Next Question →";

  showQuestion();
}

// ==============================
// EVENT LISTENERS
// ==============================

flipCard.addEventListener("click", flipFlashcard);
flashcard.addEventListener("click", flipFlashcard);

nextCard.addEventListener("click", nextFlashcard);
prevCard.addEventListener("click", previousFlashcard);

flashcardTab.addEventListener("click", showFlashcardTab);
quizTab.addEventListener("click", showQuizTab);

nextQuestionBtn.addEventListener("click", nextQuestion);

// ==============================
// INITIALIZE APP
// ==============================

showFlashcard();
showQuestion();
