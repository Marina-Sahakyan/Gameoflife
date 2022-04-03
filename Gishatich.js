let LivingCreature = require('./LivingCreature')

module.exports = class Gishatich extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 15;
    matrix[y][x] = 3;
    gishatichArr.push(this);
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
    if (this.chooseCell(2).length > 0) {
      this.eat();
    } else if (this.chooseCell(0).length > 0) {
      this.move();
    } else if (this.chooseCell(1).length > 0) {
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
    let foods1 = this.chooseCell(1);
    if (foods.length > 0) {
      let randIndex = Math.round(Math.random() * (foods.length - 1));
      let x = foods[randIndex][0];
      let y = foods[randIndex][1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
    } else if (foods1.length > 0) {
      let randIndex = Math.round(Math.random() * (foods1.length - 1));
      let x = foods1[randIndex][0];
      let y = foods1[randIndex][1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
    }
  }

  eat() {
    this.energy += 10;
    let foods = this.chooseCell(2);
    if (foods.length > 0) {
      let randIndex = Math.round(Math.random() * (foods.length - 1));
      let x = foods[randIndex][0];
      let y = foods[randIndex][1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;

      for (let i = 0; i < grassEaterArr.length; i++) {
        if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
          grassEaterArr.splice(i, 1);
        }
      }
    }
  }

  die() {
    matrix[this.y][this.x] = 0;
    for (let i = 0; i < gishatichArr.length; i++) {
      if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
        gishatichArr.splice(i, 1);
      }
    }
  }

  mul() {
    let found = this.chooseCell(0);
    let exact = found[Math.floor(Math.random() *  found.length)];
    if (exact && this.energy > 20) {
      let x = exact[0];
      let y = exact[1];
      new Gishatich(x, y);
      this.energy = 20;
    }
  }
}
