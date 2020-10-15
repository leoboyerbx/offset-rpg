export default class Coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getAsArray () {
        return [this.x, this.y]
    }

    isEqual (otherCoords) {
        return (
            this.x === otherCoords.x
            && this.y === otherCoords.y
        )
    }
}
