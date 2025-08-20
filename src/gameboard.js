const Ship = require("./ship")

function Gameboard(){
    const grid = new Array(10).fill(0).map(() => new Array(10).fill(0))
    const ships = new Map()

    function placeShip(len,x,y){
        if(x+len<10){
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
            return false
        }else{
            grid[y][x] = "H"
            ships.get(x+""+y).hit()
            return true
        }
    }

    function allShipsSunk(){
        ships.values().forEach(ship => {
            if(ship.isSunk()){
                return false
            }
        });
        return true
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

    return {grid,placeShip,recieveAttack, allShipsSunk}
}

module.exports = Gameboard