class LivingCreature {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiplay = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        matrix[y][x] = 1
        grassArr.push(this)

    }
    chooseCell(n) {
        let found = []

        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {


                if (matrix[y][x] == n) {

                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
}




class Grass extends LivingCreature {

    mul() {
        this.multiplay++
        if (this.multiplay >= 1) {
            let emptyCells = this.chooseCell(0)


            if (emptyCells.length > 0) {
                let randIndex = Math.round(Math.random() * (emptyCells.length - 1))


                let x = emptyCells[randIndex][0]
                let y = emptyCells[randIndex][1]

                matrix[y][x] = 1
                let gr = new Grass(x, y)
            }


            this.multiplay = 0

        }
    }
}

class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 15
        matrix[y][x] = 2
        grassEaterArr.push(this)
    }
    updateDirection() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(n) {
        this.updateDirection()
        return super.chooseCell(n)
    }
    start() {

        if (this.chooseCell(1).length > 0) {
            this.eat()
        }
        else if (this.chooseCell(0).length > 0) {
            this.move()
        }
        if (this.energy >= 20) {
            this.mul()
        }
        if (this.energy <= 0) {
            this.die()
        }
    }
    move() {
        this.energy--
        let foods = this.chooseCell(0)
        if (foods.length > 0) {
            let randIndex = Math.round(Math.random() * (foods.length - 1))
            let x = foods[randIndex][0]
            let y = foods[randIndex][1]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y


        }
    }

    eat() {
        this.energy += 3
        let foods = this.chooseCell(1)
        if (foods.length > 0) {
            let randIndex = Math.round(Math.random() * (foods.length - 1))
            let x = foods[randIndex][0]
            let y = foods[randIndex][1]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                }
            }

        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1);
            }
        }

    }

    mul() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact && this.energy > 20) {
            let x = exact[0];
            let y = exact[1];
            new GrassEater(x, y);
            this.energy = 15;
        }
    }
}


class Gishatich extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 15
        matrix[y][x] = 3
        gishatichArr.push(this)
    }
    updateDirection() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(n) {
        this.updateDirection()
        return super.chooseCell(n)
    }
    start() {

        if (this.chooseCell(2).length > 0) {
            this.eat()
        }
        else if (this.chooseCell(0).length > 0) {
            this.move()

        } else if (this.chooseCell(1).length > 0) {
            this.move()

        }
        if (this.energy >= 20) {
            this.mul()
        }
        if (this.energy <= 0) {
            this.die()
        }
    }
    move() {
        this.energy--
        let foods = this.chooseCell(0)
        let foods1 = this.chooseCell(1)
        if (foods.length > 0) {
            let randIndex = Math.round(Math.random() * (foods.length - 1))
            let x = foods[randIndex][0]
            let y = foods[randIndex][1]
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y


        } else if (foods1.length > 0) {
            let randIndex = Math.round(Math.random() * (foods1.length - 1))
            let x = foods1[randIndex][0]
            let y = foods1[randIndex][1]
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y


        }
    }

    eat() {
        this.energy += 10
        let foods = this.chooseCell(2)
        if (foods.length > 0) {
            let randIndex = Math.round(Math.random() * (foods.length - 1))
            let x = foods[randIndex][0]
            let y = foods[randIndex][1]
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1);
                }
            }

        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (let i = 0; i < gishatichArr.length; i++) {
            if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                gishatichArr.splice(i, 1);
            }
        }

    }

    mul() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact && this.energy > 20) {
            let x = exact[0];
            let y = exact[1];
            new Gishatich(x, y);
            this.energy = 15;
        }
    }
}

class Person extends LivingCreature {
    constructor(x, y) {
    super(x,y)
        this.energy = 19
        this.directions = [];
        matrix[y][x] = 4
        personArr.push(this)
    
    }
    updateDirection() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(n) {
        this.updateDirection()
        return super.chooseCell(n)
    }

    start() {

        if (this.chooseCell(2).length > 0) {
            this.eat()
        }
        else if (this.chooseCell(3).length > 0) {
            this.eat()
        } else if (this.chooseCell(0).length > 0) {
            this.move()
        }
        else if (this.chooseCell(1).length > 0) {
            this.move()
        }
        if (this.energy >= 20) {
            this.mul()
        }
        else if (this.energy <= 0) {
            this.die()
        }
    }
    move() {
        this.energy--
        let foods = this.chooseCell(0)
        let foods1 = this.chooseCell(1)
        if (foods.length > 0) {
            let randIndex = Math.round(Math.random() * (foods.length - 1))
            let x = foods[randIndex][0]
            let y = foods[randIndex][1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y

        }
        else if (foods1.length > 1) {
            let randIndex = Math.round(Math.random() * (foods1.length - 1))
            let x = foods1[randIndex][0]
            let y = foods1[randIndex][1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y


        }
    }

    eat() {
        this.energy += 10
        let foods = this.chooseCell(2)
        let foods1 = this.chooseCell(3)
        if (foods.length > 0) {
            let randIndex = Math.round(Math.random() * (foods.length - 1))
            let x = foods[randIndex][0]
            let y = foods[randIndex][1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1);
                }
            }

        } else if (foods1.length > 0) {
            let randIndex = Math.round(Math.random() * (foods1.length - 1))
            let x = foods1[randIndex][0]
            let y = foods1[randIndex][1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (let i = 0; i < gishatichArr.length; i++) {
                if (gishatichArr[i].x == x && gishatichArr[i].y == y) {
                    gishatichArr.splice(i, 1);
                }

            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (let i = 0; i < personArr.length; i++) {
            if (personArr[i].x == this.x && personArr[i].y == this.y) {
                personArr.splice(i, 1);
            }
        }

    }

    mul() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact && this.energy > 20) {
            let x = exact[0];
            let y = exact[1];
            new Person(x, y);
            this.energy = 19;
        }
    }
}

