import {PLAYER_MOVEMENTS, SHAPE_DELAY, SHAPES, TRIANGULO, CUADRADO, ROMBO, CRUZ, TIME_DELAY, POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START} from "../../utils.js"

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
      "Cruz": {count: 0, puntos: -10},
    };

    this.score = 0;
    this.timer = 30;
    //el nivel arranca con ambas condiciones como falsas
    this.isWinner = false;
    this.isGameOver = false;
  }

      // cargar fondo, plataformas, formas, jugador
  preload() {
    this.load.image("sky", "./assets/images/Cielo.png");
    this.load.image("platform", "./assets/images/platform.png");
    this.load.image("player", "./assets/images/Ninja.png");
    this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
    this.load.image(ROMBO, "./assets/images/Rombo.png");
    this.load.image(CUADRADO, "./assets/images/cuadrado.png");
    this.load.image(CRUZ, "./assets/images/Cruz.png");
    this.load.image("bomb", "./assets/images/Bomba.png");
  }

  create() {
    // agregado sin fisicas
    this.add.image(400, 300, "sky").setScale(0.555);
    // agregado con fisicas 
    this.player = this.physics.add.sprite(400, 500, "player"); //objeto individual que aparece una sola vez
    this.platformsGroup = this.physics.add.staticGroup(); //objetos que aparecen mas de una vez pero quedan quietos
    this.platformsGroup.create(400, 568, "platform").setScale(2).refreshBody();
    this.platformsGroup.create(50, 390, "platform").setScale(1).refreshBody();
    this.platformsGroup.create(700, 300, "platform").setScale(1).refreshBody();
    this.shapesGroup = this.physics.add.group(); //objetos que aparecen de una vez y son dinámicos
    this.physics.add.collider(this.player, this.platformsGroup); //solo hace que choquen dos objetos
    this.physics.add.collider(this.shapesGroup, this.platformsGroup);
    this.physics.add.overlap(this.player, this.shapesGroup, this.collectShape, null, this); //hace que cuando chocan dos objetos se ejecute otra accion
    this.physics.add.overlap(this.shapesGroup, this.platformsGroup, this.reduce, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    //evento para agregar formas
    this.time.addEvent ({
      delay: SHAPE_DELAY, //cada cuanto ocurre el evento
      callback: this.addShape, //es la funcion que se ejecuta cuando ocurre este evento
      callbackScope: this,
      loop: true,
    }); 

    //evento para temporizador
    this.time.addEvent ({
      delay: TIME_DELAY,
      callback: this.updateTimer, 
      callbackScope: this,
      loop: true,
    })

    //evento para agregar la bomba 
    this.time.addEvent ({
      delay: 7000,
      callback: this.dropBomb,
      callbackScope: this,
      loop: true,
    })

    //agrega el texto del puntaje
    this.scoreText = this.add.text(16, 16, " T: 0 / C: 0 / R: 0 / SCORE: 0 ", {
      fontSize: "16px",
      fill: "#E0CDF8",
      fontFamily: "Verdana",
    });

    //texto de temporizador
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

    //controles del teclado
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

  //acciones que se ejecutan con overlaps
  collectShape(jugador, figuraChocada) {
    // remove shape from screen
    figuraChocada.disableBody(true, true);
    const shapeName = figuraChocada.texture.key;
    const percentage = figuraChocada.getData(POINTS_PERCENTAGE);
    const scoreNow = this.shapesRecolected[shapeName].puntos * percentage;
    this.score += scoreNow;
    this.shapesRecolected[shapeName].count++;

    //UPDATE SCORE TEXT 
    this.scoreText.setText(
        " T: " + this.shapesRecolected[TRIANGULO].count + 
        " / C: " + this.shapesRecolected[CUADRADO].count +
        " / R: " + this.shapesRecolected[ROMBO].count +
        " SCORE: " + this.score
    )
    //check if winner 
    //take two of each shape
    if (
      this.score >= 100 &&
      this.shapesRecolected.Triangulo.count >= 2 && 
      this.shapesRecolected.Cuadrado.count >= 2 && 
      this.shapesRecolected.Rombo.count >= 2
    ) {
      this.isWinner = true;
    }
  }

  collectBomb(bomb, player){
    bomb.disableBody(true, true);
  }

  reduce(shape, platform){
    const newPercentage = shape.getData(POINTS_PERCENTAGE) - 0.25;
    console.log(shape.texture.key, newPercentage);
    shape.setData(POINTS_PERCENTAGE, newPercentage);
    if (newPercentage <= 0) {
      shape.disableBody(true,true);
      return;
    }

    const text = this.add.text(shape.body.position.x+10, shape.body.position.y, "-25%", {
      fontSize: "22px",
      fontStyle: "bold",
      fill: "red",
    });
    setTimeout(() => {
      text.destroy();
    }, 200);
  }

  defeat(bomb, platform) {
    if (this.defeat){
      this.isGameOver = true;
    }
  }


  //callbacks de eventos
  addShape(){
    const randomShape = Phaser.Math.RND.pick(SHAPES);
    const randomX = Phaser.Math.RND.between(0, 800);
    this.shapesGroup.create(randomX, 0, randomShape) 
    .setCircle(32,0,0)
    .setBounce(0.8)
    .setData(POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START);
    console.log("shape is added", randomX, randomShape);
  }

  dropBomb() {
    const randomX = Phaser.Math.RND.between(0, 800);
    const bomb = this.physics.add.sprite(randomX, 0, "bomb");
    bomb.setGravityY(50);
    this.physics.add.overlap(bomb, this.platformsGroup, this.defeat, null, this);
    this.physics.add.overlap(bomb, this.player, this.collectBomb, null, this);
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
