let apiUrl =
  "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
let pageIndex;
let responseData;
let currentQuestionIndex = 0;
let currentScore = 1;

// #region Region 1: Starting Code
window.addEventListener("load", function () {
  switchToMenuPage();
});
// #endregion

// #region Region 2: Page Switching Code
function switchToMenuPage() {
  LoadPage("home");

  const startButton = document.getElementById("start-button");
  const registerButton = document.getElementById("register-button");
  const loginButton = document.getElementById("login-button");

  startButton.addEventListener("click", switchToGamePage);
  registerButton.addEventListener("click", switchToRegisterPage);
  loginButton.addEventListener("click", switchToLoginPage);
}

function switchToRegisterPage() {
  LoadPage("register");

  let registrationForm = document.getElementById("registration-form");
  registrationForm.addEventListener("submit", handleRegistrationForm);

  const back = document.getElementById("back-button");
  back.addEventListener("click", function () {
    switchToMenuPage();
  });
}

function switchToLoginPage() {
  LoadPage("login");

  let registrationForm = document.getElementById("login-form");
  registrationForm.addEventListener("submit", handleLoginForm);

  const back = document.getElementById("login-back-button");
  back.addEventListener("click", function () {
    switchToMenuPage();
  });
}

async function switchToGamePage() {
  LoadPage("game");

  handleQuizData(await handleRequest());

  const home = document.getElementById("home-button");
  home.addEventListener("click", function () {
    switchToMenuPage();
  });

  const next = document.getElementById("next-button");
  next.addEventListener("click", function () {
    handleAnswerSubmission(null, "Skip");
  });
}
// #endregion

// #region Region 3: Background Code
function LoadPage(page) {
  if (!!pageIndex) {
    const prevPage = document.getElementById(pageIndex);

    prevPage.classList.remove("slide-in");
    prevPage.classList.add("slide-out");

    pageIndex = "";
  }

  const nextPage = document.getElementById(page);

  nextPage.classList.remove("slide-out");
  nextPage.classList.add("slide-in");

  pageIndex = page;
}

function showPopup(title, message) {
  document.querySelector(".popup").style.display = "block";

  document.querySelector(".title").innerHTML = title;
  document.querySelector(".message").innerHTML = message;

  document.querySelector(".blur-background").style.display = "block";

  setTimeout(() => {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".blur-background").style.display = "none";
  }, 2000);
}
// #endregion

// #region Region 4: Game Code
async function handleRequest() {
  try {
    showPopup("Loading...", "");

    var response = await fetch(apiUrl);
    var data = await response.json();

    return await data;
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

function createQuestion(question, answers, totalQuestions) {
  const questionContainer = document.getElementById("question-container");
  const quizForm = document.getElementById("quiz-form");
  const questionCounter = document.getElementById("question-counter");

  questionCounter.innerHTML = `Question ${
    currentQuestionIndex + 1
  } of ${totalQuestions}`;

  // Remove existing question element
  let existingQuestion = questionContainer.querySelector(".question");
  if (existingQuestion) {
    existingQuestion.replaceWith(createQuestionElement(question));
  } else {
    questionContainer.insertBefore(createQuestionElement(question), quizForm);
  }

  // Remove existing answer elements
  while (quizForm.firstChild) {
    quizForm.removeChild(quizForm.firstChild);
  }

  // Create the answer elements
  answers.forEach((answer) => {
    let answerInput = document.createElement("input");
    answerInput.type = "radio";
    answerInput.name = "answer";
    answerInput.value = answer;

    let answerLabel = document.createElement("label");
    answerLabel.innerHTML = answer;

    let answerItem = document.createElement("div");
    answerItem.appendChild(answerInput);
    answerItem.appendChild(answerLabel);

    // Append answer item to the form
    quizForm.appendChild(answerItem);
  });
}

function createQuestionElement(question) {
  let questionElement = document.createElement("div");
  questionElement.classList.add("question");
  questionElement.innerHTML = question;

  return questionElement;
}

function handleQuizData(response) {

  if (response.results.length > 0) {
    currentQuestionIndex = 0

    console.log(response.results.length)


    responseData = response;

    let firstQuestion = responseData.results[0];
    let question = firstQuestion.question;

    let answers = firstQuestion.incorrect_answers.concat(
      firstQuestion.correct_answer
    );

    createQuestion(question, answers, responseData.results.length);

    // Add submit event listener to the form
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      handleAnswerSubmission(responseData, );
    });
  }
}

function handleAnswerSubmission(response, param) {
  const scoreCounter = document.getElementById("score-counter");

  let selectedAnswer = "";

  if (response == null) {
    response = responseData;
    selectedAnswer = "Skip";
  } else {
    selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    ).value;
  }

  if (
    selectedAnswer == response.results[currentQuestionIndex]["correct_answer"]
  ) {
    // Correct answer
    showPopup("Correct", "");
    scoreCounter.innerHTML = "Points " + currentScore++;
  } else if (param == "Skip") {
    // Skip answer
    showPopup(
      "Skipped",
      "The right answer was: " +
        response.results[currentQuestionIndex]["correct_answer"]
    );
  } else {
    // Incorrect answer
    showPopup(
      "Incorrect",
      "The right answer was: " +
        response.results[currentQuestionIndex]["correct_answer"]
    );
  }

  currentQuestionIndex++; // Move to the next question

  if (currentQuestionIndex < response.results.length) {
    // More questions are available
    let question = response.results[currentQuestionIndex].question;
    let answers = response.results[
      currentQuestionIndex
    ].incorrect_answers.concat(
      response.results[currentQuestionIndex].correct_answer
    );

    createQuestion(question, answers, response.results.length);
  } else {
    showPopup("Quiz finished", "");

    switchToMenuPage();
  }
}
// #endregion

// #region Region 5: Register Code
function registerUser(data) {
  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Registration successful:", result);
      showPopup("Registered", "");
      switchToMenuPage();
    })
    .catch((error) => {
      console.error("Registration failed:", error);
    });
}

function handleRegistrationForm(event) {
  event.preventDefault(); // Prevent the default form submission

  let form = document.getElementById("registration-form");
  let usernameInput = document.getElementById("username");
  let passwordInput = document.getElementById("password");

  let username = usernameInput.value;
  let password = passwordInput.value;
  let score = 0;

  let userData = {
    username: username,
    password: password,
    score: score,
  };

  registerUser(userData);
}
// #endregion

// #region Region 7: Log In Code
async function loginUser(data) {


  try {
    showPopup("Loading...", "");

    let response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    var data = await response.json();

    return await data;
  } catch (error) {
    console.log("An error occurred:", error);
  }

}

async function handleLoginForm(event) {
  event.preventDefault(); // Prevent the default form submission

  let form = document.getElementById("login-form");
  let usernameInput = document.getElementById("login-username");
  let passwordInput = document.getElementById("login-password");

  let username = usernameInput.value;
  let password = passwordInput.value;

  let userData = {
    username: username,
    password: password,
  };

  var result = await loginUser(userData);
  showPopup(result.message, "Hi " + result.user["username"] )
  currentScore = result.user["score"]
  switchToMenuPage();
}
// #endregion

// #region Region 8:
// #endregion

// #region Region 9:
// #endregion

// #region Region 10:
// #endregion

// #region Region 11:
// #endregion
