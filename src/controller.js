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

    generateRandomBoard(player2)
    player2.gameboard.printGrid()

    renderGame()
}

function placeShip(player, length){
    return new Promise((resolve) => {
        let vertical = false
        const placementModal = document.createElement("div")
        const header = document.createElement("h2")
        header.textContent = "Place your ships"
        const tip = document.createElement("span")
        tip.textContent = "Use RMB to rotate"
        const board = document.createElement("div")
        board.classList.add("board")

        const resolveFunc = (x,y,vertical) => {
            if(player.gameboard.validPlacement(length,x,y,vertical)){
                    player.gameboard.placeShip(length,x,y,vertical)
                    resolve()
            }
        }

        board.addEventListener("contextmenu",(e) => {
            e.preventDefault()
            vertical = !vertical
            drawPlacementGrid(player,length,vertical,board,resolveFunc)
        })

        drawPlacementGrid(player,length,vertical,board,resolveFunc)

        placementModal.appendChild(header)
        placementModal.appendChild(tip)
        placementModal.appendChild(board)
        content.replaceChildren(placementModal)
    })
}

function drawPlacementGrid(player, length, vertical, container, resolveFunc){
    container.replaceChildren()
    const cellGrid = new Array(10).fill(1).map(() => new Array(10))
    for(let y=0;y<10;y++){
        for(let x=0;x<10;x++){
            const cell = document.createElement("div")
            cell.classList.add("cell")
            if(player.gameboard.grid[y][x]){
                cell.classList.add("ship")
            }
            cellGrid[y][x] = cell
            container.appendChild(cell)

            cell.addEventListener("mouseover",() => {
                if(player.gameboard.validPlacement(length,x,y,vertical)){
                    if(vertical){
                        for(let i=y;i<y+length;i++){
                        cellGrid[i][x].style.backgroundColor = 'lightgrey'
                    }
                }else{
                    for(let i=x;i<x+length;i++){
                        cellGrid[y][i].style.backgroundColor = 'lightgrey'
                    }
                }
            }})

            cell.addEventListener("mouseout",() => {
                if(player.gameboard.validPlacement(length,x,y,vertical)){
                    if(vertical){
                        for(let i=y;i<y+length;i++){
                        cellGrid[i][x].style.backgroundColor = ''
                    }
                }else{
                    for(let i=x;i<x+length;i++){
                        cellGrid[y][i].style.backgroundColor = ''
                    }
                }
            }
            })

            cell.addEventListener("click",() => {
                resolveFunc(x,y,vertical)
            })
        }
    }
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

function generateRandomBoard(player){
    generateRandomPlacement(player,5)
    generateRandomPlacement(player,4)
    generateRandomPlacement(player,3)
    generateRandomPlacement(player,3)
    generateRandomPlacement(player,2)
}

function generateRandomPlacement(player, length){
    let vertical = Math.random() < 0.5
    let x = Math.floor(Math.random()*10)
    let y = Math.floor(Math.random()*10)

    while(!player.gameboard.placeShip(length,x,y,vertical)){
        vertical = Math.random() < 0.5
        x = Math.floor(Math.random()*10)
        y = Math.floor(Math.random()*10)
    }
}

module.exports = startGame