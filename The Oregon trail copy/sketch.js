// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mainBackground, font;
let riverOpening, sunsetMountain, yellowstone, mountainMeadow;
let fortWW, store, story, screenTime;
let mapImage, deerSilhouette, mountainSilhouette;
let titleFade = 1, startFade = 0, startFadeTime = 0;
let screenCode = 4, backgroundPos = 0, totalChange, groundChange, position = 0;
let wagon = [], changeWagon = 0;
let sign;
let doneMoving = false;
let numOfBullets = 25, poundsOfMeat = 50, medicine = 5, campingSupplies = 0, dollars = 25;

let cTime = 5;
let cInterval = 0.002;
let deadDeer, deerMovement = 0, deerTime = 0, timer;
let deerImages = [];
let deers = [];
let gameDone = true;
let hunter, bullet, huntingBackground, bullets = [], deerKilled, deersKilled, meatCollected = 0, bulletsLeft;


function preload() {
  mainBackground = loadImage("assets/oregonTrail.png");
  fortWW = loadImage("assets/FortWallaWalla.avif");
  store = loadImage("assets/store.webp");
  riverOpening = loadImage("assets/riverOpening.jpg");
  mountains = loadImage("assets/mountains.jpg");
  sunsetMountain = loadImage("assets/sunsetMountain.jpg");
  yellowstone = loadImage("assets/yellowstone.jpg");
  mountainMeadow = loadImage("assets/mountainMeadow.webp");
  inverseMountains = loadImage("assets/mountains2.jpg");
  grassGround = loadImage("assets/grassGround.png");
  sign = loadImage("assets/sign.png");
  mapImage = loadImage("assets/map.png");
  deerSilhouette = loadImage("assets/deerSilhouette.png")
  mountainSilhouette = loadImage("assets/mountainSilhouette.png")
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
  print(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (int(screenCode) === 0) titleScreen();
  if (int(screenCode) === 1) mountainBiome();
  if (int(screenCode) === 2) huntingGame();
  if (int(screenCode) === 3) fortWallaWalla();
  if (int(screenCode) === 4) trailMap();
}

function titleScreen() {
  background(mainBackground);
  titleFade += 3.5;

  textSize(70);
  stroke(0, 0, 0, titleFade);
  textStyle(BOLD);
  fill(0, 0, 0, titleFade);
  text("The Oregon Trail", width / 2, height / 8 + 7);

  fill(147, 176, 255, titleFade);
  text("The Oregon Trail", width / 2, height / 8);
  if (titleFade > 300) {
    fadeText("PRESS SPACE TO START");
    if (keyIsPressed && key === " ") {
      screenCode = 3.1;
      screenTime = 0;
    }

  }
}

function fadeText(text1) {
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
  text(text1, width / 2, 3 * height / 4);
  stroke(0);
}

function trailMap(){
  background(mapImage);
  line(1700, height/2, 1400, 300); //connects all of the locations with lines
  line(1700, height/2, 1400, 700);

  line(1400, 700, 1100, 800);
  line(1400, 700, 1100, 500);
  line(1400, 300, 1100, 200);
  line(1400, 300, 1100, 500);

  line(1100, 200, 800, 300);
  line(1100, 500, 800, 300);
  line(1100, 500, 800, 700);
  line(1100, 800, 800, 700);

  line(800, 300, 500, 300);
  line(800, 700, 500, 700)
  
  line(500, 300, 200, 500);
  line(500, 700, 200, 500);
  
  mapCircles(1700, height/2, 0);

  mapCircles(1400, 300, 1);
  mapCircles(1400, 700, 2);

  mapCircles(1100, 200, 2);
  mapCircles(1100, height/2, 1);
  mapCircles(1100, 800, 1);

  mapCircles(800, 300, 2);
  mapCircles(800, 700, 2);

  mapCircles(500, 300, 1);
  mapCircles(500, 700, 1);

  mapCircles(200, height/2);
}

function mapCircles(x, y, image1){ // creates the circles for the locations on the map
  if(mouseX < x+50 && mouseX > x-50 && mouseY < y + 50 && mouseY > y - 50){
    fill(25, 160, 25);
    circle(x, y, 100);
    
  }
  else{
    fill(45,196,45);
    circle(x, y, 100);  
  }
  if(image1 === 1){
    image(deerSilhouette, x - 50, y - 50, 100, 100);
  }
  else if(image1 === 2){
    image(mountainSilhouette, x - 45, y - 30, 90, 60);
  }
}

function fortWallaWalla() {
  background(fortWW);
  screenTime += 1;
  if (screenCode === 3.2 || screenCode === 3.1) {
    background(0, 0, 0, 100);

    fill(0, 0, 0, 150);
    stroke(255);
    rectMode(CORNER);
    rect(150, 100, 1600, 800, 50);

    stroke(0);
    fill(255);
    setStory();
    textSize(40); textWrap(WORD); textAlign(CORNER, CORNER); textLeading(60);
    text(story, 200, 150, 1500);
    text("Space to continue >", 1200, 860)
    textAlign(CENTER, CENTER);
  }
  if (screenCode === 3.3) {
    textAlign(CENTER, CENTER);
    let y1, y2, f1, f2;
    if (mouseY < height && mouseY > height - 150) {
      if (mouseX > 0 && mouseX < 300) {
        y1 = height - 75; f1 = 100;
        y2 = height - 82; f2 = 255;

      }
      else if (mouseX > width - 300 && mouseX < width) {
        y1 = height - 82; f1 = 255;
        y2 = height - 85; f2 = 100;
      }
      else {
        y1 = height - 82; f1 = 255;
        y2 = height - 82; f2 = 255;
      }
    }
    else {
      y1 = height - 82; f1 = 255;
      y2 = height - 82; f2 = 255;
    }

    rectMode(CENTER);
    textSize(50);
    noStroke();
    fill(0);
    rect(150, y1 + 7, 300, 150, 10);
    fill(28, 53, 45, f1);
    rect(150, y1, 300, 150, 10);

    fill(255);
    stroke(0); strokeWeight(7);
    text("< START", 150, y1);

    fill(0);
    noStroke();
    rect(width - 150, y2 + 7, 300, 150, 10);
    fill(28, 53, 45, f2);
    rect(width-150  , y2, 300, 150, 10);

    fill(255);
    stroke(0); strokeWeight(7);
    text("STORE", width - 150, y2);

    if (mouseIsPressed && f2 === 100) {
      screenCode = 3.4;
      screenTime = 0;
    }
    if (mouseIsPressed && f1 === 100) {
      screenCode = 4;
    }
  }
  if(screenCode === 3.4){
    text("sorry no store yet", width/2, height/2)
    if(screenTime > 120){
      screenCode = 3.3;
    }
  //   background(store);
  //   textSize(50);
  //   text("Click on the item you want to buy", width/2, 100)

  //   textAlign(CENTER, CENTER);
  //   let y1, y2, f1, f2;
  //   if (mouseY < height && mouseY > height - 150) {
  //     if (mouseX > 0 && mouseX < 300) {
  //       y1 = height - 75; f1 = 100;
  //       y2 = height - 82; f2 = 255;

  //     }
  //     else if (mouseX > width - 300 && mouseX < width) {
  //       y1 = height - 82; f1 = 255;
  //       y2 = height - 85; f2 = 100;
  //     }
  //     else {
  //       y1 = height - 82; f1 = 255;
  //       y2 = height - 82; f2 = 255;
  //     }
  //   }
  //   else {
  //     y1 = height - 82; f1 = 255;
  //     y2 = height - 82; f2 = 255;
  //   }

  //   rectMode(CENTER);
  //   textSize(40);
  //   noStroke();
  //   fill(0);
  //   rect(150, y1 + 7, 300, 150, 10);
  //   fill(28, 53, 45, f1);
  //   rect(150, y1, 300, 150, 10);

  //   fill(255);
  //   stroke(0); strokeWeight(7);
  //   text("Purchase", 150, y1);

  //   fill(0);
  //   noStroke();
  //   rect(width - 150, y2 + 7, 300, 150, 10);
  //   fill(28, 53, 45, f2);
  //   rect(width-150  , y2, 300, 150, 10);

  //   fill(255);
  //   stroke(0); strokeWeight(7);
  //   text("Cancel", width - 150, y2);

  //   if (mouseIsPressed && f2 === 100) {
  //     screenCode = 3.3;
  //   }
  //   if (mouseIsPressed && f1 === 100) {
  //     screenCode = 3.3;
   }
  // }
}
function setStory() {
  if (screenCode === 3.1) {
    story = "Welcome Traveler, \n \n You are a farmer from Independence, Missouri who has sold all of his family's belongings to come find a new life in the Willmette Valley in Oregon Territory. You and your family have made it out of most of this grueling journey as you arived in Fort Walla Walla just 100 miles from Oregon City. You must stock up with supplies and make it to the Willmette Valley before winter hits in 15 days."
    if (keyIsPressed && key === " " && screenTime > 180) {
      screenCode = 3.2;
      screenTime = 0;
    }
  }

  if (screenCode === 3.2) {
    story = "\n You have arived with 50lbs of meat, 25 bullets, 5 camping supplies, 5 medicine, and 25 dollars. You can go to the store and stock up or you can start on your journey. \n \n use the map to choose locations to travel to like hunting spots or camp set ups \n \n your money, items, and time left will be counted to a score at the end."
    if (keyIsPressed && key === " " && screenTime > 180) {
      screenCode = 3.3;
    }
  }
}


function mountainBiome() {
  if (screenCode === 1.1) {
    rotateBackground1(mountains, inverseMountains, grassGround, 3);
    if (doneMoving) {
      huntQuestion();
    }
  }
  if (screenCode === 1.2) {
    rotateBackground1(mountains, inverseMountains, grassGround, 100);
    if (doneMoving) {
      huntQuestion();
    }
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


    image(sign, ground + width / 2, 6 * height / 7 - 70, 100, 150);
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
      text("SCORE " + deersKilled * 10, width / 2, 2 * height / 6 + 7);

      fill(255);
      text("SCORE " + deersKilled * 10, width / 2, 2 * height / 6);

      if (deersKilled * 10 > meatCollected) {
        meatCollected = deersKilled * 10;
      }

      textSize(40);
      fill(0);
      text("HIGH SCORE: " + meatCollected, width / 2, 2 * height / 6 + 77);

      fill(255);
      text("HIGH SCORE " + meatCollected, width / 2, 2 * height / 6 + 70);

      fadeText("PRESS SPACE TO PLAY AGAIN");

      if (keyIsDown(32)) {
        screenCode = 2.2;
      }


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

  let controls = ["W: FORWARDS", "S: BACKWARDS", "*HUNTER AIMS TOWARDS MOUSE*", "LEFT CLICK: SHOT"];

  for (let i = 1; i <= controls.length; i++) {
    textSize(30);
    text(controls[i - 1], width / 2, 2 * height / 6 + 90 + i * 45);
  }


  fadeText("PRESS SPACE TO START");
  if (keyIsPressed && key === " ") {
    screenCode = 2.2;
    deersKilled = 0;
    bulletsLeft = 20;
    gameDone = false;
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
    if (d.x > width || d.x < 0 || d.y > height || d.y < 0) {
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
  if(gameDone === false){
    hunter.action();
  }
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
  text(": " + deersKilled, 70, 57);

  fill(255);
  text(": " + deersKilled, 70, 50);

  strokeWeight(7);
  image(bullet, 170, 55, 40, 40);
  strokeWeight(5);


  textSize(40);
  fill(0);
  text(": " + bulletsLeft, 190, 57);

  fill(255);
  text(": " + bulletsLeft, 190, 50);

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
  if (mouseIsPressed && f1 === 100) {
    setBackgroundVariables(1.2, 3);
  }


}

