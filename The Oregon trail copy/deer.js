



class Deer{
  constructor(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    
  }

  move(){
    this.xChange = this.speed*noise(cTime);
    this.yChange = this.speed - this.xChange;

    switch(this.direction){
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

  directionSet(){
    if(this.x < width/2){
      if(this.y < height/2){
        this.direction = 1;
      }
      if(this.y >= height/2){
        this.direction = 4;
      }
    }
    if(this.x >= width/2){
      if(this.y < height/2){
        this.direction = 2;
      }
      if(this.y >= height/2){
        this.direction = 3;
      }
    }

    if(this.xChange<0){
      if(deerMovement < 10 || deerMovement > 12){
        deerMovement = 10;
      }
      this.image = deerImages[deerMovement];
      deerMovement += 1;
    }
    if(this.xChange>=0){
      if(deerMovement < 4 || deerMovement > 6){
        deerMovement = 4;
      }
      this.image = deerImages[deerMovement];
      deerMovement += 1;
    }
  }

  display(){
    image(this.image, this.x, this.y, 60, 40);
  }

  action(){
    this.directionSet();
    this.move();
    this.display();
  }
}