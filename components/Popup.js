export class Popup {
  constructor() {
    this.popupElement = null;
  }

  createPopupElement(title, message) {
    const popupHtml = `
      <div id="popup" class="popup">
        <p class="title">${title}</p>
        <p class="message">${message}</p>
      </div>
      <div id="blur-background" class="blur-background">
    
      </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = popupHtml;

    return tempDiv;
  }

  showPopup(title, message) {
    if (!this.popupElement) {
      this.popupElement = this.createPopupElement(title, message);
      document.body.appendChild(this.popupElement);
    }
    this.popupElement.childNodes[1].style.display = 'block';
    this.popupElement.childNodes[3].style.display = 'block';
  }

  hidePopup() {
    if (this.popupElement) {
      this.popupElement.style.display = 'none';
    }
  }
}
