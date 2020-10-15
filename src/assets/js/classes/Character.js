import Sprite from "@/classes/Sprite";

export default class Character {

    constructor (keyEvents) {
        this.x = 0;
        this.y = 0;
        this.element = document.querySelector('#perso')

        this.sprite = new Sprite({
            up: -3,
            left: -62,
            down: -119,
            right: -176
        }, 9, 2, -57, this.updateBgPosition.bind(this));
        this.setUpKeyEvents(keyEvents)
    }

    updateBgPosition (x, y) {
        this.element.style.backgroundPosition = `${x}px ${y}px`
    }

    setUpKeyEvents (keyEvents) {
        (['up', 'down', 'left', 'right']).forEach(direction => {
            keyEvents.on(direction, () => {
                this.sprite.setDirection(direction)
                this.sprite.nextFrame()
            })
        })
    }

    moveTo (x, y) {
        this.setCoords(x * 60, y * 60)
    }
    moveBy (x, y) {
        this.setCoords(this.x + x, this.y + y)
    }
    setCoords (x, y) {
        this.element.style.transform = `translate(${x}px, ${y}px)`
        this.x = x
        this.y = y
    }
    getCoords () {
        return {
            x: this.x,
            y: this.y
        }
    }
    getPosition (offsetX = 0, offsetY = 0) {
        return {
            x: Math.floor((this.x + 30 + offsetX) / 60),
            y: Math.floor((this.y + 40 + offsetY) / 60)
        }
    }
}
