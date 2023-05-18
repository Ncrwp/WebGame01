var xhr = new XMLHttpRequest();
var url = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

window.addEventListener("load", async function () {
  var apiUrl =
    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

  try {
    var response = await fetch(apiUrl);
    var data = await response.json();

    handleQuizData(data);
  } catch (error) {
    console.log("An error occurred:", error);
  }
});

function createQuestion(question, answers) {
  console.log(answers);

  var questionContainer = document.getElementById("question-container");
  var quizForm = document.getElementById("quiz-form");

  // Create the question element
  var questionElement = document.createElement("div");
  questionElement.classList.add("question");
  questionElement.textContent = question;

  // Append question to the container
  questionContainer.insertBefore(questionElement, quizForm);

  // Create the answer elements
  answers.forEach(function (answer) {
    var answerInput = document.createElement("input");
    answerInput.type = "radio";
    answerInput.name = "answer";
    answerInput.value = answer;

    var answerLabel = document.createElement("label");
    answerLabel.textContent = answer;

    var answerItem = document.createElement("div");
    answerItem.appendChild(answerInput);
    answerItem.appendChild(answerLabel);

    // Append answer item to the form
    quizForm.appendChild(answerItem);
  });
}

function handleQuizData(response) {
  console.log(response);

  var quizForm = document.getElementById("quiz-form");
  var submitButton = document.getElementById("submit-button");

  if (response.results.length > 0) {
    console.log(response.results);

    var firstQuestion = response.results[0];
    var question = firstQuestion.question;

    var answers = firstQuestion.incorrect_answers.concat(
      firstQuestion.correct_answer
    );

    createQuestion(question, answers);

    // Create the submit button
    var submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";

    // Append submit button to the form
    quizForm.appendChild(submitButton);

    // Add submit event listener to the form
    quizForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
      ).value;

      // Create result object
      var result = {
        question: question,
        selectedAnswer: selectedAnswer,
      };

      if (result["selectedAnswer"] == response.results[0]["correct_answer"]) {
        //console.log("Correct");

        popup.style.display = "block";
        popup.querySelector("p").textContent = "Correct!";
        setTimeout(function () {
          popup.style.display = "none";

          firstQuestion = response.results[1];
          question = firstQuestion.question;

          answers = firstQuestion.incorrect_answers.concat(
            firstQuestion.correct_answer
          );

          createQuestion(question, answers);
          
        }, 2000);
      } else {
        //console.log("Incorrect");

        popup.style.display = "block";
        popup.querySelector("p").textContent = "Incorrect";
        setTimeout(function () {
          popup.style.display = "none";

          createQuestion(question, answers);
        }, 2000);
      }

      //console.log(result);
    });
  }
}
