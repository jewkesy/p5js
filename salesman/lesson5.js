let cities = [];
const cityCount = 12;
const popSize = 500;
let population = [];
let fitness = [];

let recordDistance = Infinity;
let bestEver;
let currentBest;

let statusP; 

function setup() {
  createCanvas(800, 800);
  var order = [];
  for (let i = 0; i < cityCount; i++) {
    let v = createVector(random(width), random(height/2))
    cities[i] = v;
    order[i] = i;
  }
  
  for (let i = 0; i < popSize; i++) {
    population[i] = shuffle(order).slice();
  }
  
  statusP = createP('').style('font-size', '32');
}

function draw() {
  background(0);
  
  calculateFitness();
  normaliseFitness();
  nextGeneration();
  
  stroke(255, 65, 255);
  for (let i = 0; i < cityCount; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8)
  }
  
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y)
    ellipse(cities[n].x, cities[n].y, 16, 16)
  }
  endShape();
  
  translate(0, height/2);
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < currentBest.length; i++) {
    var n = currentBest[i];
    vertex(cities[n].x, cities[n].y)
    ellipse(cities[n].x, cities[n].y, 16, 16)
  }
  endShape();

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



//// GA

function calculateFitness() {
  let currentRecord = Infinity;
  for (let i = 0; i < population.length; i++) {
    let d = calcDistance(cities, population[i])
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i]
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i]
    }
    fitness[i] = 1 / (d+1);
  }
}

function normaliseFitness() {
  let sum = 0;
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (let i = 0; i < fitness.length; i++) {
     fitness[i] = fitness[i] / sum;
  }
}

function nextGeneration() {
  let newPopulation = [];
  for (let i = 0; i < population.length; i++) {
    var orderA = pickOne(population, fitness);
    var orderB = pickOne(population, fitness);
    var order = crossOver(orderA, orderB);
    mutate(order, 0.01);
    newPopulation[i] = order
  }
  population = newPopulation;
}

function pickOne(list, prob) {
  let index = 0;
  let r = random(1);
  
  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function crossOver(orderA, orderB) {
  let start = floor(random(orderA.length));
  let end = floor(random(start + 1, orderA.length));
  let newOrder = orderA.slice(start, end);
  
  //let left = citycount - newOrder.length;
  for (let i = 0; i < orderB.length; i++) {
    let city = orderB[i];
    if (!newOrder.includes(city)) {
      newOrder.push(city);
    }
  }
  return newOrder;
}

function mutate(order, mutationRate) {
  for (let i = 0; i < cityCount; i++) {
    if (random(1) < mutationRate) {
      let x = floor(random(order.length));
      //let y = floor(random(order.length));
      let y = (x + 1) % cityCount;
      swap(order, x, y)
    }
  }
}
