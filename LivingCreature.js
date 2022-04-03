module.exports = class LivingCreature {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.multiplay = 0;
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
    matrix[y][x] = 1;
    grassArr.push(this);
  }
  chooseCell(n) {
    let found = [];

    for (let i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
        if (matrix[y][x] == n) {
          found.push(this.directions[i]);
        }
      }
      
    }
    return found;
  }
}
