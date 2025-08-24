const Gameboard = require("./gameboard")

class Player{
    constructor(name){
        this.name = name
        this.gameboard = new Gameboard()
    }

    // get name(){
    //     return this.name
    // }

    // set name(name){
    //     this.name = name
    // }

    // get gameboard(){
    //     return this.gameboard
    // }

}

module.exports = Player