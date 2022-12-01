console.log("good morning developers")

// VARIALBLES
class Character {
	// === ! CONSTRUCTOR ! === //
	// create the properties of the character and sets their initial value
	constructor() {
		this.name = "pet"
		this.playLevel = 10
		this.eatLevel = 10
		this.sleepLevel = 10
		console.log(this)
	}
	// === ! METHODS ! === //
	// what are functions that will effect the character? they should be defined here
	increaseStatLevel(statToChange) {
		// console.log the parameter to confirm it's working the way you think it is
		// console.log("stat passed:", statToChange)
		// if the stat level is at 10 guard it from increasing any more so the user can't go past 10
		if (this[statToChange] >= 10) return
		// if the stat doesn't get returned up above, then increase it's value
		this[statToChange]++
		// return the value so you know it works
		return this[statToChange]
	}
}

class Game {
	static gameInterval = null
	static statInterval = null
	// === ! CONSTRUCTOR ! === //
	constructor() {
		// set the initial values to null so that we can use this intentional lack of value in conditional statements later
		this.timer = null
		this.gameOn = null
		console.log(this)
	}
	// === ! METHODS ! === //
	gameTimer() {
		// if timer is null set it to a Number
		if (this.timer === null) {
			this.timer = 0
		}
		// if timer is not null increase it
		this.timer++
		// console log the time change to confirm it works
		// console.log(this.timer)
	}
    gameStart() {
        console.log("game start invoked")
        console.log(Game.gameInterval)
        Game.gameInterval = setInterval(function(){
            // this.gameTimer()
            console.log(Game.gameTimer)
        }, 1000)
    }
	handleStatChange(obj) {
		// check that the param is grabbing the data you want
		console.log("handlestatchange", obj)
		// loop over the key value pairs on the obj param
		for (let [key, value] of Object.entries(obj)) {
			// if the value is a number and if it's greater than 1 then we want to effect it
			if (Number.isInteger(value) && value >= 1) {
				// decrement the stat
				obj[key]--
				this.gameOver(obj)
			}
		}
		// return obj to see the changes
		// return obj
	}
	gameOver(obj) {
		// check the param data is what you think it is
		// console.log(obj)
		for (let [key, value] of Object.entries(obj)) {
			// console.log(key, value)
			if (Number.isInteger(value) && value === 0) {
				console.log("GAME OVER")
				// stop the interval
				clearInterval(Game.gameInterval)
				clearInterval(Game.statInterval)
			}
		}
	}
}


document.addEventListener("DOMContentLoaded", function () {
	console.log("main.js loaded")
	// kitty.playLevel = 5
	// kitty.increaseStatLevel("playLevel")

	// gameInterval = setInterval(function () {
	// 	game.gameTimer()
	// }, 1000)
	// statInterval = setInterval(function () {
	// 	game.handleStatChange(kitty)
	// }, 3000)

    const startBtn = document.querySelector("#start")
    startBtn.addEventListener("click", function() {
        console.log("start btn clicked")
        const kitty = new Character()
        const game = new Game()
    })
    const resetBtn = document.querySelector("#reset")
    resetBtn.addEventListener("click", function() {
        console.log("reset btn clicked")
    })

})
