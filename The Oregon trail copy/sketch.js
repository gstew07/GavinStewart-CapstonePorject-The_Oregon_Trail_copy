// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mainBackground, font;
let titleFade = 1, startFade = 0, startFadeTime = 0;
let screenCode = 2, backgroundPos = 0, totalChange, groundChange, position = 0;
let wagon = [], changeWagon = 0;

let cTime = 5;
let cInterval = 0.002;
let deadDeer, deerMovement = 0, deerTime = 0, timer;
let deerImages = [];
let deers = [];
let gameDone = false;
let hunter, bullets = [], deerKilled;


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
  deerLoaded = true;
}

function setup() {
  createCanvas(1900, 1000);
  textFont(font);
  textAlign(CENTER, CENTER);

  angleMode(DEGREES);
}

function draw() {
  background(220);
  if (screenCode === 0) titleScreen();
  if (screenCode === 1) startVillage();
  if (screenCode === 2) huntingGame();

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
    text("PRESS SPACE TO START", width / 2, 3 * height / 4);
    if (keyIsPressed && key === " ") {
      screenCode = 1;
      backgroundPos = -(5 * 2) * width;
      position += backgroundPos;
      totalChange = 0;
      groundChange = 2 * position;

    }

  }
}

function startVillage() {
  rotateBackground1(mountains, inverseMountains, grassGround, 2);



}

function rotateBackground1(image1, image2, image3, rate) { //sets up the scrolling background

  rotateBackground2(image1, image2, image3, position, groundChange, 1);
  if (position <= 0 - rate) {
    position += rate;
    totalChange += rate;
    groundChange += 2 * rate;
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

function drawWagon(x, change) {
  image(wagon[change], x, 6 * height / 7 - 260, 540, 360);
}

function huntingGame() {
  if (gameDone === false) {
    imageMode(CENTER);
    background(17, 150, 28);

    if (deerTime % 60 === 0) {
      timer = (5 - (deerTime / 60));
    }
    if (timer === 0) {
      gameDone = true;
    }

    addDeer();

    hunter = new Hunter(width / 2, height / 2);
    hunter.display();

    for (let b of bullets) {
      b.display();
      b.move();

      b.hit();
    }


    print(deerTime);

    miniGameTimer(":" + timer);

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

