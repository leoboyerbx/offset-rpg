import Game from './classes/Game.js'

Number.prototype.increaseAbsVal = function (val) {
    if (this < 0) {
        return this - val
    } else if (this > 0) {
        return this + val
    } else {
        return this
    }
}

const game = new Game();
