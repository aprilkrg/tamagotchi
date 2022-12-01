console.log("good morning developers")
// character class
// game class
// redner function
// dom content loaded function

class Character {
    // === ! STATIC VARS ! === // 
    static charObj = {}
    // === ! CONSTRUCTOR ! === // 
    constructor() {
        this.name = "pet"
        this.playLevel = 10
        this.eatLevel = 10
        this.sleepLevel = 10
        console.log(this)
    }
    // === ! METHODS! === // 
    increaseStatLevel(event) {
        console.log("increase stat invoked")
        const statId = event.target.id + "Level"
        Character.charObj[statId]++
        console.log("after change",Character.charObj)
    }
}

class Game {
    // === ! STATIC VARS ! === // 
    static gameObj = {}
    static timerInterval = null
    static statInterval = null
    // === ! CONSTRUCTOR ! === // 
    constructor () {
        this.timer = null
        console.log(this)
    }
    // === ! METHODS! === // 
    gameTimer() {
        console.log("timer tick toc")
        // is the timer not null
        // if it is set to 0
        // if not increment time
        if(this.timer === null) {
            this.timer = 0
        }
        this.timer++
    }
    handleStatChange() {
        console.log("handle stat change invoked")
        // loop over the key value pairs on the char obj
        // if the value is a number and if that number is > 0 then we want to change it
        for(let [key, value] of Object.entries(Character.charObj)){
            if(Number.isInteger(value) && value > 0){
                // console.log("key:", key, "value:", value)
                Character.charObj[key]--
            }
        }
        console.log(Character.charObj)
    }
    gameStart() {
        console.log("game start invoked", Game.gameObj.timer)
        // increases the game time
        Game.gameObj.timerInterval = setInterval(function(){
            Game.gameObj.gameTimer()
            render()
        }, 1000)
        // decreases the stats of the character
        Game.gameObj.statInterval = setInterval(function(){
            Game.gameObj.handleStatChange()
            Game.gameObj.gameOver()
        }, 1000)
    }
    gameOver() {
        console.log("game over invoked")
        // === ! LOSE CONDITION ! === //
        // loop over character key value pairs
        // conditionally check if the value is a number && that value is less than 1
        // if both are true then clear intervals and display lose msg
        for(let [key, value] of Object.entries(Character.charObj)) {
            if(Number.isInteger(value) && value === 0) {
                console.log("GAME OVER")
                clearInterval(Game.gameObj.timerInterval)
                clearInterval(Game.gameObj.statInterval)
            }
        }

        // === ! WIN CONDITION ! === //
        // check the value of game timer, if it's 30 or more then you win
        // clear the intervals
        // display win msg
        if(Game.gameObj.timer > 29) {
            console.log("YOU WIN")
            clearInterval(Game.gameObj.timerInterval)
            clearInterval(Game.gameObj.statInterval)
        }
    }
}

const render = function() {
    console.log("render invoked")
    // check if the game should end
    Game.gameObj.gameOver()

    // === ! DOM VARS ! === //
    const playStatEl = document.querySelector("#playLevel")
    const eatStatEl = document.querySelector("#eatLevel")
    const sleepStatEl = document.querySelector("#sleepLevel")

    // set styling on dom vars
    playStatEl.style.width = Character.charObj.playLevel + "rem"
    eatStatEl.style.width = Character.charObj.eatLevel + "rem"
    sleepStatEl.style.width = Character.charObj.sleepLevel + "rem"
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("main.js loaded")

    // === ! CLASS INSTANCES ! === //
    const kitty = new Character()
    Character.charObj = kitty
    // kitty.increaseStatLevel("eatLevel")
    // kitty.increaseStatLevel("sleepLevel")

    const game = new Game()
    Game.gameObj = game
    // game.gameTimer()
    // game.handleStatChange()
    // game.gameStart()

    // === ! DOM VARIABLES ! === //
    const startBtn = document.querySelector("#start")
    const statBtns = document.querySelectorAll(".stat")
    const resetBtn = document.querySelector("#reset")
    // console.log(resetBtn)
    
    // === ! EVENT LISTENER ! === //
    startBtn.addEventListener("click", function(){
        console.log("start btn clicked")
        // invoke the game start method
        Game.gameObj.gameStart()
        // attach event listeners to stat btns
        for (let i = 0; i < statBtns.length; i++) {
            statBtns[i].addEventListener("click", Character.charObj.increaseStatLevel)
        }
        render()
    })
    resetBtn.addEventListener("click", function() {
        console.log("reset btn clicked")
    })
})