var matrix = []

grassArr = []
grassEaterArr = []
gishatichArr = []
personArr = []

let side = 10
function generateMatrix(size, grassCount, grassEaterCount) {
   for (let y = 0; y < size; y++) {
      matrix[y] = []
      for (let x = 0; x < size; x++) {
         matrix[y].push(0)
      }
   }

   for (let i = 0; i < grassCount; i++) {
      let x = Math.round(Math.random() * (size - 1))
      let y = Math.round(Math.random() * (size - 1))
      if (matrix[y][x] == 0) {
         new Grass(x, y)
      }
      else {
         i--
      }
   }
   for (let i = 0; i < grassEaterCount; i++) {
      let x = Math.round(Math.random() * (size - 1))
      let y = Math.round(Math.random() * (size - 1))
      if (matrix[y][x] == 0) {
         new GrassEater(x, y)
      }
      else {
         i--

      }
   }


}
generateMatrix(50, 10, 4)

let z;
for (let y = 0; y < 50; y++) {
   matrix[y] = []
   for (let x = 0; x < 50; x++) {
      z = Math.round(Math.random() * 0)
      matrix[y].push(z);

   }
}
console.log(matrix)

function setup() {
   createCanvas(matrix.length * side + 1, matrix.length * side + 1)
   background("gray")

   // createCanvas(501, 501);
   // background('white');
   new Grass(1, 0)
   new Grass(6, 7)
   new GrassEater(5, 5)
   new GrassEater(7, 6)
   new Gishatich(7, 8)
   new Gishatich(12, 15)
   new Person(2, 1)
   new Person(3, 2)
   new Person(4, 3)
  
   frameRate(15)

}
function draw() {



   fill('white')
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
         if (matrix[y][x] == 0) {
            fill('white')
         }
         else if (matrix[y][x] == 1) {
            fill('green')
         }
         else if (matrix[y][x] == 2) {
            fill('yellow')
         }
         else if (matrix[y][x] == 3) {
            fill('red')
         }
         else if (matrix[y][x] == 4) {
            fill("black")
         }

         rect(x * 10, y * 10, 10, 10)

      }
   }

   for (let i in grassArr) {
      grassArr[i].mul()
   }
   for (let i in grassEaterArr) {
      grassEaterArr[i].start()
   }
   for (let i in gishatichArr) {
      gishatichArr[i].start()
   }
   for (let i in personArr) {
      personArr[i].start()
   }
}

// function setup(){
//     createCanvas(500,500);
//     background("grey");
//     frameRate(3);
// }
// function draw(){

//     fill("blue");
//     for(let y = 0;y<10;y++){


//            let x=random(100)
//             ellipse(x*50,y*50,10,10)

//     }
// }
