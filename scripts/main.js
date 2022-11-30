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
        this.trainingLevel = 0
        console.log("character class", this)
    }
    // === ! METHODS ! === //
    // what are functions that will effect the character? they should be defined here
    changeStatLevel(statToChange) {
        // console.log the parameter to confirm it's working the way you think it is
        // console.log("stat passed:", statToChange)
        // if the stat level is at 10 guard it from increasing any more so the user can't go past 10
        if(this[statToChange] >= 10) return
        // if the stat doesn't get returned up above, then increase it's value
        this[statToChange] += 1
        // return the value so you know it works
        return this[statToChange]
    }
}
const kitty = new Character()
kitty.playLevel = 5
kitty.changeStatLevel("playLevel")

class Game {
    // === ! CONSTRUCTOR ! === //
    constructor() {
        // set the initial values to null so that we can use this intentional lack of value in conditional statements later
        this.timer = null
        this.gameOn = null
        console.log("game class", this)
    }
    // === ! METHODS ! === //
    gameTimer() {
        // if timer is null set it to a Number
        if(this.timer === null) {
            this.timer = 0
        }
        // if timer is not null increase it
        this.timer++
        // console log the time change to confirm it works
        // console.log(this.timer)
    }
}
const game = new Game()
const gameclock = setInterval(function() {game.gameTimer()}, 1000)