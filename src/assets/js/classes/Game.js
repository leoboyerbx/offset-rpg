import GameMap from "@/classes/GameMap";
import Character from "@/classes/Character";
import MoveManager from "@/classes/MoveManager";
import KeyboardEvents from "@/classes/KeyboardEvents";

export default class Game {
    constructor() {
        this.keyEvents = new KeyboardEvents()
        this.map = new GameMap()
        this.character = new Character(this.keyEvents)
        this.moveManager = new MoveManager(this.map, this.character)

        window.game = this

        this.setUpKeyEvents()
        this.speed = 10;

        this.moveManager.initArea(0, true)
    }

    setUpKeyEvents () {
        this.keyEvents.on('up', () => {
            this.moveManager.moveBy('up', this.speed)
        })
        this.keyEvents.on('down', () => {
            this.moveManager.moveBy('down', this.speed)
        })
        this.keyEvents.on('left', () => {
            this.moveManager.moveBy('left', this.speed)
        })
        this.keyEvents.on('right', () => {
            this.moveManager.moveBy('right', this.speed)
        })
    }

}
