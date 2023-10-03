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
        // guard against values going over 10
        if(Character.charObj[statId] < 10) {
            Character.charObj[statId]++
            render()
        }
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
            // NEED TO RENDER HERE
            render()
        }, 1000)
        // decreases the stats of the character
        Game.gameObj.statInterval = setInterval(function(){
            Game.gameObj.handleStatChange()
            // will rendering here solve the game over problem of showing stat of 1 when it's 0?
            render()
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
                console.log("GAME OBJ", Game.gameObj)
                const msg = document.querySelector("h1")
                msg.innerText = "YOU LOSE TRY AGAIN"
                return
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
            const msg = document.querySelector("h1")
            // console.log(msg)
            msg.innerText = "YOU WIN DO YOU WANT TO PLAY AGAIN"
            return
        }
    }
}

const render = function() {
    console.log("render invoked")

    // === ! DOM VARS ! === //
    const playStatEl = document.querySelector("#playLevel")
    const eatStatEl = document.querySelector("#eatLevel")
    const sleepStatEl = document.querySelector("#sleepLevel")
    const timerEl = document.querySelector("#timer")

    // set styling on dom vars
    playStatEl.style.height = Character.charObj.playLevel + "rem"
    eatStatEl.style.height = Character.charObj.eatLevel + "rem"
    sleepStatEl.style.height = Character.charObj.sleepLevel + "rem"

    // set inner text on stats & timer
    playStatEl.innerText = Character.charObj.playLevel
    eatStatEl.innerText = Character.charObj.eatLevel
    sleepStatEl.innerText = Character.charObj.sleepLevel
    // if the gameObj timer is null, render 0, else render value from gameObj
    timerEl.innerText = Game.gameObj.timer === null ? 0 : Game.gameObj.timer

    // check if the game should end
    Game.gameObj.gameOver()
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
        // need to stop start btn from being clicked again bc it doubles up the intervals
        startBtn.disabled = true
        console.log("NEEDS TO DISABLE", startBtn)
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
        // enable start btn again
        // set game intervals to null explicitly so they stop running
        // create new isntances of game
        const doggo = new Character()
        Character.charObj = doggo
        const game2 = new Game()
        Game.gameObj = game2
        console.log("NEW GAME:", Game.gameObj)
        // change h1 to original msg
        const msg = document.querySelector("h1")
        msg.innerText = "Begin the game by pressing the Start button"

        render()
    })
})