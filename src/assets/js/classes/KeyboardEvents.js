import EventStack from "@/classes/EventStack";

export default class KeyboardEvents {
    constructor() {
        this.eventStack = new EventStack()
        this.addEventListeners()
    }

    on(trigger, callback) {
        this.eventStack.register(trigger, callback)
    }

    addEventListeners () {
        document.addEventListener('keydown', e => {
            if (e.key.startsWith('Arrow')) {
                const eventName = e.key.replace('Arrow', '').toLowerCase()
                this.eventStack.call(eventName, [e])
            }
        })
    }
}
