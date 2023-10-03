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
        // guard against values going over 10
        if(Character.charObj[statId] < 10) {
            Character.charObj[statId]++
            render()
        }
        // console.log("after change",Character.charObj)
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
        console.log("timer tick toc")
        // is the timer null ? if it is set to 0, if not increment time
        if(this.timer === null) {
            this.timer = 0
        }
        if(this.timerInterval !== null) {
            this.timer++

        }
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
        // console.log(Character.charObj)
    }
    gameStart() {
        console.log("game start invoked")
        // increases the game time
        Game.gameObj.timerInterval = setInterval(function(){
            Game.gameObj.gameTimer()
            // NEED TO RENDER HERE
            render()
        }, 1000)
        // decreases the stats of the character
        Game.gameObj.statInterval = setInterval(function(){
            Game.gameObj.handleStatChange()
            // render here to avoid misstep between time and stat decrease
            render()
            // is the game over invocation here borking it up?
            // Game.gameObj.gameOver()
        }, 1000)
    }
    gameOver() {
        console.log("game over invoked")
        // === ! LOSE CONDITION ! === //
        // could i rewrite lose condition using Object.values since I never use the key above^
        for(const property in Character.charObj) {
            if(Number.isInteger(Character.charObj[property]) && Character.charObj[property] < 1) {
                // console.log("property:", property, "value", Character.charObj[property])
                console.log("should be game over")
                clearInterval(Game.gameObj.timerInterval)
                Game.gameObj.timerInterval = null
                console.log("timer:", Game.gameObj.timerInterval)
                clearInterval(Game.gameObj.statInterval)
                Game.gameObj.statInterval = null
                console.log("stat:", Game.gameObj.statInterval)
                // console.log("GAME OBJ", Game.gameObj)
                const msg = document.querySelector("h1")
                msg.innerText = "YOU LOSE - TRY AGAIN"
                break;
            }
        }
        // loop over character key value pairs
        // conditionally check if the value is a number && that value is less than 1
        // if both are true then clear intervals and display lose msg
        // for(let [key, value] of Object.entries(Character.charObj)) {
        //     if(Number.isInteger(value) && value === 0) {
        //         console.log("GAME OVER")
        //         clearInterval(Game.gameObj.timerInterval)
        //         clearInterval(Game.gameObj.statInterval)
        //         // console.log("GAME OBJ", Game.gameObj)
        //         const msg = document.querySelector("h1")
        //         msg.innerText = "YOU LOSE - TRY AGAIN"
        //         return
        //     }
        // }

        // === ! WIN CONDITION ! === //
        // check the value of game timer, if it's 30 or more then you win
        // clear the intervals
        // display win msg
        if(Game.gameObj.timer > 29) {
            console.log("YOU WIN")
            clearInterval(Game.gameObj.timerInterval)
            clearInterval(Game.gameObj.statInterval)
            const msg = document.querySelector("h1")
            msg.innerText = "YOU WIN - DO YOU WANT TO PLAY AGAIN?"
            return
        }
    }
}

const render = function() {
    console.log("render invoked")
    // check if the game should end
    // Game.gameObj.gameOver()

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

const initialize = function() {
    console.log("initialize invoked")
    // create character class and save to static property
    const kitty = new Character()
    Character.charObj = kitty
    // create game class and save to static property
    const game = new Game()
    Game.gameObj = game
    // === ! DOM VARIABLES ! === //
    const statBtns = document.querySelectorAll(".stat")
    const msg = document.querySelector("h1")
    // set h1 to starting msg
    msg.innerText = "Begin the game by pressing the Start button"
    // attach event listeners to stat btns
    for (let i = 0; i < statBtns.length; i++) {
        statBtns[i].addEventListener("click", Character.charObj.increaseStatLevel)
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("main.js loaded")
    
    // === ! CREATE CLASS INSTANCES ! === //
    initialize()

    // === ! DOM VARIABLES ! === //
    const startBtn = document.querySelector("#start")
    const resetBtn = document.querySelector("#reset")
    
    // === ! EVENT LISTENERS ! === //
    startBtn.addEventListener("click", function(){
        console.log("start btn clicked")
        // need to stop start btn from being clicked again bc it doubles up the intervals
        startBtn.disabled = true
        // invoke the game start method
        Game.gameObj.gameStart()
        render()
    })
    resetBtn.addEventListener("click", function() {
        console.log("reset btn clicked")
        startBtn.disabled = false
        initialize()
        // console.log("in reset ->", Game.gameObj, Game.timerInterval, Game.statInterval)
        render()
    })
})