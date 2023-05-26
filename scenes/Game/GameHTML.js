import { loadingHTML } from "../../components/Loading.js";

export class GameHtml {

  generateMenuHTML() {
        const html = `
        <div class="page">
        <div class="heading-container">
          <div class="button-container">
            <button id="home-button">Home</button>
          </div>
          <div class="heading-title">
            <h1>Quiz</h1>
          </div>
          <div class="button-container">
            <button id="next-button">Skip</button>
          </div>
        </div>
        <div id="question-container">
          <p id="question-counter"></p>
          <form id="quiz-form">
            ${loadingHTML}
          </form>
          <button id="submit-button">Submit</button>
        </div>
        <div id="score-counter">Points 0</div>
      </div>
        `;
        
        const container = document.getElementById("content");
        
        container.innerHTML = html;
      }

    }