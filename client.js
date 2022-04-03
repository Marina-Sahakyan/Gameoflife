var socket = io();
side = 10

function setup(){
   createCanvas(40 * side, 20 * side);
   background('#acacac')
}
socket.on("weather", function (data) {
   weath = data;
})

function nkarel(matrix) {
  
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
         var obj = matrix[y][x];
         if (obj == 1){
             if(weath == "summer") {
             fill("green");
         }else if (weath == "autumn") {
             fill("#FFD700");
         }else if (weath == "winter") {
             fill("white");
         }else if (weath == "spring") {
             fill("#4dffa6");
         }
     }else if (obj == 2) {
             fill("yellow");
         }else if (obj == 0){
             fill("grey")
         }else if(obj == 3){
            fill("red")
         }else if(obj == 4){
            fill("black")
         }


         // if (matrix[y][x] == 0) {
         //    fill('white')
         // }
         // else if (matrix[y][x] == 1) {
         //    fill('green')
         // }
         // else if (matrix[y][x] == 2) {
         //    fill('yellow')
         // }
         // else if (matrix[y][x] == 3) {
         //    fill('red')
         // }
         // else if (matrix[y][x] == 4) {
         //    fill("black")
         // }

         rect(x * 10, y * 10, 10, 10)

      }
   }
}
setInterval(
   function () {
      socket.on('send matrix', nkarel)
   }, 1000
)
function kill() {
   socket.emit("kill")
}
function addGrass() {
   socket.emit("add grass")
}
function addGrassEater() {
   socket.emit("add grassEater")
}
function addGishatich(){
   socket.emit("add gishatich")
}
function addPerson(){
   socket.emit("add person")
}