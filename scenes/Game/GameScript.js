import { Popup } from '../../components/Popup.js';

export class GameScript {
    constructor(questionContainerId, quizFormId, questionCounterId, submitButtonId, scoreCounterId) {
      this.questionContainer = document.getElementById(questionContainerId);
      this.quizForm = document.getElementById(quizFormId);
      this.questionCounter = document.getElementById(questionCounterId);
      this.submitButton = document.getElementById(submitButtonId);
      this.scoreCounter = document.getElementById(scoreCounterId);
      this.currentQuestionIndex = 0;
      this.currentScore = 1;
    }
  
    createQuestion(question, answers, totalQuestions) {
      this.questionCounter.innerHTML = `Question ${this.currentQuestionIndex + 1} of ${totalQuestions}`;
  
      // Remove existing question element
      let existingQuestion = this.questionContainer.querySelector(".question");
      if (existingQuestion) {
        existingQuestion.replaceWith(this.createQuestionElement(question));
      } else {
        this.questionContainer.insertBefore(this.createQuestionElement(question), this.quizForm);
      }
  
      // Remove existing answer elements
      while (this.quizForm.firstChild) {
        this.quizForm.removeChild(this.quizForm.firstChild);
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
        this.quizForm.appendChild(answerItem);
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
        let firstQuestion = response.results[0];
        let question = firstQuestion.question;
  
        let answers = firstQuestion.incorrect_answers.concat(firstQuestion.correct_answer);
  
        this.createQuestion(question, answers, response.results.length);
  
        // Add submit event listener to the form
        this.submitButton.addEventListener("click", (event) => {
          event.preventDefault();
          this.handleAnswerSubmission(response);
        });
      }
    }

    handleAnswerSubmission(response) {
      const popup = new Popup();



        // Get the selected answer
        let selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
    
        if (selectedAnswer == response.results[this.currentQuestionIndex]["correct_answer"]) {
          // Correct answer
          popup.showPopup("Correct", "");
          this.scoreCounter.innerHTML = "Points " + this.currentScore++;
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
            // All questions have been answered
            console.log("Quiz finished");
          }
        }, 2000);
      }




    }