const Gameboard = require("../src/factories/gameboard")

test("Testing if placing ships works",() => {
    const board = Gameboard()
     // length, x, y
     // Valid placements
    expect(board.placeShip(3,0,0)).toBe(true)
    expect(board.placeShip(5,5,5)).toBe(true)
    // Overlapping with existing
    expect(board.placeShip(2,0,0)).toBe(false)

    // Too long for board
    expect(board.placeShip(10,4,4)).toBe(false)
})

test("Testing if attacks work",() => {
    const board = Gameboard()
    board.placeShip(3,0,0)
    board.printGrid()
    expect(board.recieveAttack(1,0)).toBe(true)
    expect(board.recieveAttack(1,1)).toBe(true)
    
    // Should not be able to hit cells that have already been hit
    expect(board.recieveAttack(1,0)).toBe(false)
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