export default class HelpScene extends Phaser.Scene {
    constructor() {
      super("instructions"); // Nombre único para identificar la escena
    }

    init () {}

    preload () {
        this.load.image("background", "./assets/images/Cielo.png");
        this.load.image("cruz", "./assets/images/Cruz.png");
        this.load.image("triangulo", "./assets/images/Triangulo.png");
        this.load.image("cuadrado", "./assets/images/Cuadrado.png");
        this.load.image("rombo", "./assets/images/Rombo.png");
        this.load.image("bomba", "./assets/images/Bomba.png");
    }

    create () {
        const screenWidth = this.cameras.main.width;
        this.add.image(400, 300, "background").setScale(0.555);
        this.add.image(400, 300, "cruz")
        this.add.image(400, 300, "triangulo")
        this.add.image(400, 300, "cuadrado")
        this.add.image(400, 300, "rombo")
        this.add.image(400, 300, "bomba")

        this.instructionsT = this.add.text(screenWidth / 2, 35, "Instrucciones", {
            fontSize: "30px",
            fontFamily: "Verdana",
            fill: "#E0CDF8",
            fontWeight: "bold",
        });
        this.instructionsT.setOrigin(0.5);

    }

    upload () {}

}