import { MenuHtml } from "../../scenes/Menu/MenuHTML.js";

export class MenuScript {
constructor () {
   this.menuUi = new MenuHtml()

}

  LoadMenuPage() {
    
    this.menuUi.generateMenuHTML();
    const page = document.querySelector(".page");
    page.classList.add("slide-in");

  }

}
  