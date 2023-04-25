import {PLAYER_MOVEMENTS, SHAPE_DELAY, SHAPES, TRIANGULO, CUADRADO, ROMBO} from "../../utils.js"

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("game");
  }

  init() {
    let shapesRecolected = [
      { type: "Triangulo", count: 0 },
      { type: "Cuadrado", count: 0 },
      { type: "Rombo", count: 0 },
    ];
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
  }

  update() {
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
  }

  addShape(){
    console.log(new Date());


    const randomShape = Phaser.Math.RND.pick(SHAPES);
    const randomX = Phaser.Math.RND.between(0, 800);
    this.shapesGroup.create(randomX, 0, randomShape); 
    console.log("shape is added", randomX, randomShape);
  }
}
