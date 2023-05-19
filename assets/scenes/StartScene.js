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

    create() {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
        this.add.image(400,300, "background").setScale(0.555);
        this.add.image(screenWidth / 2, 505, "ninja");
        this.add.image(400,568, "platform").setScale(2);


        this.startText = this.add.text(screenWidth / 2, 200, "Ninja Moncho",{
            fontSize: "40px",
            fill: "#E0CDF8",
            fontFamily: "Verdana",
            fontWeight: "Bolder",
            textAlign: "center",
            backgroundColor: "#8E4EDE",
        })
        this.startText.setOrigin(0.5);
        this.startSub = this.add.text(screenWidth / 2, 250, "The game",{
            fontSize: "30px",
            fill: "#E0CDF8",
            fontFamily: "Verdana",
            fontWeight: "Bold",
            textAlign: "center",
        })
        this.startSub.setOrigin(0.5);

        const button = this.add.text(365, 350, "Jugar", {
            fontSize: "30px",
            fill: "#E78F8F",
            backgroundColor: "#763D3D",
            fontFamily: "Arial",
            fontWeight: "bolder",
        }).setInteractive();

        button.on("pointerdown", () => {
            this.scene.start("instructions");
        });
    }

    update() {}

}