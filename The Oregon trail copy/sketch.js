// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mainBackground, font;
let titleFade = 1, startFade = 0, startFadeTime = 0;
let screenCode = 2.1, backgroundPos = 0, totalChange, groundChange, position = 0;
let wagon = [], changeWagon = 0;
let doneMoving = false;

let cTime = 5;
let cInterval = 0.002;
let deadDeer, deerMovement = 0, deerTime = 0, timer;
let deerImages = [];
let deers = [];
let gameDone = false;
let hunter, bullet, huntingBackground, bullets = [], deerKilled, deersKilled, meatCollected, bulletsLeft;


function preload() {
  mainBackground = loadImage("assets/mainBackground.jpg");
  mountains = loadImage("assets/mountains.jpg");
  inverseMountains = loadImage("assets/mountains2.jpg");
  grassGround = loadImage("assets/grassGround.png");
  font = loadFont("assets/pixelFont.ttf");
  for (let i = 1; i < 6; i++) {
    wagon.push(loadImage("assets/Wagon" + i + ".png"));
  }

  deadDeer = loadImage("assets/deadDeer.png");
  for (let i = 1; i < 6; i++) {
    deerImages.push(loadImage("assets/nDeerDown" + i + ".png"));

  }

  for (let i = 1; i < 6; i++) {
    deerImages.push(loadImage("assets/nDeerUp" + i + ".png"));
  }
  bullet = loadImage("assets/bullet.png");
  huntingBackground = loadImage("assets/hunting background.png");
}

function setup() {
  createCanvas(1900, 1000);
  textFont(font);
  textAlign(CENTER, CENTER);

  angleMode(DEGREES);
  stroke(0); strokeWeight(5);
}

function draw() {
  background(220);
  if (int(screenCode) === 0) titleScreen();
  if (int(screenCode) === 1) mountainBiome();
  if (int(screenCode) === 2) huntingGame();

}

function titleScreen() {
  background(mainBackground);
  titleFade += 3.5;

  textSize(70);
  textStyle(BOLD);
  fill(0, 0, 0, titleFade);
  text("The Oregon Trail", width / 2, height / 8 + 7);

  fill(24, 192, 47, titleFade);
  text("The Oregon Trail", width / 2, height / 8);
  if (titleFade > 300) {
    if (startFadeTime === 0 && startFade < 1) {
      startFade += 0.02;
    }
    else if (startFadeTime === 0) {
      startFadeTime = 1;
    }
    if (startFadeTime === 1 && startFade > 0) {
      startFade -= 0.02;
    }
    else if (startFadeTime === 1) {
      startFadeTime = 0;
    }

    let fade = map(startFade, 0, 1, 0, 255);

    textSize(60);
    fill(255, 255, 255, fade);
    noStroke();
    text("PRESS SPACE TO START", width / 2, 3 * height / 4);
    stroke(0);
    if (keyIsPressed && key === " ") {
      setBackgroundVariables(1, 1);

    }

  }
}

function mountainBiome() {
  rotateBackground1(mountains, inverseMountains, grassGround, 20);
  if (doneMoving) {
    huntQuestion();
  }

}

function rotateBackground1(image1, image2, image3, rate) { //sets up the scrolling background

  rotateBackground2(image1, image2, image3, position, groundChange, 1);
  if (position <= 0 - rate) {
    position += rate;
    totalChange += rate;
    groundChange += 2 * rate; // changes the ground at twice the rate
    print(groundChange);
  }

  drawWagon(3 * width / 5, changeWagon);

  if (position <= 0 - rate) {
    if (frameCount % int(8 / (rate / 2)) === 0) {
      changeWagon += 1;
      if (changeWagon > 4) {
        changeWagon = 0;
      }
    }
  }
  else {
    changeWagon = 0;
    doneMoving = true;
  }
}

function rotateBackground2(image1, image2, image3, xPosition, ground, direction) {// uses two images and reccurssion to scroll the background
  if (ground <= 2 * totalChange) {
    if (xPosition <= totalChange) {
      if (direction === 1) {
        image(image1, xPosition, 0, width, height);

      }
      else if (direction === -1) {
        image(image2, xPosition, 0, width, height);

      }
    }



    for (let i = 0; i < 2; i++) {
      image(image3, ground + i * width / 2, 6 * height / 7, width / 2, height / 7);
    }


    rotateBackground2(image1, image2, image3, xPosition + width, ground + width, direction * -1);



  }
}

function setBackgroundVariables(code, length) { //code is the num associated with the location and mode
  screenCode = code;
  backgroundPos = -(length * 2) * width; // the length of the total scrolling background lengths (constant)
  position += backgroundPos; //the value that changes so I can move the background along
  totalChange = 0; // the total change of the background
  groundChange = 2 * position; // the variable set for the ground so it is double the length

  doneMoving = false;
}

function drawWagon(x, change) {
  image(wagon[change], x, 6 * height / 7 - 260, 540, 360);
}

function huntingGame() {
  if (screenCode === 2.1) {
    preHunting();
  }
  else if (screenCode === 2.2) {
    if (gameDone === false) {
      
      background(huntingBackground);
      imageMode(CENTER);

      if (deerTime % 60 === 0) {
        timer = 30 - (deerTime / 60);
      }
      if (timer === 0) {
        gameDone = true;
      }

      addDeer();

      hunter.move();
      hunter.display();

      for (let b of bullets) {
        b.display();
        b.move();

        b.hit();
      }


      // print(deerTime);

      miniGameTimer(":" + timer);
      miniGameVariables();
      imageMode(CORNER);
    }
    if (gameDone) {
      background(huntingBackground);
      for (let d of deers) {
        d.display();
      }
      hunter.gameOver();
      background(0, 0, 0, 100);

      textSize(70);
      fill(0);
      text("GAME OVER", width / 2, height / 6 + 7);

      fill(255);
      text("GAME OVER", width / 2, height / 6);

      textSize(40);
      fill(0);
      text("DEER KILLED: " + deersKilled, width / 2, 2 * height / 6 + 7);

      fill(255);
      text("DEER KILLED: " + deersKilled, width / 2, 2 * height / 6);

      meatCollected = deersKilled*10;

      textSize(40);
      fill(0);
      text("MEAT COLLECTED: " + meatCollected, width / 2, 2 * height / 6 + 77);

      fill(255);
      text("MEAT COLLECTED: " + meatCollected, width / 2, 2 * height / 6 + 70);


    }
  }

}

function preHunting() {
  background(huntingBackground);

  hunter = new Hunter(width / 2, height / 2);
  hunter.gameOver();

  background(0, 0, 0, 100);

  textSize(70);
  fill(0);
  text("DEER HUNTING", width / 2, height / 6 + 7);

  fill(255);
  text("DEER HUNTING", width / 2, height / 6);

  textSize(40);
  fill(0);
  text("GOAL: KILL AS MANY DEER AS POSSIBLE IN 30 SECONDS", width / 2, 2 * height / 6 + 7);

  fill(255);
  text("GOAL: KILL AS MANY DEER AS POSSIBLE IN 30 SECONDS", width / 2, 2 * height / 6);

  textSize(40);
  fill(0);
  text("CONTROLS: ", width / 2, 2 * height / 6 + 77);

  fill(255);
  text("CONTROLS: ", width / 2, 2 * height / 6 + 70);

  let controls = ["W: UP", "S: DOWN", "A: LEFT", "D: RIGHT", "LEFT CLICK: SHOT"];

  for (let i = 1; i <= controls.length; i++) {
    textSize(30);
    text(controls[i - 1], width / 2, 2 * height / 6 + 90 + i * 45);
  }


  if (startFadeTime === 0 && startFade < 1) {
    startFade += 0.02;
  }
  else if (startFadeTime === 0) {
    startFadeTime = 1;
  }
  if (startFadeTime === 1 && startFade > 0) {
    startFade -= 0.02;
  }
  else if (startFadeTime === 1) {
    startFadeTime = 0;
  }
  let fade = map(startFade, 0, 1, 0, 255);

  textSize(60);
  fill(255, 255, 255, fade);
  noStroke();
  text("PRESS SPACE TO START", width / 2, 3 * height / 4);
  stroke(0);
  if (keyIsPressed && key === " ") {
    screenCode = 2.2;
    deersKilled = 0;
    bulletsLeft = 20;
  }

}

function addDeer() {

  if (deerTime % (5 * 60) === 0) {
    let numOfDeers = int(random(1, 4));
    for (let i = 0; i < numOfDeers; i++) {
      deers.push(new Deer(random(10, width - 10), random(10, height - 10), int(random(2, 5)), deerMovement));
    }
  }

  for (let i = 0; i < deers.length; i++) {
    let d = deers[i];
    if (d.direction > 0) {
      d.move();
      d.directionSet();
    }
    if(d.x > width || d.x < 0 || d.y > height || d.y < 0){
      deers.splice(i, 1);
    }

    d.display();
    // print(d);

    if (d.deadTimer > 0) {
      d.deadTimer += 1;
      if (d.deadTimer === 180) {
        deers.splice(i, 1);
      }
    }


  }

  deerTime += 1;
}
function deerDead(x, y) {
  image(deadDeer, x, y);
}

function mouseClicked() {
  hunter.action();
}

function miniGameTimer(time) {
  textSize(40);
  fill(0);
  text(time, width - 30, 37);

  fill(255);
  text(time, width - 30, 30);

}

function miniGameVariables() {
  push();
  translate(30, 50);
  rotate(-45);
  image(deadDeer, 0, 0, 100, 75);
  pop();

  textAlign(LEFT, CENTER);
  textSize(40);
  fill(0);
  text(": "+ deersKilled , 70, 57);

  fill(255);
  text(": "+ deersKilled, 70, 50);

  strokeWeight(7);
  image(bullet, 170, 55, 40, 40);
  strokeWeight(5);

  
  textSize(40);
  fill(0);
  text(": "+ bulletsLeft , 190, 57);

  fill(255);
  text(": "+ bulletsLeft, 190, 50);

  textAlign(CENTER, CENTER);

}

function huntQuestion() {
  background(0, 0, 0, 100);
  textSize(70);
  fill(0);
  text("WANT TO HUNT?", width / 2, height / 6 + 7);

  fill(255);
  text("WANT TO HUNT?", width / 2, height / 6);

  textSize(40);
  fill(0);
  text("YOU WILL LOSE ONE DAY.", width / 2, height / 4 + 7);

  fill(255);
  text("YOU WILL LOSE ONE DAY.", width / 2, height / 4);
  let y1, y2, f1, f2;
  if (mouseY < height / 2 + 69.5 && mouseY > height / 2 - 62.5) {
    if (mouseX > 2 * width / 5 - (width / 6 - 30) / 2 && mouseX < 2 * width / 5 + (width / 6 - 30) / 2) {
      y1 = height / 2 + 7; f1 = 100;
      y2 = height / 2; f2 = 255;

    }
    else if (mouseX > 3 * width / 5 - (width / 6 - 30) / 2 && mouseX < 3 * width / 5 + (width / 6 - 30) / 2) {
      y1 = height / 2; f1 = 255;
      y2 = height / 2 + 7; f2 = 100;
    }
    else {
      y1 = height / 2; f1 = 255;
      y2 = height / 2; f2 = 255;
    }
  }
  else {
    y1 = height / 2; f1 = 255;
    y2 = height / 2; f2 = 255;
  }

  rectMode(CENTER);
  textSize(70);
  fill(0);
  rect(2 * width / 5, height / 2 + 7, width / 6 - 30, 125, 10, 10, 10, 10);
  fill(255, 255, 255, f1);
  rect(2 * width / 5, y1, width / 6 - 30, 125, 10, 10, 10, 10);

  fill(255);
  stroke(0); strokeWeight(7);
  text("NO", 2 * width / 5, y1);

  fill(0);
  rect(3 * width / 5, height / 2 + 7, width / 6 - 30, 125, 10, 10, 10, 10);
  fill(255, 255, 255, f2);
  rect(3 * width / 5, y2, width / 6 - 30, 125, 10, 10, 10, 10);

  fill(255);
  stroke(0); strokeWeight(7);
  text("YES", 3 * width / 5, y2);

  if (mouseIsPressed && f2 === 100) {
    screenCode = 2.1;
    
  }


}

