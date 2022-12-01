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
    increaseStatLevel(statToChange) {
        console.log("increase stat invoked")
        Character.charObj[statToChange]++
        // console.log("after change",Character.charObj[statToChange])
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
    }
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
    game.gameTimer()
    // game.handleStatChange()
    game.gameStart()
})