import Coords from "@/classes/Coords";

export default class GameMap {
    constructor() {
        this.table = document.querySelector('#resultMap')
        this.areas = [
            {
                elements: [
                    [ 3, 3, 3, 3, 4, 3, 3, 3 ],
                    [ 3, 1, 1, 1, 0, 1, 1, 3 ],
                    [ 3, 1, 1, 0, 0, 0, 1, 3 ],
                    [ 3, 0, 1, 2, 2, 0, 0, 3 ],
                    [ 3, 1, 2, 0, 0, 0, 0, 3 ],
                    [ 3, 1, 1, 1, 0, 1, 1, 3 ],
                    [ 3, 3, 3, 3, 5, 3, 3, 3 ],
                ],
                firstPos: new Coords(4, 1),
                lastPos: new Coords(4, 5)
            },
            {
                elements: [
                    [ 3, 3, 3, 3, 4, 3, 3, 3 ],
                    [ 3, 1, 1, 1, 0, 1, 1, 3 ],
                    [ 3, 1, 1, 1, 0, 0, 1, 3 ],
                    [ 3, 2, 0, 0, 0, 0, 0, 5 ],
                    [ 3, 2, 2, 0, 0, 0, 0, 3 ],
                    [ 3, 1, 1, 1, 2, 1, 1, 3 ],
                    [ 3, 3, 3, 3, 3, 3, 3, 3 ],
                ],
                firstPos: new Coords(4, 1),
                lastPos: new Coords(6, 3)
            },
            {
                elements: [
                    [ 3, 3, 3, 3, 3, 3, 3, 3 ],
                    [ 3, 1, 1, 1, 1, 1, 1, 3 ],
                    [ 3, 1, 1, 1, 1, 1, 1, 3 ],
                    [ 4, 0, 0, 0, 2, 1, 0, 5 ],
                    [ 3, 0, 0, 0, 0, 0, 0, 3 ],
                    [ 3, 1, 1, 1, 2, 1, 1, 3 ],
                    [ 3, 3, 3, 3, 3, 3, 3, 3 ],
                ],
                firstPos: new Coords(1, 3),
                lastPos: new Coords(6, 3)
            },
            {
                elements: [
                    [ 3, 3, 3, 3, 3, 3, 3, 3 ],
                    [ 3, 1, 1, 1, 1, 1, 1, 3 ],
                    [ 3, 1, 0, 0, 0, 0, 1, 3 ],
                    [ 4, 0, 0, 0, 2, 0, 0, 3 ],
                    [ 3, 1, 2, 0, 0, 0, 0, 3 ],
                    [ 3, 1, 1, 1, 0, 1, 1, 3 ],
                    [ 3, 3, 3, 3, 5, 3, 3, 3 ],
                ],
                firstPos: new Coords(1, 3),
                lastPos: new Coords(4, 5)
            }
        ]
        this.currentArea = 0
    }

    renderArea (areaId) {
        const area = this.areas[areaId]
        this.table.innerHTML = ""

        area.elements.forEach(row => {
            const newRow = document.createElement('tr')
            row.forEach(cell => {
                const newCell = document.createElement('td')
                if (cell === 0) {
                    newCell.classList.add('grass')
                }
                if (cell === 1) {
                    newCell.classList.add('water')
                }
                if (cell === 2) {
                    newCell.classList.add('rock')
                }
                if (cell === 4 || cell === 5) {
                    newCell.classList.add('door')
                }
                newRow.append(newCell)
            })
            this.table.append(newRow)
        })

        this.currentArea = areaId
    }

    getNextArea () {
        if (this.currentArea >= this.areas.length - 1) {
            return 0
        } else {return this.currentArea + 1}
    }
    getPrevArea () {
        if (this.currentArea <= 0) return this.areas.length - 1
        else return this.currentArea - 1
    }

    getFirstPos () {
        return this.areas[this.currentArea].firstPos
    }
    getLastPos () {
        return this.areas[this.currentArea].lastPos
    }

    getCell (x, y) {
        return this.areas[this.currentArea].elements[y][x]
    }
}
