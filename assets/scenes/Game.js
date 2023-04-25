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
    this.load.image("triangulo", "./assets/images/Triangulo.png");
  }

  create() {
    // create game objects
    // agregado sin fisicas
    // add sky background
    this.add.image(400, 300, "sky").setScale(0.555);

    // agregado con fisicas
    // add sprite player
    this.player = this.physics.add.sprite(100, 500, "player");

    // add platforms static group
    this.platformsGroup = this.physics.add.staticGroup();
    this.platformsGroup.create(400, 568, "platform").setScale(2).refreshBody();

    // add shapes group
    this.shapesGroup = this.physics.add.group();
    this.shapesGroup.create(100, 0, "triangulo");

    // add collider between player and platforms
    this.physics.add.collider(this.player, this.platformsGroup);

    // add collider between platforms and shapes
    this.physics.add.collider(this.shapesGroup, this.platformsGroup);

    // add overlap between player and shapes
    this.physics.add.overlap(
      this.player,
      this.shapesGroup,
      this.collectShape, // funcion que llama cuando player choca con shape
      null, //dejar fijo por ahora
      this //dejar fijo por ahora
    );

    // create cursors
  }

  update() {
    // update game objects
    // check if not game over or win
    // update player movement
    // update player jump
  }

  collectShape(jugador, figuraChocada) {
    // remove shape from screen
    console.log("figura recolectada");
    figuraChocada.disableBody(true, true);
  }
}
