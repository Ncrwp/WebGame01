export class Test {
    render() {
      const scene = document.createElement('div');
      scene.classList.add('scene');
  
      const box = document.createElement('div');
      box.classList.add('box');
      scene.appendChild(box);
  
      return scene;
    }
  }
  