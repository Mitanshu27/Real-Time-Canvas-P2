var database;
var drawing = []
var button;
function setup() {
    createCanvas(400, 400);
    database = firebase.database()
    background(51);
    button= createButton('Clear Canvas');
}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('cooredinates');
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    stroke(255);
    strokeWeight(4);
    noFill();
    button.position(310,510);
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }
    button.mousePressed(()=>{
        clearDrawing();        
      })
}

function readData() {
    database.ref('cooredinates/').on('value', (data) => {
        db_drawing = data.val().d
    })
}
function clearDrawing()
{
    drawing=[];
    db_drawing=[];
    background(51);
  var ref = database.ref('cooredinates/d');
  ref.remove();
}