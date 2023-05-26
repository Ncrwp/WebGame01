import { GameHtml } from './scenes/Game/GameHTML.js';
import { GameScript } from './scenes/Game/GameScript.js';

let url = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

const gameUi = new GameHtml();
gameUi.insertHtml()

const game = new GameScript("question-container", "quiz-form", "question-counter", "submit-button", "score-counter");


window.addEventListener("load", async function () {

  var apiUrl =
    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

  try {

    var response = await fetch(apiUrl);
    var data = await response.json();

    game.handleQuizData(data);

    
  } catch (error) {
    console.log("An error occurred:", error);
  }

  
});





