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
    }
    // === ! METHODS ! === //
    // what are functions that will effect the character? they should be defined here
    changeStatLevel(statToChange) {
        console.log("stat passed:", statToChange)
        // if the stat level is at 10 guard it from increasing any more so the user can't go past 10
        if(this[statToChange] >= 10) return
        // if the stat doesn't get returned up above, then increase it's value
        this[statToChange] += 1
        return this[statToChange]
    }
}
const kitty = new Character()
kitty.playLevel = 5
kitty.changeStatLevel("playLevel")