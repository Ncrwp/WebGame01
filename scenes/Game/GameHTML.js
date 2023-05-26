import { loadingHTML } from "../../components/Loading.js";

export class GameHtml {

    generateQuizHTML() {
        const html = `
          <h1>Quiz</h1>
      
          <div id="question-container">
      
              <p id="question-counter"></p>
      
              <form id="quiz-form">
                  ${loadingHTML}
              </form>
      
              <button id="submit-button">Submit</button>
      
          </div>
      
          <div id="score-counter">Points 0</div>
        `;
        
        return html;
      }

      insertHtml(){
        const container = document.getElementById("content");

        const quizHTML = this.generateQuizHTML();
        
        container.innerHTML = quizHTML;
      }

    }