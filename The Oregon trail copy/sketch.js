// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mainBackground, font;
let titleFade = 1, startFade = 0, startFadeTime = 0;
let screenCode = 0, backgroundPos = 0, totalChange, position = 0;

function preload(){
  mainBackground = loadImage("assets/mainBackground.jpg");
  mountains = loadImage("assets/mountains.jpg");
  inverseMountains = loadImage("assets/mountains2.jpg");
  font = loadFont("assets/pixelFont.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER,CENTER);
}

function draw() {
  background(220);
  if(screenCode === 0) titleScreen();
  if(screenCode === 1) startVillage();

}

function titleScreen(){
  background(mainBackground);
  titleFade += 3.5;
  
  textSize(70);
  textStyle(BOLD);
  fill(0, 0, 0, titleFade);
  text("The Oregon Trail", width/2, height/8 + 7);

  fill(24, 192, 47, titleFade);
  text("The Oregon Trail", width/2, height/8);
  if(titleFade > 300){
    if(startFadeTime === 0 && startFade < 1){
      startFade += 0.02;
    }
    else if(startFadeTime === 0){
      startFadeTime = 1;
    }
    if(startFadeTime === 1 && startFade > 0){
      startFade -= 0.02;
    }
    else if(startFadeTime === 1){
      startFadeTime = 0;
    }

    let fade = map(startFade, 0, 1, 0, 255);

    textSize(60);
    fill(255, 255, 255, fade);
    text("PRESS SPACE TO START", width/2, 3*height/4);
    if(keyIsPressed && key === " "){
      screenCode = 1;
      backgroundPos = -10*width;
      totalChange = 0;
      position += backgroundPos;
    }
    
  }
}

function startVillage(){
  rotateBackground1(mountains, inverseMountains, 5);
  
}

function rotateBackground1(image1, image2, rate){
  rotateBackground2(image1, image2, position, 1);
  if(position <= 0 - rate){
    position += rate;
    totalChange += rate;
  }
}

function rotateBackground2(image1, image2, xPosition, direction){
  if(xPosition <= totalChange){
    if(direction === 1){
      image(image1, xPosition, 0, width, height);
    }
    else if(direction === -1){
      image(image2, xPosition, 0, width, height);
    }
    
    rotateBackground2(image1, xPosition + width, direction*-1);
  }
}
