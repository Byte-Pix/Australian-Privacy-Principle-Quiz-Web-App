const QUESTIONS = [
  {
    question: "A social media company wants to follow APP 1. Which action best supports this principle?",
    options: [
      "Collect as much personal information as possible",
      "Publish a clear and current privacy policy",
      "Update their privacy policy and automatically accept the new policy on behalf of the user",
      "Delete its privacy policy after collecting information"
    ],
    correct: 1,
    explanation: "APP 1's purpose summary: ensures that APP entities manage personal information in an open and transparent way. This includes having a clearly expressed and up to date APP privacy policy."
  },
  {
    question: "Under APP 2, what should an organisation generally provide where no exception applies?",
    options: [
      "An option to remain anonymous or use a pseudonym",
      "A requirement to provide a government ID",
      "A requirement to publish a person's legal name",
      "A requirement to provide every available contact detail"
    ],
    correct: 0,
    explanation: "APP 2's purpose summary: Requires APP entities to give individuals the option of not identifying themselves, or of using a pseudonym."
  },
  {
    question: "A website asks for a user's date of birth, home address and phone number. Under APP 3, what should the organisation consider first?",
    options: [
      "Whether every website collects the same information",
      "Whether the information can be sold immediately",
      "Whether collecting the information is reasonably necessary for its functions or activities",
      "Whether collecting extra information makes the sign up process longer"
    ],
    correct: 2,
    explanation: "APP 3's purpose summary: Outlines when an APP entity can collect personal information that is solicited. It applies higher standards to the collection of sensitive information."
  },
  {
    question: "When should an organisation generally notify someone about the collection of their personal information under APP 5?",
    options: [
      "At or before collection, or as soon as practicable afterwards when that is not practicable",
      "Only after the information has been shared with another organisation",
      "Only if the person later asks for an explanation",
      "Only when the organisation decides to delete the information"
    ],
    correct: 0,
    explanation: "APP 5's purpose summary: Outlines when and in what circumstances an APP entity that collects personal information must tell an individual about certain matters."
  },
  {
    question: "An organisation wants to use personal information for a purpose different from the original purpose. What is the key APP 6 consideration?",
    options: [
      "Whether the new purpose is more convenient for the organisation",
      "Whether the information is stored on a newer computer",
      "Whether the person has used the organisation's website before",
      "Whether consent or an applicable exception allows the secondary use"
    ],
    correct: 3,
    explanation: "APP 6's purpose summary: Outlines the circumstances in which an APP entity may use or disclose personal information that it holds."
  },
  {
    question: "Before disclosing personal information to an overseas recipient, which APP is especially relevant?",
    options: [
      "APP 13",
      "APP 2",
      "APP 10",
      "APP 8"
    ],
    correct: 3,
    explanation: "APP 8's purpose summary: Outlines the steps an APP entity must take to protect personal information before it is disclosed overseas."
  },
  {
    question: "Which action best supports APP 10?",
    options: [
      "Taking reasonable steps to keep personal information accurate, complete and up to date",
      "Keeping inaccurate information because it was collected first",
      "Changing information without checking whether the change is correct",
      "Refusing to review information that will be used or disclosed"
    ],
    correct: 0,
    explanation: "APP 10's purpose summary: An APP entity must take reasonable steps to ensure the personal information it collects is accurate, up to date and complete. An entity must also take reasonable steps to ensure the personal information it uses or discloses is accurate, up to date, complete and relevant, having regard to the purpose of the use or disclosure."
  },
  {
    question: "Which practice best supports APP 11?",
    options: [
      "Using reasonable security measures to protect personal information",
      "Giving every employee unrestricted access to all information",
      "Leaving personal information unprotected when it is not being used",
      "Sharing passwords so staff can access information more easily"
    ],
    correct: 0,
    explanation: "APP 11's purpose summary: An APP entity must take reasonable steps to protect personal information it holds from misuse, interference and loss, and from unauthorised access, modification or disclosure. An entity has obligations to destroy or de-identify personal information in certain circumstances."
  },
  {
    question: "A person asks an organisation for access to their personal information. Which APP is primarily relevant?",
    options: [
      "APP 4",
      "APP 12",
      "APP 7",
      "APP 9"
    ],
    correct: 1,
    explanation: "APP 12's purpose summary: Outlines an APP entity’s obligations when an individual requests to be given access to personal information held about them by the entity. This includes a requirement to provide access unless a specific exception applies."
  },
  {
    question: "A person believes their personal information held by an organisation is incorrect. Which APP is most directly relevant?",
    options: [
      "APP 6",
      "APP 5",
      "APP 13",
      "APP 11"
    ],
    correct: 2,
    explanation: "APP 13's purpose summary: Outlines an APP entity’s obligations in relation to correcting the personal information it holds about individuals."
  }
];

let currentQuestion = 0;
let score = 0;
let answers = [];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const progressFill = document.getElementById("progress-fill");
const resultScoreEl = document.getElementById("result-score");
const resultMessageEl = document.getElementById("result-message");
const reviewEl = document.getElementById("review");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  answers = [];
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = QUESTIONS[currentQuestion];

  progressEl.textContent = `Question ${currentQuestion + 1} of ${QUESTIONS.length}`;
  scoreEl.textContent = `Score: ${score}`;
  progressFill.style.width = `${(currentQuestion / QUESTIONS.length) * 100}%`;

  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.className = "feedback hidden";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index));
    optionsEl.appendChild(button);
  });
}

function selectAnswer(index) {
  const q = QUESTIONS[currentQuestion];
  const buttons = optionsEl.querySelectorAll("button");
  const isCorrect = index === q.correct;

  if (isCorrect) {
    score++;
  }

  answers.push({
    question: q.question,
    selected: q.options[index],
    correct: q.options[q.correct],
    isCorrect
  });

  buttons.forEach(button => button.disabled = true);

  feedbackEl.textContent = q.explanation;
  feedbackEl.classList.remove("hidden");
  feedbackEl.classList.add(isCorrect ? "correct" : "incorrect");

  scoreEl.textContent = `Score: ${score}`;
  progressFill.style.width = `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`;

  nextBtn.textContent =
    currentQuestion === QUESTIONS.length - 1 ? "See Results" : "Next Question";
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= QUESTIONS.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const percentage = Math.round((score / QUESTIONS.length) * 100);
  resultScoreEl.textContent = `${score} / ${QUESTIONS.length} (${percentage}%)`;

  if (percentage >= 90) {
    resultMessageEl.textContent = "Excellent understanding of the Australian Privacy Principles.";
  } else if (percentage >= 70) {
    resultMessageEl.textContent = "Strong understanding. Review the questions you missed.";
  } else if (percentage >= 50) {
    resultMessageEl.textContent = "Good start. A little more practice will help.";
  } else {
    resultMessageEl.textContent = "Keep practising the Australian Privacy Principles.";
  }

  reviewEl.innerHTML = "";

  answers.forEach((answer, index) => {
    const item = document.createElement("div");
    item.className = "review-item";

    const status = answer.isCorrect ? "Correct" : "Review";
    item.innerHTML = `
      <strong>${index + 1}. ${status}</strong>
      <span>${answer.question}</span>
      ${answer.isCorrect ? "" : `<p>Correct answer: ${answer.correct}</p>`}
    `;

    reviewEl.appendChild(item);
  });
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
document.getElementById("restart-btn").addEventListener("click", startQuiz);