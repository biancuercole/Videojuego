export default class StartScene extends Phaser.Scene {
    constructor() {
      super("start"); // Nombre único para identificar la escena
    }


    init() {}

    preload() {
        this.load.image("background", "./assets/images/Cielo.png")
        this.load.image("ninja", "./assets/images/Ninja.png")
        this.load.image("platform", "./assets/images/platform.png")
    }

    create() {}

    update() {}

    
}