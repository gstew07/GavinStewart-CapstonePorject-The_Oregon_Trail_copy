// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mainBackground, font;
let titleFade = 1, startFade = 255;
let cTime = 5; // Current "noise" time
let cInterval = 0.05;

function preload(){
  mainBackground = loadImage("assets/mainBackground.jpg");
  font = loadFont("assets/pixelFont.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER,CENTER);
}

function draw() {
  background(220);
  titleScreen();
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

  textSize(60);
  fill(255);
  text("PRESS SPACE TO START", width/2, 3*height/4, startFade);
  

  
}