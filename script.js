const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style System", "Computer Style Sheets"],
    correct: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "HighText Machine Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "1997"],
    correct: "1995"
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const question = quizData[currentQuestion];
  questionEl.textContent = question.question;
  optionsEl.innerHTML = "";

  question.options.forEach(option => {
    const div = document.createElement("div");
    div.textContent = option;
    div.classList.add("option");
    // Reset styles and enable pointer events are handled by recreating nodes
    div.addEventListener("click", () => selectAnswer(div, question.correct));
    optionsEl.appendChild(div);
  });
}

function selectAnswer(selected, correct) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => {
    opt.style.pointerEvents = "none"; // disable further clicks on options
  });
  
  if (selected.textContent === correct) {
    selected.style.background = "#a4f9a4";
    score++;
  } else {
    selected.style.background = "#fba8a8";
    // optionally highlight the correct answer
    allOptions.forEach(opt => {
      if (opt.textContent === correct) {
        opt.style.background = "#a4f9a4";
      }
    });
  }
}

// Next button moves to next question or shows result
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  // === FIX: use template literal with backticks ===
  scoreEl.textContent = `You scored ${score} out of ${quizData.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  showQuestion();
});

// initial render
showQuestion();
