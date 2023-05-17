export default class Winner extends Phaser.Scene {
    constructor () {
        super ("Winner");
    }

    initi () {}


    preload () {}


    create () {
        this.winText = this.add.text (this.cameras.main.centerX, this.cameras.main.centerY, "¡Ganaste!", {
            fontFamily: "Arial",
            fontType: "bold",
            fontSize: "50px",
            fill: "#90E04D",
            align: "center",
        });

    }



    update () {}
}

