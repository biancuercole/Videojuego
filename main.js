//Importar archivos del proyecto
import Game from "./assets/scenes/Game.js";
import GameOver from "./assets/scenes/GameOver.js";
import Winner from "./assets/scenes/Winner.js";


// Configuracion de pagina
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: false,
    },
  },
  // Carga de escenas a la pagina, solo la primera se mostrará enseguida.
  scene: [Game,  Winner, GameOver],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
