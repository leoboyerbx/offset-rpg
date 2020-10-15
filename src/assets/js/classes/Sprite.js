export default class Sprite {
    constructor (directions, framesNum, initialXOffset, offsetXPerFrame, setNewPos) {
        this.initialXOffset = initialXOffset;
        this.offsetXPerFrame = offsetXPerFrame;
        this.framesNum = framesNum;
        this.directions = directions;
        this.setNewPos = setNewPos

        this._currentDirectionIndex = Object.keys(this.directions)[0]
        this._currentFrame = 0
    }

    get currentDirection () {
        return this.directions[this._currentDirectionIndex]
    }

    setDirection(value) {
        this._currentDirectionIndex = value;
    }

    nextFrame () {
        if (this._currentFrame >= this.framesNum - 1) {
            this._currentFrame = 0
        } else {
            this._currentFrame++
        }
        const x = this.initialXOffset + (this.offsetXPerFrame * this._currentFrame)
        const y = this.currentDirection

        this.setNewPos(x, y)
    }
}
