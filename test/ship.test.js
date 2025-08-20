const Ship = require("../src/ship")

test('Testing the hit function',() => {
    const ship = Ship(3)
    ship.hit()
    expect(ship.getHits()).toBe(1)
    ship.hit()
    expect(ship.getHits()).toBe(2)
})

test('The ship should be sunk after hits == length',() => {
    const ship = Ship(3)
    ship.hit()
    expect(ship.isSunk()).toBe(false)
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true)
})