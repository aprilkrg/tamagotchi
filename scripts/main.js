console.log("good morning developers")

class Character {
	// === ! CONSTRUCTOR ! === //
	constructor() {
		console.log(this)
	}
	// === ! METHODS ! === //
	increaseStatLevel(statToChange) {
        console.log("increase stat invoked")

	}
}

class Game {
	// === ! CONSTRUCTOR ! === //
	constructor() {
		console.log(this)
	}
	// === ! METHODS ! === //
	gameTimer() {
        console.log("game timer invoked")
	}
    gameStart() {
        console.log("game start invoked")
    }
	handleStatChange() {
		console.log("handle stat change invoked")
	}
	gameOver() {
        console.log("game over invoked")
	}
}

const render = function(gameObj,charObj) {
    console.log("render invoked")
}

document.addEventListener("DOMContentLoaded", function () {
	console.log("main.js loaded")
})
