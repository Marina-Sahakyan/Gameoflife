let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 20;
    matrix[y][x] = 2;
    grassEaterArr.push(this);
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
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(n) {
    this.updateDirection();
    return super.chooseCell(n);
  }
  start() {
    if (this.chooseCell(1).length > 0) {
      this.eat();
    } else if (this.chooseCell(0).length > 0) {
      this.move();
    }
    if (this.energy >= 20) {
      this.mul();
    }
    if (this.energy <= 0) {
      this.die();
    }
  }
  move() {
    this.energy--;
    let foods = this.chooseCell(0);
    if (foods.length > 0) {
      let randIndex = Math.round(Math.random() * (foods.length - 1));
      let x = foods[randIndex][0];
      let y = foods[randIndex][1];
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
    }
 
  }

  eat() {
    this.energy += 3;
    let foods = this.chooseCell(1);
    if (foods.length > 0) {
      let randIndex = Math.round(Math.random() * (foods.length - 1));
      let x = foods[randIndex][0];
      let y = foods[randIndex][1];
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;

      for (let i = 0; i < grassArr.length; i++) {
        if (grassArr[i].x == x && grassArr[i].y == y) {
          grassArr.splice(i, 1);
        }    
      }
    }
  }

  die() {
    matrix[this.y][this.x] = 0;
    for (let i = 0; i < grassEaterArr.length; i++) {
      if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
        grassEaterArr.splice(i, 1);
      }
    }
  }

  mul() {
    let found = this.chooseCell(0);
    let exact = found[Math.floor(Math.random() *  found.length)]
    if (exact && this.energy > 20) {
      let x = exact[0];
      let y = exact[1];
      new GrassEater(x, y);
      this.energy = 20;
    }
    if (weath == "winter") {
			this.energy -= 4;
			this.multiply -= 4;
		}
		if (weath == "summer") {
			this.energy += 2;
			this.multiply += 2;
		}
  }
}
