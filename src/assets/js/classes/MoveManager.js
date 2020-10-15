import Coords from "@/classes/Coords";

export default class MoveManager {
    constructor(map, character) {
        this.map = map
        this.character = character

        this.hitboxRadius = 15;
        this.hitBoxCenter = {
            x: 30,
            y: 40
        }
    }

    initArea (area, inByExit) {
        this.map.renderArea(area)
        const initialPos = inByExit ? this.map.getFirstPos().getAsArray() : this.map.getLastPos().getAsArray()
        this.character.moveTo(...initialPos)
    }

    moveBy (direction, speed) {
        const currentCoords = this.character.getCoords()
        const targetCoords1 = { ...currentCoords }
        const targetCoords2 = { ...currentCoords }


        if (['up', 'down'].includes(direction)) {
            this.applyNextCoords(targetCoords1, targetCoords2, 'x', 'y', direction === 'up', speed)
        } else {
            this.applyNextCoords(targetCoords1, targetCoords2, 'y', 'x', direction === 'left', speed)
        }

        const nextPosition = this.checkTarget(targetCoords1, targetCoords2)
        if (nextPosition === 0) {
            this.moveCharacterDirection(direction, speed)
        } else if (nextPosition === 4) {
            this.initArea(this.map.getPrevArea(), false)
        } else if (nextPosition === 5) {
            this.initArea(this.map.getNextArea(), true)
        }
    }

    applyNextCoords (targetCoords1, targetCoords2, first, second, testDirection, speed) {
        targetCoords1[first] -= this.hitboxRadius
        targetCoords2[first] += this.hitboxRadius

        const xOffset = testDirection ? -speed : speed
        targetCoords1[second] += xOffset
        targetCoords2[second] += xOffset
    }


    handleCharacterPosition (movingCoords) {
        const nextCharacterPosition = this.moveBy(
            movingCoords[0].increaseAbsVal(10),
            movingCoords[1].increaseAbsVal(10)
        )
        this.checkTarget(nextCharacterPosition.x, nextCharacterPosition.y, () => {
            this.character.moveBy(...movingCoords)
        })
    }


    checkTarget (coords1, coords2, move) {

        const cell1Coords = new Coords(
            Math.floor((coords1.x + this.hitBoxCenter.x) / 60),
            Math.floor((coords1.y + this.hitBoxCenter.y) / 60)
        )
        const cell1 = this.map.getCell(...cell1Coords.getAsArray())
        const cell2Coords = new Coords(
            Math.floor((coords2.x + this.hitBoxCenter.x) / 60),
            Math.floor((coords2.y + this.hitBoxCenter.y) / 60)
        )
        const cell2 = this.map.getCell(...cell1Coords.getAsArray())

        const characterPosition = this.getCharacterPosition()
        if (
            characterPosition.isEqual(cell1Coords)
        ||  characterPosition.isEqual(cell2Coords)
        ) {
            return this.map.getCell(...characterPosition.getAsArray())
        }

        return Math.max(cell1, cell2)
    }

    moveCharacterDirection (direction, speed) {
        switch (direction) {
            case 'up':
                this.character.moveBy(0, -speed)
                break
            case 'down':
                this.character.moveBy(0, speed)
                break
            case 'left':
                this.character.moveBy(-speed, 0)
                break
            case 'right':
                this.character.moveBy(speed, 0)
                break
        }
    }

    getCharacterPosition () {
        const coords = this.character.getCoords()
        return new Coords(
            Math.floor((coords.x + this.hitBoxCenter.x) / 60),
            Math.floor((coords.y + this.hitBoxCenter.y) / 60)
        )
    }
}
