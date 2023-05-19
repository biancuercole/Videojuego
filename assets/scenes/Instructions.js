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
        this.add.image(640, 170, "cruz")
        this.add.image(80, 170, "triangulo")
        this.add.image(165, 170, "cuadrado")
        this.add.image(250, 170, "rombo")
        this.add.image(400, 350, "bomba")

        this.instructionsT = this.add.text(screenWidth / 2, 35, "Instrucciones", {
            fontSize: "30px",
            fontFamily: "Verdana",
            fill: "#E0CDF8",
            fontWeight: "bold",
        });
        this.instructionsT.setOrigin(0.5);
        this.shapeInst = this.add.text(80, 100, "Colecta las figuras", {
            fontSize: "20px",
            fontFamily: "Verdana",
            fill: "#E0CDF8",
        });

        this.cruzInst = this.add.text(520, 100, "Evita juntar las cruces", {
            fontSize: "20px",
            fontFamily: "Verdana",
            fill: "#E0CDF8",
        });

        this.bombaInst = this.add.text(screenWidth / 2, 300, "¡No dejes que la bomba toque el piso!", {
            fontSize: "20px",
            fontFamily: "Verdana",
            fill: "#E0CDF8",
        }); this.bombaInst.setOrigin(0.5);

        this.bombaInst = this.add.text(screenWidth / 2, 430, "¡Juntá 2 figuras de cada tipo y sumá 100 puntos para ganar!", {
            fontSize: "20px",
            fontFamily: "Verdana",
            fill: "#E0CDF8",
        }); this.bombaInst.setOrigin(0.5);

        const button = this.add.text(305, 500, "¡Empecemos!", {
            fontSize: "30px",
            fill: "#E78F8F",
            backgroundColor: "#763D3D",
            fontFamily: "Arial",
            fontWeight: "bolder",
        }).setInteractive();

        button.on("pointerover", () => {
            button.setBackgroundColor("#693636")
            this.game.canvas.style.cursor = "pointer"
        });

        button.on("pointerout", () => {
            button.setBackgroundColor("#763D3D")
            this.game.canvas.style.cursor = "default";
        });
        
        button.on("pointerdown", () => {
            button.setBackgroundColor("#763D3D")
            this.game.canvas.style.cursor = "default";
            this.scene.start("game");
        });
    }

    upload () {}

}