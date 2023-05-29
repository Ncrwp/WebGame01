import { GameScript } from "./scenes/Game/GameScript.js";
import { MenuScript } from "./scenes/Menu/MenuScript.js";

const gameScript = new GameScript();

let apiUrl =
  "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

async function handleRequest() {
  try {
    var response = await fetch(apiUrl);
    var data = await response.json();

    return await data;
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

window.addEventListener("load", function () {
  switchToMenuPage();
});

export function switchToMenuPage() {
  const menuScript = new MenuScript();

  menuScript.LoadMenuPage();

  const startButton = document.getElementById("start-button");

  startButton.addEventListener("click", switchToGamePage);
}

async function switchToGamePage() {
  gameScript.LoadGamePage();
  gameScript.handleQuizData(await handleRequest());

  const home = document.getElementById("home-button");
  home.addEventListener("click", function () {
    switchToMenuPage();
  });

  const next = document.getElementById("next-button");
  next.addEventListener("click", function () {
    console.log("Test");

    gameScript.handleAnswerSubmission(null, "Skip");
  });
}
