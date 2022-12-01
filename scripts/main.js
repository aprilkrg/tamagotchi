console.log("good morning developers")

// VARIALBLES
class Character {
    // create static variable so we can share information between classes
    static charObj = {} 
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
	increaseStatLevel(event) {
        console.log("increase stat invoked")
		// console.log the event
		// console.log("event:", event.target)
        // concatenate the id of the event target with level 
        const statId = event.target.id + "Level"
        // console.log(statId)
        // check if stat is under 10 to protect against button smashing
        if(Character.charObj[statId] < 10) {
            // use the statId to effect the charObj
            Character.charObj[statId]++
            // console.log(Character.charObj[statId])
            render()
        }
	}
}

class Game {
	static gameObj = {}
    static timerInterval = null
    static statInterval = null
	// === ! CONSTRUCTOR ! === //
	constructor() {
		// set the initial values to null so that we can use this intentional lack of value in conditional statements later
		this.timer = null
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
        // update the DOM
        const timer = document.querySelector("#timer")
        timer.innerText = Game.gameObj.timer
	}
    gameStart() {
        console.log("game start invoked")
        // === ! INTERVALS FOR GAMEPLAY ! === //
        Game.gameObj.timerInterval = setInterval(function() {
            Game.gameObj.gameTimer()
        }, 1000)
        Game.gameObj.statInterval = setInterval(function() {
            Game.gameObj.handleStatChange(Character.charObj)
        }, 3000)
        const startBtn = document.querySelector("#start");
        startBtn.style.display = "none";
    }
	handleStatChange() {
		// check that the param is grabbing the data you want
		console.log("handle stat change invoked")
		// loop over the key value pairs on the obj param
		for (let [key, value] of Object.entries(Character.charObj)) {
			// if the value is a number and if it's greater than 1 then we want to effect it
			if (Number.isInteger(value) && value >= 1) {
				// decrement the stat
				Character.charObj[key]--
                // render any changes to DOM
                render()
			}
		}
	}
	gameOver() {
        console.log("game over invoked")
        // === ! YOU LOSE ! === //
		for (let [key, value] of Object.entries(Character.charObj)) {
			// console.log(key, value)
			if (Number.isInteger(value) && value === 0) {
				console.log("GAME OVER")
				// stop the intervals
				clearInterval(Game.gameObj.timerInterval)
				clearInterval(Game.gameObj.statInterval)
                // update the DOM
                const msg = document.querySelector("h2")
                msg.innerText = "YOU LOSE"
                return
			}
		}
        // === ! YOU WIN ! === //
        // console.log(Game.gameObj.timer)
        if(Game.gameObj.timer > 29) {
            console.log("YOU WIN")
            clearInterval(Game.gameObj.timerInterval)
            clearInterval(Game.gameObj.statInterval)
            // update the DOM
            const msg = document.querySelector("h2")
            msg.innerText = "YOU WIN"
            return
        }
	}
}

const render = function() {
    console.log("render invoked")

    // check for game over conditions before rendering
    Game.gameObj.gameOver()

    // === ! Data & DOM for chatacter ! === //
    // create dom variables
    const playStat = document.querySelector("#playLevel");
	const eatStat = document.querySelector("#eatLevel");
	const sleepStat = document.querySelector("#sleepLevel");
    // change width of html
    playStat.style.width = Character.charObj.playLevel + 'rem';
	eatStat.style.width = Character.charObj.eatLevel + 'rem';
	sleepStat.style.width = Character.charObj.sleepLevel + 'rem';
    // set inner text of html
    playStat.innerText = Character.charObj.playLevel;
	eatStat.innerText = Character.charObj.eatLevel;
	sleepStat.innerText = Character.charObj.sleepLevel;
    
    // === ! Data & DOM for game ! === //
    // create dom variables
    const timer = document.querySelector("#timer")
    // set inner text of html
    timer.innerText = Game.gameObj.timer
}

document.addEventListener("DOMContentLoaded", function () {
	console.log("main.js loaded")

    // === ! DOM VARIABLES ! === //
    const startBtn = document.querySelector("#start")
    const statBtns = document.querySelectorAll(".stat")
    const resetBtn = document.querySelector("#reset")

    // === ! CLASS INSTANCES ! === //
    const kitty = new Character()
    Character.charObj = kitty
    const game = new Game()
    Game.gameObj = game

    // === ! EVENT LISTENERS ! === //
    startBtn.addEventListener("click", function() {
        console.log("start btn clicked")
        // invoke games start method
        Game.gameObj.gameStart()
        // attach event listeners to buttons
        for (let i = 0; i < statBtns.length; i++) {
            statBtns[i].addEventListener("click", Character.charObj.increaseStatLevel);
        };
        // invoke render function
        render()
    })

    resetBtn.addEventListener("click", function() {
        console.log("reset btn clicked")
        // create new class instances
        const doggo = new Character()
        Character.charObj = doggo
        const bored = new Game()
        Game.gameObj = bored
        // set intervals to null
        Game.gameObj.timerInterval = null
        Game.gameObj.statInterval = null
        // reveal the start button & msg again
        const startBtn = document.querySelector("#start");
        startBtn.style.display = "block";
        const msg = document.querySelector("h2")
        msg.innerText = "Begin the game by pressing the start button"
        // render new game
        render()
    })
})
