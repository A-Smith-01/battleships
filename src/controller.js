const Player = require("./factories/player")

let player1;
let player2;
const parent = document.querySelector(".content")
const content = document.createElement("div")
content.classList.add("game-container")
parent.appendChild(content)

async function startGame(){
    player1 = new Player("Player")

    
    await placeShip(player1,5)
    await placeShip(player1,4)
    await placeShip(player1,3)
    await placeShip(player1,3)
    await placeShip(player1,2)
    
    player1.gameboard.printGrid()

    player2 = new Player("CPU")

    player2.gameboard.placeShip(5,3,3)
    player2.gameboard.placeShip(3,3,1)
    player2.gameboard.placeShip(4,0,7)
    player2.gameboard.placeShip(2,8,8)
    player2.gameboard.placeShip(2,0,0)

    renderGame()
    // return content
}

// async function placeShip(player, length){

//     await renderPlacementOverlay()
// }

function placeShip(player, length, vertical){
    return new Promise((resolve) => {
        const placementModal = document.createElement("div")
        const header = document.createElement("h2")
        header.textContent = "Place your ships"
        const board = document.createElement("div")
        board.classList.add("board")

        const cellGrid = new Array(10).fill(1).map(() => new Array(10))
        for(let y=0;y<10;y++){
            for(let x=0;x<10;x++){
                const cell = document.createElement("div")
                cell.classList.add("cell")
                if(player.gameboard.grid[y][x]){
                    cell.classList.add("ship")
                }
                cellGrid[y][x] = cell
                board.appendChild(cell)

                cell.addEventListener("mouseover",() => {
                    if(player.gameboard.validPlacement(length,x,y,vertical)){
                        for(let i=x;i<x+length;i++){
                            cellGrid[y][i].style.backgroundColor = 'lightgrey'
                        }
                    }
                })

                cell.addEventListener("mouseout",() => {
                    if(player.gameboard.validPlacement(length,x,y,vertical)){
                        for(let i=x;i<x+length;i++){
                            cellGrid[y][i].style.backgroundColor = ''
                        }
                    }
                })

                cell.addEventListener("click",() => {
                    if(player.gameboard.validPlacement(length,x,y,vertical)){
                        player.gameboard.placeShip(length,x,y,vertical)
                        resolve()
                    }
                })
            }
        }
        placementModal.appendChild(header)
        placementModal.appendChild(board)
        content.replaceChildren(placementModal)
    })
}

function nextTurn(){
    // Check for win state
    if(player2.gameboard.allShipsSunk()){
        // Handle end game
        console.log("Player 1 won!")
        displayWinner(player1)
        return
    }

    // Do CPU turn
    cpuTurn()

    // Check for winstate
    if(player1.gameboard.allShipsSunk()){
        // Handle end game
        console.log("Player 2 won!")
        displayWinner(player2)
        return
    }

    renderGame()
}

function renderGame(){
    content.replaceChildren()
    content.appendChild(renderBoard(player1,false))
    content.appendChild(renderBoard(player2,true))

}

function renderBoard(player,hideShips){
    const container = document.createElement("div")
    const header = document.createElement("h2")
    header.textContent = `${player.name}'s Board`

    const board = document.createElement("div")
    board.classList.add("board")

    for(let y = 0; y < 10; y++){
        for(let x = 0; x < 10; x++){
            const elem = player.gameboard.grid[y][x]
            const cell = document.createElement("div")
            cell.classList.add("cell")
            if(elem == "S" && !hideShips){
                cell.classList.add("ship")
            }else if(elem == "H"){
                cell.classList.add("hit")
            }else if(elem == "X"){
                cell.classList.add("miss")
            }else{
                cell.classList.add("clickable")
            }

            if(hideShips){
                cell.addEventListener("click",() => {
                    handleClick(x,y,player.gameboard)
                })
            }
            board.appendChild(cell)
        }
    }
    container.appendChild(header)
    container.appendChild(board)

    return container
}

function displayWinner(player){
    const winnerModal = document.createElement("div")
    winnerModal.classList.add("winner-modal")

    const winnerMessage = document.createElement("h1")
    winnerMessage.textContent = player1.name + " won!"

    const newGameBut = document.createElement("button")
    newGameBut.textContent = "New game"
    newGameBut.addEventListener("click", () => {
        startGame()
    })

    winnerModal.appendChild(winnerMessage)
    winnerModal.appendChild(newGameBut)

    content.replaceChildren(winnerModal)
}

function handleClick(x,y,gameboard){
    if(gameboard.recieveAttack(x,y)){
        nextTurn()
    }
    
}

function cpuTurn(){
    let x = Math.floor(Math.random() * 10)
    let y = Math.floor(Math.random() * 10)

    while(!player1.gameboard.recieveAttack(x,y)){
        y = Math.floor(Math.random() * 10)
        x = Math.floor(Math.random() * 10) 
    }
}

module.exports = startGame