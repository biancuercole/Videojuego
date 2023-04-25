// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/
// Doc standard code: https://docs.google.com/document/d/1fUqwT-g3VErUp3RqYHkFT2SL5HAxWaDaA9AbchGQGtQ/preview

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("hello-world");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes: "data" object from param
  }

  preload() {
    // load assets
    this.load.setBaseURL("http://labs.phaser.io");

    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.image("red", "assets/particles/red.png");
  }

  create() {
    // create game objects
    this.add.image(400, 300, "sky");

    const particles = this.add.particles("red");

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    const logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);

    // add sky background

    // add platforms static group

    // add shapes group

    // add sprite player

    // create cursors

    // add collider between player and platforms

    // add collider between player and shapes

    // add overlap between player and shapes
  }

  update() {
    // update game objects
    // check if not game over or win
    // update player movement
    // update player jump
  }
}
