"use strict";

// Navigation links
const navigationLinks = [
  { file: "index.html", label: "Home" },
  { file: "about.html", label: "About" },
  { file: "causes-effects.html", label: "Causes & Effects" },
  { file: "community-impact.html", label: "Community Impact" },
  { file: "map.html", label: "Map" },
  { file: "solutions.html", label: "Solutions" },
  { file: "community.html", label: "Community" },
  { file: "references.html", label: "References" }
];

const currentFile =
  window.location.pathname.split("/").pop() || "index.html";

const header = document.querySelector("#site-header");
const footer = document.querySelector("#site-footer");

// Header
if (header) {
  let linksHTML = "";

  navigationLinks.forEach(function (item) {
    const active = currentFile === item.file;

    linksHTML += `
      <a
        href="${item.file}"
        ${active ? 'aria-current="page"' : ""}
      >
        ${item.label}
      </a>
    `;
  });

  header.innerHTML = `
    <div class="header-inner">
      <a class="brand" href="index.html">
        <span class="brand-mark" aria-hidden="true">BL</span>

        <span>
          Bantay Lupa
          <small>Hagonoy Land Subsidence Awareness</small>
        </span>
      </a>

      <button
        type="button"
        id="menu-toggle"
        class="menu-toggle"
        aria-controls="main-nav"
        aria-expanded="false"
      >
        Menu ☰
      </button>

      <nav
        id="main-nav"
        class="main-nav"
        aria-label="Main navigation"
      >
        ${linksHTML}
      </nav>
    </div>
  `;
}

// Footer
if (footer) {
  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <a class="brand" href="index.html">Bantay Lupa</a>
        <p>Learning about land subsidence in our community.</p>
      </div>

      <div>
        <p>Environmental Science Student Project · BSIT 4C</p>

        <a href="references.html">Sources and Credits</a>
        <span aria-hidden="true"> · </span>
        <a href="community.html">Sample Observation Form</a>
        <span aria-hidden="true"> · </span>
        <a href="quiz.html">Quiz</a>
      </div>
    </div>
  `;
}

// Mobile menu
const menuButton = document.querySelector("#menu-toggle");
const mainNavigation = document.querySelector("#main-nav");

if (menuButton && mainNavigation) {
  menuButton.addEventListener("click", function () {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    mainNavigation.classList.toggle("open", !isOpen);
  });

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      mainNavigation.classList.contains("open")
    ) {
      mainNavigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.focus();
    }
  });
}

// Sample observation form
const observationForm =
  document.querySelector("#observation-form");

if (observationForm) {
  const locationInput = document.querySelector("#location");
  const descriptionInput = document.querySelector("#description");
  const dateInput = document.querySelector("#date");
  const formStatus = document.querySelector("#form-status");

  // Prevent dates later than today.
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  dateInput.max = `${year}-${month}-${day}`;

  observationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    locationInput.setCustomValidity("");
    descriptionInput.setCustomValidity("");

    if (locationInput.value.trim() === "") {
      locationInput.setCustomValidity(
        "Please enter a barangay or location."
      );

      locationInput.reportValidity();
      return;
    }

    if (descriptionInput.value.trim().length < 10) {
      descriptionInput.setCustomValidity(
        "Please describe your observation using at least 10 characters."
      );

      descriptionInput.reportValidity();
      return;
    }

    if (!observationForm.reportValidity()) {
      return;
    }

    formStatus.textContent =
      "Your sample entry is complete. " +
      "This is a practice form, so nothing was saved or sent.";
  });

  observationForm.addEventListener("input", function (event) {
    if (typeof event.target.setCustomValidity === "function") {
      event.target.setCustomValidity("");
    }

    formStatus.textContent = "";
  });

  observationForm.addEventListener("reset", function () {
    formStatus.textContent = "";

    observationForm
      .querySelectorAll("input, select, textarea")
      .forEach(function (field) {
        field.setCustomValidity("");
      });
  });
}

// Quiz questions
// Correct answers use option numbers starting from zero.
const questions = [
  {
    question: "What is land subsidence?",

    options: [
      "The settling or sinking of the ground",
      "Water covering normally dry land",
      "An increase in rainfall"
    ],

    correct: 0,

    explanation:
      "Land subsidence happens when the ground settles or sinks. " +
      "Flooding means water covers land that is normally dry."
  },

  {
    question: "How can pumping groundwater cause land subsidence?",

    options: [
      "It always makes the ground rise",
      "Some underground layers can become more tightly packed",
      "It stops all ground movement"
    ],

    correct: 1,

    explanation:
      "When groundwater levels fall, some underground layers " +
      "can become more tightly packed. This can cause the " +
      "ground above them to settle."
  },

  {
    question:
      "Does a marker on the Google location map show subsidence risk?",

    options: [
      "Yes, every marker shows a sinking area",
      "Yes, all marked places have the same risk",
      "No, location markers do not show subsidence risk"
    ],

    correct: 2,

    explanation:
      "The Google map helps you find places. To learn about " +
      "recorded ground movement, use the published study map " +
      "and check its legend and observation period."
  },

  {
    question:
      "What is a useful way to describe an environmental concern?",

    options: [
      "Guess the cause before recording what happened",
      "Write down what you saw, where it happened, and when",
      "Assume every crack is caused by subsidence"
    ],

    correct: 1,

    explanation:
      "A clear observation includes what you saw, the location, " +
      "and the date if you know it. An observation alone " +
      "does not confirm what caused the problem."
  },

  {
    question:
      "What period does the published study map on this website cover?",

    options: [
      "Live conditions today",
      "Only the year 2026",
      "2015 to the first quarter of 2021"
    ],

    correct: 2,

    explanation:
      "The map shows observations from 2015 to the first quarter " +
      "of 2021. The study was published in 2026, but that is " +
      "different from the period when the observations were made."
  }
];

// Quiz
const quizContainer = document.querySelector("#quiz");

if (quizContainer) {
  let currentQuestion = 0;
  let selectedAnswers = [];
  let answered = false;

  const quizForm = document.querySelector("#quiz-form");
  const questionText = document.querySelector("#question");
  const optionsContainer = document.querySelector("#options");
  const progressText = document.querySelector("#quiz-progress");
  const progressBar = document.querySelector("#progress");
  const checkButton = document.querySelector("#check-answer");
  const nextButton = document.querySelector("#next-question");
  const feedback = document.querySelector("#answer-feedback");
  const results = document.querySelector("#quiz-results");
  const scoreHeading = document.querySelector("#score-heading");
  const reviewContainer = document.querySelector("#review");
  const retryButton = document.querySelector("#retry");

  function displayQuestion() {
    const item = questions[currentQuestion];

    answered = false;

    progressText.textContent =
      `Question ${currentQuestion + 1} of ${questions.length}`;

    progressBar.max = questions.length;
    progressBar.value = currentQuestion;

    questionText.textContent = item.question;
    optionsContainer.replaceChildren();

    item.options.forEach(function (optionText, optionIndex) {
      const label = document.createElement("label");
      label.className = "option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = String(optionIndex);
      radio.required = true;

      label.append(
        radio,
        document.createTextNode(optionText)
      );

      optionsContainer.append(label);
    });

    feedback.textContent = "";

    quizForm.hidden = false;
    checkButton.hidden = false;
    nextButton.hidden = true;
    results.hidden = true;
  }

  // Check the selected answer.
  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (answered) {
      return;
    }

    const selected = quizForm.querySelector(
      'input[name="answer"]:checked'
    );

    if (!selected) {
      return;
    }

    answered = true;

    const answerIndex = Number(selected.value);
    const item = questions[currentQuestion];

    selectedAnswers[currentQuestion] = answerIndex;

    if (answerIndex === item.correct) {
      feedback.textContent =
        "Correct! " + item.explanation;
    } else {
      feedback.textContent =
        "Not quite. The correct answer is: " +
        item.options[item.correct] +
        ". " +
        item.explanation;
    }

    quizForm
      .querySelectorAll('input[name="answer"]')
      .forEach(function (radio) {
        radio.disabled = true;
      });

    progressBar.value = currentQuestion + 1;
    checkButton.hidden = true;

    if (currentQuestion === questions.length - 1) {
      nextButton.textContent = "See Results →";
    } else {
      nextButton.textContent = "Next Question →";
    }

    nextButton.hidden = false;
    nextButton.focus();
  });

  // Move to the next question or show results.
  nextButton.addEventListener("click", function () {
    if (!answered) {
      return;
    }

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      displayQuestion();

      optionsContainer.querySelector("input").focus();
    } else {
      displayResults();
    }
  });

  function displayResults() {
    quizForm.hidden = true;
    nextButton.hidden = true;
    feedback.textContent = "";
    results.hidden = false;

    progressText.textContent = "Quiz complete";
    progressBar.value = questions.length;

    let score = 0;

    questions.forEach(function (item, index) {
      if (selectedAnswers[index] === item.correct) {
        score++;
      }
    });

    scoreHeading.textContent =
      `Your score: ${score} / ${questions.length}`;

    reviewContainer.replaceChildren();

    questions.forEach(function (item, index) {
      const reviewItem = document.createElement("article");
      reviewItem.className = "review-item";

      const title = document.createElement("h3");
      title.textContent = `${index + 1}. ${item.question}`;

      const yourAnswer = document.createElement("p");
      yourAnswer.textContent =
        "Your answer: " + item.options[selectedAnswers[index]];

      const correctAnswer = document.createElement("p");
      correctAnswer.textContent =
        "Correct answer: " + item.options[item.correct];

      const explanation = document.createElement("p");
      explanation.textContent = item.explanation;

      reviewItem.append(
        title,
        yourAnswer,
        correctAnswer,
        explanation
      );

      reviewContainer.append(reviewItem);
    });

    scoreHeading.focus();
  }

  // Start the quiz again.
  retryButton.addEventListener("click", function () {
    currentQuestion = 0;
    selectedAnswers = [];

    displayQuestion();
    optionsContainer.querySelector("input").focus();
  });

  displayQuestion();
}