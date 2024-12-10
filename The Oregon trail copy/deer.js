let cTime = 5; 
let cInterval = 0.05;
let deadDeer;

function loadDeer(){
  deadDeer = loadImage("assets/deadDeer.png");
  for(let i = 1; i < 7; i++){
    deerImages.push(loadImage("assets/Deer"+i));
    deerImages.push(loadImage("assets/Deer"+i+"left"));
  }
}


class Deer{
  constructor(x, y, speed, direction){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
  }
  move(){
    this.xChange = speed*noise(cTime);
    this.yChange = speed - this.xChange;

    switch(direction){
    case 1:
      this.x += this.xChange;
      this.y += this.yChange;
      break;
    case 2:
      this.x += -this.xChange;
      this.y += this.yChange;
      break;
    case 3:
      this.x += -this.xChange;
      this.y += -this.yChange;
      break;
    case 4:
      this.x += this.xChange;
      this.y += -this.yChange;
      break;
        
    }

    cTime += cInterval;
  }

  chooseImage(){
    if(this.xChange<0){
      this.image = deerImages[0];
    }
    if(this.xChange>=0){
    //loop right images
    }
  }

  display(){
    
  }
}