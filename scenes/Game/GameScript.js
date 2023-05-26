import { Popup } from '../../components/Popup.js';
import { GameHtml } from "../../scenes/Game/GameHTML.js";


export class GameScript {
  constructor() {
    this.gameUi = new GameHtml;
    this.responseData = {}
    this.currentQuestionIndex = 0;
    this.currentScore = 1;
  }

  LoadGamePage() {
    this.currentQuestionIndex = 0
    this.gameUi.generateMenuHTML();

    const page = document.querySelector(".page");
    page.classList.add("slide-in");

  }

  createQuestion(question, answers, totalQuestions) {
    const questionContainer = document.getElementById("question-container");
    const quizForm = document.getElementById("quiz-form");
    const questionCounter = document.getElementById("question-counter");

    questionCounter.innerHTML = `Question ${this.currentQuestionIndex + 1} of ${totalQuestions}`;

    // Remove existing question element
    let existingQuestion = questionContainer.querySelector(".question");
    if (existingQuestion) {
      existingQuestion.replaceWith(this.createQuestionElement(question));
    } else {
      questionContainer.insertBefore(this.createQuestionElement(question), quizForm);
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

  createQuestionElement(question) {
    let questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = question;

    return questionElement;
  }

  handleQuizData(response) {
    if (response.results.length > 0) {
      this.responseData = response

      let firstQuestion = this.responseData.results[0];
      let question = firstQuestion.question;

      let answers = firstQuestion.incorrect_answers.concat(firstQuestion.correct_answer);

      this.createQuestion(question, answers, this.responseData.results.length);

      // Add submit event listener to the form
      const submitButton = document.getElementById("submit-button");
      submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.handleAnswerSubmission(this.responseData);
      });
    }
  }

  handleAnswerSubmission(response, param) {

    const popup = new Popup();

    const scoreCounter = document.getElementById("score-counter");
    
    let selectedAnswer = ''

    if (response == null ){
      response = this.responseData
      selectedAnswer = "Skip";
    
    } else {
      selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
    }

    if (selectedAnswer == response.results[this.currentQuestionIndex]["correct_answer"]) {
      // Correct answer
      popup.showPopup("Correct", "");
      scoreCounter.innerHTML = "Points " + this.currentScore++;
    } else if (param == "Skip") {
      // Incorrect answer
      popup.showPopup("Skipped", "The right answer was: " + response.results[this.currentQuestionIndex]["correct_answer"]);
    } else {
      // Incorrect answer
      popup.showPopup("Incorrect", "The right answer was: " + response.results[this.currentQuestionIndex]["correct_answer"]);
    }

    setTimeout(() => {
      popup.hidePopup();
      this.currentQuestionIndex++; // Move to the next question

      if (this.currentQuestionIndex < response.results.length) {
        // More questions are available
        let question = response.results[this.currentQuestionIndex].question;
        let answers = response.results[this.currentQuestionIndex].incorrect_answers.concat(response.results[this.currentQuestionIndex].correct_answer);

        this.createQuestion(question, answers, response.results.length);
      } else {

        popup.showPopup("Done");
        
        console.log("Quiz finished");
      }
    }, 2000);
  }
}
