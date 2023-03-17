let vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  console.log(vals)
  let largestI = -1;
  for(let i = 0; i < vals.length-1; i++) {
    if (vals[i] < vals[i+1]) {
      largestI = i;
    }
  }

  if (largestI == -1) {
    noLoop();
    console.log("done")
  }

  let largestJ = -1;
  for (let j = 0; j < vals.length; j++) {
    if (vals[largestI] < vals[j]) {
      largestJ = j;
    }
  }
  swap(vals, largestI, largestJ);
  
  var endArray = vals.splice(largestI + 1)
  endArray.reverse();
  vals = vals.concat(endArray);
  
  textSize(64);
  var s = '';
  for (let i = 0; i < vals.length; i++) {
    s += vals[i]
  }
  fill(255)
  text(s, 20, height/2)
}

function swap (a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}


