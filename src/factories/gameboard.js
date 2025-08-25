const Ship = require("./ship")

function Gameboard(){
    const grid = new Array(10).fill(0).map(() => new Array(10).fill(0))
    const ships = new Map()

    function placeShip(len,x,y,vertical){
        vertical = vertical ?? false
        if(!validPlacement(len,x,y,vertical)){
            return false
        }
        const ship = Ship(len)
        if(vertical){
            for(let i = y;i<y+len;i++){
                grid[i][x] = "S"
                ships.set(x+""+i,ship)
            }
        }else{
            for(let i = x;i<x+len;i++){
                grid[y][i] = "S"
                ships.set(i+""+y,ship)
            }
        }
        return true
    }

    function validPlacement(len,x,y,vertical){
        vertical = vertical ?? false
        if(vertical){
            if(y+len<=10){
                for(let i = y;i<y+len;i++){
                    if(grid[i][x]){
                        return false
                    }
                }
            }else{
                return false
            }
        }else{
            if(x+len<=10){
                for(let i = x;i<x+len;i++){
                    if(grid[y][i]){
                        return false
                    }
                }
            }else{
                return false
            }
        }
        return true
    }

    function recieveAttack(x,y){
        const hitLoc = grid[y][x]
        console.log(x+","+y+":"+hitLoc)
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

    return {grid,validPlacement,placeShip,recieveAttack, allShipsSunk, printGrid}
}

module.exports = Gameboard