let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {
  mul() {
    this.multiplay++;
    if (this.multiplay >= 1) {
      let emptyCells = this.chooseCell(0);
      if (emptyCells.length > 0) {
        let randIndex = Math.round(Math.random() * (emptyCells.length - 1));

        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];

        matrix[y][x] = 1;
        let gr = new Grass(x, y);
      }

      this.multiplay = 0;
    }
    if (weath == "winter") {
      this.energy -= 2;
      this.multiply -= 2;
    }
    if (weath == "spring") {
      this.energy += 5;
      this.multiply += 5;
    }
    if (weath == "summer") {
      this.energy += 3;
      this.multiply += 3;
    }
    if (weath == "autumn") {
      this.energy--;
      this.multiply--;
    }
  }
}
