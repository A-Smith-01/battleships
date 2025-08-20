const Gameboard = require("../src/gameboard")

// test("Testing if placing ships works",() => {
//     const board = Gameboard()
//     board.placeShip(3,0,0) // length, x, y
//     expect(board.ships.size).toBe(1)
// })

test("Testing if attacks work",() => {
    const board = Gameboard()
    board.placeShip(3,0,0)
    expect(board.recieveAttack(1,0)).toBe(true)
    expect(board.recieveAttack(1,1)).toBe(false)
})

test("Testing if reporting all ships sunk works",() => {
    const board = Gameboard()
    board.placeShip(3,0,0)
    board.recieveAttack(0,0)
    board.recieveAttack(1,0)
    board.recieveAttack(2,0)

    expect(board.allShipsSunk()).toBe(true)
})