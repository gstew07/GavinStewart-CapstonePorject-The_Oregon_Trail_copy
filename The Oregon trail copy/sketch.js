// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mainBackground, font;
let titleFade = 1, startFade = 0, startFadeTime = 0;
let screenCode = 0, backgroundPos = 0, totalChange, groundChange, position = 0;

function preload() {
  mainBackground = loadImage("assets/mainBackground.jpg");
  mountains = loadImage("assets/mountains.jpg");
  inverseMountains = loadImage("assets/mountains2.jpg");
  grassGround = loadImage("assets/grassGround.png");
  font = loadFont("assets/pixelFont.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  if (screenCode === 0) titleScreen();
  if (screenCode === 1) startVillage();

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
      groundChange = 2*position;

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
    groundChange += 2*rate;
  }
}

function rotateBackground2(image1, image2, image3, xPosition, ground, direction) {// uses two images and reccurssion to scroll the background
  if (ground <= 2*totalChange) {
    if(xPosition <= totalChange){
      if (direction === 1) {
        image(image1, xPosition, 0, width, 6*height/7);
  
      }
      else if (direction === -1) {
        image(image2, xPosition, 0, width, 6*height/7);
  
      }
    }
    
    for(let i = 0; i < 2; i++){
      image(image3, ground + i*width/2, 4*height/5, width/2, height/5);
    }
    
    
    rotateBackground2(image1, image2, image3, xPosition + width, ground + width, direction * -1);



  }
}
