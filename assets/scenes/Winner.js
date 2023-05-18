export default class Winner extends Phaser.Scene {
    constructor () {
        super ("Winner");
    }

    init() {
    }


    preload () {
    this.load.image("sky", "./assets/images/Cielo.png");
    this.load.image("platform", "./assets/images/platform.png");
    this.load.image("player", "./assets/images/Ninja.png");
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
        this.player = this.physics.add.sprite(415, 450, "player");
        this.platformG = this.physics.add.staticGroup();
        this.platformG.create(400,580, "platform").setScale(2).refreshBody();
        this.physics.add.collider(this.platformG, this.player);
        this.player.setBounce(1);
        this.player.setVelocityY(-200);

    }

    update () {}
    
}

