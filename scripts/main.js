class Character {
    // === ! STATIC VARS ! === // 
    static charObj = {}
    // === ! CONSTRUCTOR ! === // 
    constructor() {
        this.name = "pet"
        this.playLevel = 10
        this.eatLevel = 10
        this.sleepLevel = 10
        // console.log(this)
    }
    // === ! METHODS! === // 
    increaseStatLevel(event) {
        // console.log("increase stat invoked")

        const statId = event.target.id + "Level"
        // Guard against stat values going over 10
        if(Character.charObj[statId] < 10) {
            Character.charObj[statId]++
            render()
        }
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
        // console.log(this)
    }
    // === ! METHODS! === // 
    gameTimer() {
        // console.log("timer tick toc")

        // If the timer is null set to 0, if not increment time
        if(this.timer === null) {
            this.timer = 0
        }
        // is this conditional necessary?
        if(this.timerInterval !== null) {
            this.timer++
        }
    }
    handleStatChange() {
        // console.log("handle stat change invoked")

        // Loop over the key value pairs on the static char obj
        // If the value is a number and if that number is > 0, then we want to change it
        for(let [key, value] of Object.entries(Character.charObj)){
            if(Number.isInteger(value) && value > 0){
                Character.charObj[key]--
            }
        }
        // this is the best place to check for game over!
        Game.gameObj.gameOver()
    }
    gameStart() {
        // console.log("game start invoked")

        // Increase the game time
        Game.timerInterval = setInterval(function(){
            Game.gameObj.gameTimer()
        }, 1000)
        // Decrease the character stats
        Game.statInterval = setInterval(function(){
            Game.gameObj.handleStatChange()
            // Render here to avoid misstep between time and stat decrease
            render()
        }, 1000)
    }
    gameOver() {
        // console.log("game over invoked")

        // === ! DOM VARS ! === //
        const statBtns = document.querySelectorAll(".stat")
        const msg = document.querySelector("h1")

        // === ! LOSE CONDITION ! === //
        // Loop over character obj key value pairs
        // Conditionally check if the value is a number and that value is less than 1
        // If both are true then clear intervals and display lose msg
        for(const property in Character.charObj) {
            if(Number.isInteger(Character.charObj[property]) && Character.charObj[property] < 1) {
                clearInterval(Game.timerInterval)
                clearInterval(Game.statInterval)
                // Disable stat btns
                for (let i = 0; i < statBtns.length; i++) {
                    statBtns[i].disabled = true
                }
                msg.innerText = "YOU LOSE - TRY AGAIN"
                break;
            }
        }
        // === ! WIN CONDITION ! === //
        // Check the value of game timer, if it's 30 or more then you win
        // Clear the intervals
        // Display win msg
        if(Game.gameObj.timer > 29) {
            clearInterval(Game.timerInterval)
            clearInterval(Game.statInterval)
            // Disable stat btns
            for (let i = 0; i < statBtns.length; i++) {
                statBtns[i].disabled = true
            }
            msg.innerText = "YOU WIN - DO YOU WANT TO PLAY AGAIN?"
            return
        }
    }
}

const render = function() {
    // console.log("render invoked")

    // === ! DOM VARS ! === //
    const playStatEl = document.querySelector("#playLevel")
    const eatStatEl = document.querySelector("#eatLevel")
    const sleepStatEl = document.querySelector("#sleepLevel")
    const timerEl = document.querySelector("#timer")
    // Set styling on dom vars
    // ternary statement to check if level is greater than 0, if it is set height dynamically, if not set to 1rem to try to stop the columns from smooshing together on game over
    playStatEl.style.height = Character.charObj.playLevel > 0 ? Character.charObj.playLevel + "rem" : "1rem"
    eatStatEl.style.height = Character.charObj.eatLevel > 0 ? Character.charObj.eatLevel + "rem" : "1rem"
    sleepStatEl.style.height = Character.charObj.sleepLevel > 0 ? Character.charObj.sleepLevel + "rem" : "1rem"
    // Set inner text on stats & timer
    playStatEl.innerText = Character.charObj.playLevel
    eatStatEl.innerText = Character.charObj.eatLevel
    sleepStatEl.innerText = Character.charObj.sleepLevel
    // If the gameObj timer is null, render 0, else render value from gameObj
    timerEl.innerText = Game.gameObj.timer === null ? 0 : Game.gameObj.timer
}

const initialize = function() {
    // console.log("initialize invoked")

    // Create character class instance and save to static property
    const kitty = new Character()
    Character.charObj = kitty
    // Create game class instance and save to static property
    const game = new Game()
    Game.gameObj = game
    // === ! DOM VARIABLES ! === //
    const statBtns = document.querySelectorAll(".stat")
    const msg = document.querySelector("h1")
    // Set h1 to starting msg
    msg.innerText = "Begin the game by pressing the Start button"
    // Attach event listeners to stat btns
    for (let i = 0; i < statBtns.length; i++) {
        statBtns[i].addEventListener("click", Character.charObj.increaseStatLevel)
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // console.log("main.js loaded")

    // === ! CREATE CLASS INSTANCES ! === //
    initialize()
    // === ! DOM VARIABLES ! === //
    const startBtn = document.querySelector("#start")
    const statBtns = document.querySelectorAll(".stat")
    const resetBtn = document.querySelector("#reset")
    // === ! EVENT LISTENERS ! === //
    startBtn.addEventListener("click", function(){
        // console.log("start btn clicked")

        // Need to stop start btn from being clicked again bc it doubles up the intervals
        startBtn.disabled = true
        // Invoke the game start method
        Game.gameObj.gameStart()
        render()
    })
    resetBtn.addEventListener("click", function() {
        // console.log("reset btn clicked")

        initialize()
        // Clear intervals
        clearInterval(Game.timerInterval)
        clearInterval(Game.statInterval)
        // setting to null unnecessary ??
        // Game.timerInterval = null
        // Game.statInterval = null
        // Enable start and stat btns
        startBtn.disabled = false
        for (let i = 0; i < statBtns.length; i++) {
            statBtns[i].disabled = false
        }
        render()
    })
})