const game = document.getElementById("game");
const score = document.getElementById("score");

let current_score = 0;

const jeopardyData = [
  {
    genre: "WHO",
    questions: [
      {
        question: "Who wrote Harry Potter",
        answers: ["JK Rowling", "JRR TolKien"],
        correct: "JK Rowling",
        level: "easy",
      },
      {
        question: "Who was born on Krypton",
        answers: ["Aquaman", "Superman"],
        correct: "Superman",
        level: "medium",
      },
      {
        question: "Who designed the first car",
        answers: ["Karl Benz", "Henry Ford"],
        correct: "Karl Benz",
        level: "hard",
      },
    ],
  },
  {
    genre: "WHERE",
    questions: [
      {
        question: "Where is Buckingham Palace?",
        answers: ["Richmond", "London"],
        correct: "London",
        level: "easy",
      },
      {
        question: "Where is the Colosseum?",
        answers: ["Rome", "Milan"],
        correct: "Rome",
        level: "medium",
      },
      {
        question: "Where is Mount Kilamanjaro",
        answers: ["Zimbabwe", "Tanzania"],
        correct: "Tanzania",
        level: "hard",
      },
    ],
  },
  {
    genre: "WHEN",
    questions: [
      {
        question: "When is Christmas?",
        answers: ["30 DEC", "24th/25th DEC"],
        correct: "24th/25th DEC",
        level: "easy",
      },
      {
        question: "When is JSK shot?",
        answers: ["1936", "1961"],
        correct: "1936",
        level: "hard",
      },
      {
        question: "Where is WW2?",
        answers: ["1932", "1941"],
        correct: "1941",
        level: "medium",
      },
    ],
  },
  {
    genre: "WHAT",
    questions: [
      {
        question: "What is the capital of Saudi Arabia?",
        answers: ["Jebbah", "Riyadh"],
        correct: "Riyadh",
        level: "hard",
      },
      {
        question: "What is Koalas eat?",
        answers: ["Straw", "Eucalypt"],
        correct: "Eucalypt",
        level: "medium",
      },
      {
        question: "What is a kg stort for?",
        answers: ["Kilojule", "Kilogram"],
        correct: "Kilogram",
        level: "easy",
      },
    ],
  },
  {
    genre: "HOW MANY",
    questions: [
      {
        question: "How many players in a football team?",
        answers: ["15", "11"],
        correct: "11",
        level: "easy",
      },
      {
        question: "How many seconds in an hour?",
        answers: ["36000", "3600"],
        correct: "3600",
        level: "medium",
      },
      {
        question: "How many States in India",
        answers: ["28", "29"],
        correct: "29",
        level: "hard",
      },
    ],
  },
];

function addCategory(category) {
  const column = document.createElement("div");
  column.classList.add("genre-column");

  const genreTitle = document.createElement("div");
  genreTitle.classList.add("genre-title");
  genreTitle.innerHTML = category.genre;

  column.append(genreTitle);
  game.append(column);

  category.questions.forEach((question) => {
    const card = document.createElement("div");
    card.classList.add("card");

    column.append(card);

    if (question.level === "easy") {
      card.innerHTML = 100;
    } else if (question.level === "medium") {
      card.innerHTML = 200;
    } else {
      card.innerHTML = 500;
    }

    card.setAttribute("data-question", question.question);
    card.setAttribute("answer-1", question.answers[0]);
    card.setAttribute("answer-2", question.answers[1]);
    card.setAttribute("correct", question.correct);
    card.setAttribute("data-value", card.getInnerHTML());

    card.addEventListener("click", flip);
  });
}

jeopardyData.forEach((category) => addCategory(category));

function flip() {
  this.innerHTML = "";
  this.style.fontSize = "15px";

  const questionDisplay = document.createElement("div");
  questionDisplay.classList.add("question-display");
  questionDisplay.innerHTML = this.getAttribute("data-question");

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");
  const firstBtn = document.createElement("button");
  const secondBtn = document.createElement("button");
  firstBtn.classList.add("firstBtn");
  secondBtn.classList.add("secondBtn");
  firstBtn.innerHTML = this.getAttribute("answer-1");
  secondBtn.innerHTML = this.getAttribute("answer-2");

  buttonDiv.append(firstBtn, secondBtn);
  this.append(questionDisplay, buttonDiv);

  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => card.removeEventListener("click", flip));

  firstBtn.addEventListener("click", score_keeper);
  secondBtn.addEventListener("click", score_keeper);
}

function score_keeper() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => card.addEventListener("click", flip));


  const parentDiv = this.parentElement;
  const superParent = parentDiv.parentElement;

  if (superParent.getAttribute("correct") == this.innerHTML) {
    current_score += parseInt(superParent.getAttribute("data-value"));
    superParent.classList.add("correct-ans");
    setTimeout(() => {
      while (superParent.firstChild) {
        superParent.removeChild(superParent.lastChild);
      }
      superParent.innerHTML = superParent.getAttribute("data-value");
    }, 100);
  } else {
    current_score -= parseInt(superParent.getAttribute("data-value"));
    superParent.classList.add("wrong-ans");
    setTimeout(() => {
      while (superParent.firstChild) {
        superParent.removeChild(superParent.lastChild);
      }
      superParent.innerHTML = 0;
    }, 100);
  }
  superParent.removeEventListener("click", flip);
  score.innerHTML = current_score;
}
