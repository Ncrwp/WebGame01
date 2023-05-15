import { Home } from './Scenes/Home.js';
import { Test } from './Scenes/Test.js'; // Import the Test scene here

// Import additional scene components here

class App {
  constructor() {
    this.routes = {
      '/': Home,
      '/test': Test, // Add the Test scene to the routes object here
      // Add additional routes here
    };

    this.currentScene = null;

    // Bind this to the render method so that we can use it as a callback
    this.render = this.render.bind(this);

    // Add an event listener to listen for hash changes
    window.addEventListener('hashchange', this.render);

    // Call the render method initially to set up the first scene
    this.render();
  }

  render() {
    const app = document.getElementById('app');

    // Remove any existing scenes from the DOM
    if (this.currentScene) {
      app.removeChild(this.currentScene);
    }

    // Render the current scene
    const Scene = this.routes[window.location.hash.slice(1)] || Home;
    this.currentScene = new Scene();
    app.appendChild(this.currentScene.render());
  }
}

const myApp = new App();
