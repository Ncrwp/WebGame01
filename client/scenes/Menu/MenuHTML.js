import { loadingHTML } from "../../components/Loading.js";

export class MenuHtml {

    generateMenuHTML() {
        const html = `
        <div class="page">
          <h1>Menu</h1>
      
          <div id="button-container">

            <button id="start-button">Start</button>
            <button id="about-button">About</button>
      
          </div>

        </div>
        `;
        
        const container = document.getElementById("content");
        container.innerHTML = html;
      }

    }