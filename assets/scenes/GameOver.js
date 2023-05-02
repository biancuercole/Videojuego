export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  init() {}

  preload() {}

  create() {
    this.GOText = this.add.text (400, 300, "Game Over", {
      fontSize: "20px",
      fill: "#FAF2F9"
    })
  }

  update() {}
}
