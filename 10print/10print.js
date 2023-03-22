let x = 0;
let y = 0;
let spacing = 10;
let prob = 0.5;

function setup () {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  stroke(255)
  if (random(1) < prob) {
    line(x, y, x + spacing, y + spacing);
  } else {
    line(x, y + spacing, x + spacing, y)
  }
  
  x += spacing;
  if (x > width) {
    x = 0;
    y += spacing
  }
  if (y > height) {noLoop(); console.log("done")}
}