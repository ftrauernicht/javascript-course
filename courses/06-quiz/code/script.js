// Chapter 1 - Quiz
class Question {
  constructor(text, options, correctIndex) {
    this.text = text;
    this.options = options;
    this.correctIndex = correctIndex;
  }

  isCorrect(optionIndex) {
    return optionIndex === this.correctIndex;
  }
}

const questions = [
  new Question("What is the capital of France?", ["Berlin", "Paris", "Madrid", "Rome"], 1),
  new Question("Which planet is known as the Red Planet?", ["Earth", "Venus", "Mars", "Jupiter"], 2),
  new Question("What is 7 x 8?", ["54", "56", "58", "64"], 1),
  new Question("Which language is this course about?", ["Python", "JavaScript", "Ruby", "C++"], 1),
  new Question('What does "DOM" stand for?', ["Document Object Model", "Data Object Method", "Digital Output Mode", "Document Order Map"], 0),
];

const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const progress = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const nextButton = document.getElementById("next-button");
const scoreText = document.getElementById("score-text");
const reviewList = document.getElementById("review-list");
const restartButton = document.getElementById("restart-button");

let currentIndex = 0;
let score = 0;
let answered = false;
const answers = [];

function renderQuestion() {
  const question = questions[currentIndex];

  progress.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
  questionText.textContent = question.text;

  optionsList.innerHTML = question.options
    .map((option, index) => '<li><button class="option" data-index="' + index + '">' + option + "</button></li>")
    .join("");

  optionsList.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      handleAnswer(Number(button.dataset.index));
    });
  });

  nextButton.classList.add("hidden");
  answered = false;
}

function handleAnswer(selectedIndex) {
  if (answered) {
    return;
  }
  answered = true;

  const question = questions[currentIndex];
  const isCorrect = question.isCorrect(selectedIndex);
  if (isCorrect) {
    score = score + 1;
  }
  answers.push({ question: question, selectedIndex: selectedIndex, isCorrect: isCorrect });

  const optionButtons = optionsList.querySelectorAll(".option");
  optionButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correctIndex) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });

  nextButton.classList.remove("hidden");
}

function nextQuestion() {
  currentIndex = currentIndex + 1;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreText.textContent = "You got " + score + " out of " + questions.length + " correct.";

  reviewList.innerHTML = answers
    .map((answer) => {
      const resultClass = answer.isCorrect ? "review-correct" : "review-wrong";
      const yourAnswer = answer.question.options[answer.selectedIndex];
      const correctAnswer = answer.question.options[answer.question.correctIndex];
      const detail = answer.isCorrect
        ? "Correct: " + correctAnswer
        : "You answered " + yourAnswer + " - correct was " + correctAnswer;
      return '<li class="' + resultClass + '">' + answer.question.text + "<br />" + detail + "</li>";
    })
    .join("");
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  answers.length = 0;

  resultScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");

  renderQuestion();
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

renderQuestion();
