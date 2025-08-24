const Ship = require("./ship")

function Gameboard(){
    const grid = new Array(10).fill(0).map(() => new Array(10).fill(0))
    const ships = new Map()

    function placeShip(len,x,y){
        if(x+len<=10){
            const ship = Ship(len)
            for(let i = x;i<x+len;i++){
                grid[y][i] = "S"
                ships.set(i+""+y,ship)
            }
            return true
        }else{
            return false
        }
    }

    function recieveAttack(x,y){
        const hitLoc = grid[y][x]
        console.log(hitLoc)
        if(!hitLoc){
            grid[y][x] = "X"
            return true
        }else if(hitLoc == "S"){
            grid[y][x] = "H"
            ships.get(x+""+y).hit()
            return true
        }else{
            return false
        }
    }

    function allShipsSunk(){
        let allSunk = true
        ships.values().forEach(ship => {
            if(!ship.isSunk()){
                console.log("yup")
                allSunk = false
            }
        });
        return allSunk
    }

    function printGrid(){
        grid.forEach(row => {
            let out = ""
            row.forEach(elem => {
                out += elem + " "
            })
            console.log(out)
        })
    }

    return {grid,placeShip,recieveAttack, allShipsSunk, printGrid}
}

module.exports = Gameboard