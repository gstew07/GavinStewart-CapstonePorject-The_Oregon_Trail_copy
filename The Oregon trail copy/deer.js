



class Deer{
  constructor(x, y, speed, deerMovement){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.image = deerImages[0];
    this.xChange = 0;
    this.yChange = 0;
    this.rotate = 0;

    this.deerMovement = deerMovement;

    if(x < width/2){
      if(y < height/2){
        this.direction = 1;
      }
      else if(y >= height/2){
        this.direction = 4;
      }
    }
    if(x >= width/2){
      if(y < height/2){
        this.direction = 2;
      }
      else if(y >= height/2){
        this.direction = 3;
      }
    }
    
  }

  move(){
    this.xChange = this.speed*noise(cTime);
    this.yChange = this.speed - this.xChange;

    switch(this.direction){
    case 1:
      this.x += this.xChange;
      this.y += this.yChange;
      this.rotate = atan(this.yChange/this.xChange);
      break;
    case 2:
      this.x += -this.xChange;
      this.y += this.yChange;
      this.rotate = -atan(this.yChange/this.xChange);
      break;
    case 3:
      this.x += -this.xChange;
      this.y += -this.yChange;
      this.rotate = atan(this.yChange/this.xChange);
      break;
    case 4:
      this.x += this.xChange;
      this.y += -this.yChange;
      this.rotate = -atan(this.yChange/this.xChange);
      break;
        
    }

    cTime += cInterval;
  }

  directionSet(){
    if(deerTime % 12 === 0){
      
  
      if(this.direction === 2 || this.direction === 3){
        if(this.deerMovement < 9 || this.deerMovement > 11){
          this.deerMovement = 9;
        }
        this.image = deerImages[this.deerMovement];
        this.deerMovement += 1;
      }
      if(this.direction === 1 || this.direction === 4){
        if(this.deerMovement < 3 || this.deerMovement > 5){
          this.deerMovement = 3;
        }
        this.image = deerImages[this.deerMovement];
        this.deerMovement += 1;
      }
    }
    
  }

  display(){
    push();
    translate(this.x, this.y);
    rotate(this.rotate);
    image(this.image, 0, 0, 120, 80);
    pop();
  }

  action(){
    this.directionSet();
    this.move();
    this.display();
  }
}