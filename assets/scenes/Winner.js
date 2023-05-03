export default class Winner extends Phaser.Scene {
    constructor () {
        super ("Winner");
    }

    initi () {}


    preload () {}


    create () {
        this.winText = this.add.text (325, 250, "Winner", {
            fontSize: "50px",
            fill: "#FAF2F9",
        })
    }


    update () {}
}

