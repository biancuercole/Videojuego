export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  init() {
  }


  preload () {
  this.load.image("sky", "./assets/images/Cielo.png");
  this.load.image("platform", "./assets/images/platform.png");
  this.load.image("player", "./assets/images/Ninja.png");
  }

  create () {
      const screenWidth = this.cameras.main.width;
      this.add.image(400, 300, "sky").setScale(0.555);
      this.player = this.physics.add.sprite(415, 450, "player");
      this.platformG = this.physics.add.staticGroup();
      this.platformG.create(400,580, "platform").setScale(2).refreshBody();
      this.physics.add.collider(this.platformG, this.player);
      this.player.setBounce(1);
      this.player.setVelocityY(-200);
      
      this.looseText = this.add.text (320, 260, "Perdiste", {
        fontFamily: "Arial",
        fontType: "bold",
        fontSize: "50px",
        fill: "#E0CDF8",
        align: "center",
        backgroundColor: "#8E4EDE",
      });

  }

  update () {}
  
}

