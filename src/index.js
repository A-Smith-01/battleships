import "./style.css"
const startGame = require("./controller")
const content = document.querySelector(".content")

content.appendChild(startGame())