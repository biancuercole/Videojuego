import {PLAYER_MOVEMENTS, SHAPE_DELAY, SHAPES, TRIANGULO, CUADRADO, ROMBO, TIME_DELAY} from "../../utils.js"

export default class Game extends Phaser.Scene {
  constructor() {
    // le da comienzo a la escena, el nombre en comillas es el que se usa para citar de otras paginas
    super("game");
  }

  //Inicia valores
  init() {
    this.shapesRecolected = {
      "Triangulo": { count: 0, puntos: 10 },
      "Cuadrado": { count: 0, puntos: 20 },
      "Rombo": { count: 0, puntos: 30 },
    };

    this.score = 0;
    this.timer = 30;
    this.isWinner = false;
    this.isGameOver = false;
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
    this.platformsGroup.create(50, 420, "platform").setScale(1).refreshBody();
    this.platformsGroup.create(700, 320, "platform").setScale(1).refreshBody();
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
    this.scoreText = this.add.text(16, 16, "T: O / C: 0 / R: 0 / SCORE: ", {
      fontSize: "16px",
      fill: "#E0CDF8",
      fontFamily: "Verdana",
    });

    this.time.addEvent ({
      delay: TIME_DELAY,
      callback: this.updateTimer, 
      callbackScope: this,
      loop: true,
    })

    this.time = this.add.text(690, 16, "Tiempo: " + this.timer, {
      fontSize: "16px",
      fill: "#E0CDF8",
      fontWeight: "Bolder",
      fontFamily: "Verdana",
      backgroundColor: "#8E4EDE",
    })
  }

  update() {
    //check game over or win
    if (this.isWinner) {
      this.scene.start("Winner");
    }

    if (this.isGameOver) {
      this.scene.start("gameOver");
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
    this.score += this.shapesRecolected[shapeName].puntos; 
    this.shapesRecolected[shapeName].count++;
    

    //UPDATE SCORE TEXT 
    this.scoreText.setText(
      "T: " + 
        this.shapesRecolected[TRIANGULO].count + 
        " / C: " + 
        this.shapesRecolected[CUADRADO].count +  
        " / R: " + 
        this.shapesRecolected[ROMBO].count +
        " / SCORE: " + this.score 
    );
    console.log(this.shapesRecolected);
    //check if winner 
    //take two of each shape
    if (
      this.score >= 100
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

  updateTimer(){
    this.timer--
    console.log(this.timer)
    this.time.setText(
    "Tiempo: " + this.timer,
    )
    if (this.timer == 0) {
      this.isGameOver = true;
    }
  }
  

}
