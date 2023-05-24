let url = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";


function showPopup(title, message) {
  document.getElementById("popup").style.display = "block";
  document.getElementById("blur-background").style.display = "block";

  popup.querySelector("p.title").innerHTML = title;
  popup.querySelector("p.message").innerHTML = message;
}

function hidePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("blur-background").style.display = "none";
}

window.addEventListener("load", async function () {
  var apiUrl =
    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
  var loadingIndicator = document.getElementById("loading-indicator");

  try {
    // Show the loading indicator
    loadingIndicator.style.display = "block";

    var response = await fetch(apiUrl);
    var data = await response.json();

    handleQuizData(data);

    // Hide the loading indicator
    loadingIndicator.style.display = "none";
  } catch (error) {
    console.log("An error occurred:", error);
  }
});


function createQuestion(question, answers, currentIndex, totalQuestions) {

  let questionContainer = document.getElementById("question-container");
  let quizForm = document.getElementById("quiz-form");

  let questionCounter = document.getElementById("question-counter");
  questionCounter.textContent = `Question ${currentIndex + 1} of ${totalQuestions}`;


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
  answers.forEach(function (answer) {
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

  let quizForm = document.getElementById("quiz-form");

  if (response.results.length > 0) {

    let firstQuestion = response.results[0];
    let question = firstQuestion.question;

    let answers = firstQuestion.incorrect_answers.concat(
      firstQuestion.correct_answer
    );

    createQuestion(question, answers, 0, response.results.length);


    // Add submit event listener to the form
    var submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", function(event) {
      event.preventDefault();
    
      var selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
    
      handleAnswerSubmission(response);
    });
  }
}


let currentQuestionIndex = 0; // Initialize the current question index
let currentScore = 1;

// Function to handle the answer submission
function handleAnswerSubmission(response) {
  // Get the selected answer
  let selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
  let score = document.getElementById("score-counter");

  if (selectedAnswer == response.results[currentQuestionIndex]["correct_answer"]) {
    // Correct answer
    showPopup("Correct!","");
    score.innerHTML = "Points "+ currentScore++

  } else {
    // Incorrect answer
    showPopup("Incorrect","The right answer was: " + response.results[currentQuestionIndex]["correct_answer"]);

  }

  setTimeout(function () {

    hidePopup()

    currentQuestionIndex++; // Move to the next question

    if (currentQuestionIndex < response.results.length) {
      // More questions are available
      let question = response.results[currentQuestionIndex].question;
      let answers = response.results[currentQuestionIndex].incorrect_answers.concat(
        response.results[currentQuestionIndex].correct_answer
      );

      createQuestion(question, answers, currentQuestionIndex, 10);
    } else {
      // All questions have been answered
      console.log("Quiz finished");
    }
  }, 2000);
}



