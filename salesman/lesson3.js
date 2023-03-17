let cities = [];
const cityCount = 10;

let order = [];

let recordDistance;
let bestEver;

let totalPermutations;
let count = 1;

function setup() {
  createCanvas(500, 600);
  for (let i = 0; i < cityCount; i++) {
    let v = createVector(random(width), random(height/2))
    cities[i] = v;
    order[i] = i;
  }
  
  var d = calcDistance(cities, order);
  recordDistance = d;
  bestEver = order.slice();
  
  totalPermutations = factorial(cityCount)
  console.log(totalPermutations)
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
  for (let i = 0; i < order.length; i++) {
    var n = order[i];
    vertex(cities[n].x, cities[n].y)
  }
  endShape();
  
  stroke(80, 0, 80);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < order.length; i++) {
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y)
  }
  endShape();
  
  var d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice()
  }
  
  let percent = 100 * (count / totalPermutations)
  
  textSize(16);
  var s = '';
  for (let i = 0; i < order.length; i++) {
    s += order[i]
  }
  fill(255)
  s += " " + nf(percent, 0, 2) + "%"
  
  text(s, 20, height - 50)
  

  
  nextOrder();
}


function nextOrder() {
  count++;
  let largestI = -1;
  for(let i = 0; i < order.length-1; i++) {
    if (order[i] < order[i+1]) {
      largestI = i;
    }
  }

  if (largestI == -1) {
    noLoop();
    console.log("done")
  }

  let largestJ = -1;
  for (let j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }
  swap(order, largestI, largestJ);
  
  var endArray = order.splice(largestI + 1)
  endArray.reverse();
  order = order.concat(endArray);
}


function swap (a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  let sum = 0;
  for (let i = 0; i < order.length-1; i++) {
    var cityA = points[order[i]];
    var cityB = points[order[i+1]];
    
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    
    sum += d;
  }
  
  return sum;
}

function factorial(n) {
  if (n==1) return 1;
  return n * factorial(n-1);
}
  