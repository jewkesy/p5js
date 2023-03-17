let cities = [];
const cityCount = 8;

let recordDistance;
let bestEver;

function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < cityCount; i++) {
    let v = createVector(random(width), random(height))
    cities[i] = v;
  }
  
  var d = calcDistance(cities);
  recordDistance = d;
  bestEver = cities.slice();
}

function draw() {
  background(200);
  fill(255)
  stroke(255, 65, 255);
  for (let i = 0; i < cityCount; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8)
  }
  
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < cityCount; i++) {
    vertex(cities[i].x, cities[i].y)
  }
  endShape();
  
  stroke(80, 0, 80);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < cityCount; i++) {
    vertex(bestEver[i].x, bestEver[i].y)
  }
  endShape();
  
  let x = floor(random(cities.length))
  let y = floor(random(cities.length))

  swap(cities, x, y)
  
  var d = calcDistance(cities);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = cities.slice()
  }
}

function swap (a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points) {
  let sum = 0;
  for (let i = 0; i < points.length-1; i++) {
    var d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    sum += d;
  }
  
  return sum;
}
