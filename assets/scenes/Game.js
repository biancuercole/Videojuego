import {PLAYER_MOVEMENTS, SHAPE_DELAY, SHAPES, TRIANGULO, CUADRADO, ROMBO} from "../../utils.js"

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("game");
  }

  init() {
    this.shapesRecolected = {
      "Triangulo": { count: 0, score: 10 },
      "Cuadrado": { count: 0, score: 20 },
      "Rombo": { count: 0, score: 30 },
    };

    this.isWinner = true;
    this.isGameOver = true;
  }

  preload() {
    // cargar fondo, plataformas, formas, jugador
    this.load.image("sky", "./assets/images/Cielo.png");
    this.load.image("platform", "./assets/images/platform.png");
    this.load.image("player", "./assets/images/Ninja.png");
    this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
    this.load.image(ROMBO, "./assets/images/Rombo.png");
    this.load.image(CUADRADO, "./assets/images/cuadrado.png");
  }

  create() {
    // agregado sin fisicas
    this.add.image(400, 300, "sky").setScale(0.555);
    // agregado con fisicas
    this.player = this.physics.add.sprite(400, 500, "player");
    this.platformsGroup = this.physics.add.staticGroup();
    this.platformsGroup.create(400, 568, "platform").setScale(2).refreshBody();
    this.shapesGroup = this.physics.add.group();
    this.physics.add.collider(this.player, this.platformsGroup);
    this.physics.add.collider(this.shapesGroup, this.platformsGroup);
    this.physics.add.overlap(this.player, this.shapesGroup, this.collectShape, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.time.addEvent ({
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    }); 

    //add text score 
    this.scoreText = this.add.text(16, 16, "T: O / C: 0 / R: 0", {
      fontSize: "20px",
      fill: "#FAF2F9",
    });
  }

  update() {
    //check game over or win
    if (this.isWinner) {
      this.scene.start("Winner");
    }

    if (this.isGameOver) {
      this.scene.start("GameOver");
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-PLAYER_MOVEMENTS.x);
      } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(PLAYER_MOVEMENTS.x);
      } else {
      this.player.setVelocityX(0);
      }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-PLAYER_MOVEMENTS.y);
      } else if (this.cursors.down.isDown){
        this.player.setVelocityY(PLAYER_MOVEMENTS.y);
      }
  }

  collectShape(jugador, figuraChocada) {
    // remove shape from screen
    console.log("figura recolectada");
    figuraChocada.disableBody(true, true);

    const shapeName = figuraChocada.texture.key;
    console.log("Recolectamos un", shapeName, "!!!")
    this.shapesRecolected[shapeName].count++;

    //UPDATE SCORE TEXT 
    this.scoreText.setText(
      "T: " + 
        this.shapesRecolected[TRIANGULO].count + 
        " / C: " + 
        this.shapesRecolected[CUADRADO].count + 
        " / R: " + 
        this.shapesRecolected[ROMBO].count
    );
    console.log(this.shapesRecolected);
    //check if winner 
    //take two of each shape
    if (
      this.shapesRecolected[TRIANGULO].count >= 2 &&
      this.shapesRecolected[CUADRADO].count >= 2 &&
      this.shapesRecolected[ROMBO].count >= 2
    ) {
      this.isWinner = true;
    }

  }

  addShape(){
    console.log(new Date());


    const randomShape = Phaser.Math.RND.pick(SHAPES);
    const randomX = Phaser.Math.RND.between(0, 800);
    this.shapesGroup.create(randomX, 0, randomShape); 
    console.log("shape is added", randomX, randomShape);
  }
}
