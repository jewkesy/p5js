let cities = [];
const cityCount = 14;
const popSize = 400;
let population = [];
let fitness = [];

let recordDistance = Infinity;
let bestEver;

let statusP; 

function setup() {
  createCanvas(600, 600);
  var order = [];
  for (let i = 0; i < cityCount; i++) {
    let v = createVector(random(width), random(height))
    cities[i] = v;
    order[i] = i;
  }
  
  for (let i = 0; i < popSize; i++) {
    population[i] = shuffle(order).slice();
  }
  
  statusP = createP('').style('font-size', '32');
}

function draw() {
  background(200);
  
  calculateFitness();
  normaliseFitness();
  nextGeneration();
  
  stroke(255, 65, 255);
  for (let i = 0; i < cityCount; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8)
  }
  
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    var n = bestEver[i];
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
  for (let i = 0; i < population.length; i++) {
    let d = calcDistance(cities, population[i])
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i]
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
    var order = pickOne(population, fitness);
    mutate(order, 0.1);
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

function mutate(order, mutationRate) {
  let x = floor(random(order.length));
  let y = floor(random(order.length));
  swap(order, x, y)
}




  