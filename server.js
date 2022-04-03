express = require('express');
app = express();
server = require('http').Server(app);
io = require('socket.io')(server);
fs = require('fs');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function(){
  console.log('connected');
});

grassArr = [];
grassEaterArr = [];
gishatichArr = [];
personArr = [];
matrix = []

weath = "winter";
Grass= require("./Grass")
GrassEater = require("./GrassEater")
Gishatich = require("./Gishatich")
Person = require("./Person")

function rand(min, max) {
    return Math.random() * (max - min) + min;
  }


io.sockets.emit("send matrix", matrix)


function generateMatrix(size, grassCount, grassEaterCount, gishatichCount, personCount) {
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
      matrix[y][x] = 1
     }
     else {
        i--
     }
  }
  for (let i = 0; i < grassEaterCount; i++) {
     let x = Math.round(Math.random() * (size - 1))
     let y = Math.round(Math.random() * (size - 1))
     if (matrix[y][x] == 0) {
      matrix[y][x] = 2
     }
     else {
        i--
     }
  }
  for (let i = 0; i < gishatichCount; i++) {
   let x = Math.round(Math.random() * (size - 1))
   let y = Math.round(Math.random() * (size - 1))
   if (matrix[y][x] == 0) {
    matrix[y][x] = 3
   }
   else {
      i--

   }
}
for (let i = 0; i < personCount; i++) {
   let x = Math.round(Math.random() * (size - 1))
   let y = Math.round(Math.random() * (size - 1))
   if (matrix[y][x] == 0) {
    matrix[y][x] = 4
   }
   else {
      i--

   }
}
}
generateMatrix(50, 10, 4, 10, 10)

io.sockets.emit('send matrix', matrix)




function createObject(matrix) {
   for (var y = 0; y < matrix.length; y++) {
       for (var x = 0; x < matrix[y].length; x++) {
           if (matrix[y][x] == 1) {
               var gr = new Grass(x, y, 1);
               grassArr.push(gr)
           }
           else if (matrix[y][x] == 2) {
               var grEater = new GrassEater(x, y, 2);
               grassEaterArr.push(grEater)

           }
           else if(matrix[y][x]== 3){
            var gish = new Gishatich(x, y, 3);
            gishatichArr.push(gish)

           }
           else if(matrix[y][x]== 4){
            var pers = new Person(x, y, 4);
            personArr.push(pers)

           }  
       }
      }
      io.sockets.emit('send matrix', matrix)
   }

   function game() {
      for (var i in grassArr) {
          grassArr[i].mul()
      }
      for (var i in grassEaterArr) {
          grassEaterArr[i].eat();
      }
      for (var i in gishatichArr) {
         gishatichArr[i].eat();
     }
     for (var i in personArr) {
      personArr[i].eat();
  }
      io.sockets.emit("send matrix", matrix);

   }


   setInterval(game, 1000)
   function kill() {
      grassArr = [];
      grassEaterArr = [];
      gishatichArr=[];
      personArr=[];
      for (var y = 0; y < matrix.length; y++) {
          for (var x = 0; x < matrix[y].length; x++) {
              matrix[y][x] = 0;
          }
      }
      io.sockets.emit("send matrix", matrix);
  }
  function addGrass() {
   for (var i = 0; i < 7; i++) {
   var x = Math.floor(Math.random() * matrix[0].length)
   var y = Math.floor(Math.random() * matrix.length)
       if (matrix[y][x] == 0) {
           matrix[y][x] = 1
           var gr = new Grass(x, y, 1)
           grassArr.push(gr)
       }
   }
   io.sockets.emit("send matrix", matrix);
}
function kill() {
    grassArr = [];
    grassEaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
   for (var i = 0; i < 7; i++) {   
   var x = Math.floor(Math.random() * matrix[0].length)
   var y = Math.floor(Math.random() * matrix.length)
       if (matrix[y][x] == 0) {
           matrix[y][x] = 2
           grassEaterArr.push(new GrassEater(x, y, 2))
       }
   }
   io.sockets.emit("send matrix", matrix);
}

function addGishatich() {
   for (var i = 0; i < 7; i++) {   
   var x = Math.floor(Math.random() * matrix[0].length)
   var y = Math.floor(Math.random() * matrix.length)
       if (matrix[y][x] == 0) {
           matrix[y][x] = 3
           gishatichArr.push(new Gishatich(x, y, 3))
       }
   }
   io.sockets.emit("send matrix", matrix);
}

function addPerson() {
   for (var i = 0; i < 7; i++) {   
   var x = Math.floor(Math.random() * matrix[0].length)
   var y = Math.floor(Math.random() * matrix.length)
       if (matrix[y][x] == 0) {
           matrix[y][x] = 4
           personArr.push(new Person(x, y, 4))
       }
   }
   io.sockets.emit("send matrix", matrix);
}

function weather() {
   if (weath == "winter") {
       weath = "spring"
   }
   else if (weath == "spring") {
       weath = "summer"
   }
   else if (weath == "summer") {
       weath = "autumn"
   }
   else if (weath == "autumn") {
       weath = "winter"
   }
   io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);




   io.on('connection', function (socket) {
      createObject(matrix);
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add gishatich", addGishatich);
    socket.on("add person", addPerson);
  });

  var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.gishatich = gishatichArr.length;
    statistics.person = personArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), 
    function(){
        console.log("send")
    })
},1000);