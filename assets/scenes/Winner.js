import {TRIANGULO, CUADRADO, ROMBO, CRUZ, SHAPES} from "../../utils.js"
export default class Winner extends Phaser.Scene {
    constructor () {
        super ("Winner");
    }

    init() {
    }


    preload () {
    this.load.image("sky", "./assets/images/Cielo.png");
    this.load.image("platform", "./assets/images/platform.png");
    this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
    this.load.image(ROMBO, "./assets/images/Rombo.png");
    this.load.image(CUADRADO, "./assets/images/cuadrado.png");
    this.load.image(CRUZ, "./assets/images/Cruz.png");
    }

    create () {
        this.add.image(400, 300, "sky").setScale(0.555);
        this.winText = this.add.text (300, 260, "¡Ganaste!", {
            fontFamily: "Arial",
            fontType: "bold",
            fontSize: "50px",
            fill: "#E0CDF8",
            align: "center",
            backgroundColor: "#8E4EDE",
        });
        this.shapesG = this.physics.add.group();
        this.platformG = this.physics.add.staticGroup();
        this.platformG.create(400,580, "platform").setScale(2).refreshBody();
        this.physics.add.collider(this.platformG, this.shapesG);

        this.time.addEvent({
            delay: 500,
            callback: this.addShape,
            callbackScope: this,
            loop: true,
        });

    }

    update () {}
    addShape() {
        const randomShape = Phaser.Math.RND.pick(SHAPES);
        const randomX = Phaser.Math.RND.between(0, 800);
        this.shapesG.create(randomX, 0, randomShape) 
    }
}

