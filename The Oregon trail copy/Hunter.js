/* eslint-disable curly */
class Hunter{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.xm = 0;
    this.ym = 0;
  }
  action(){
    if(bulletsLeft > 0){
      bullets.push(new Bullet(this.x, this.y));
      bulletsLeft -= 1;
    }
    
  }
  display(){
    push();
    translate(this.x, this.y);
    if(mouseY <= this.y){
      rotate(-atan((mouseX - this.x)/ (mouseY-this.y)));
    }
    else if( mouseY > this.y){
      rotate(-atan((mouseX - this.x)/ (mouseY-this.y)) + 180);
    }
    if(abs(-atan((mouseX - this.x)/ (mouseY-this.y))) === 90 ){
      rotate(180);
    }
  
    
    fill(255);
    triangle(0, -20, -20, 20, 20, 20);
    pop();
  }
  move(){
    if(keyIsDown(65) || keyIsDown(87) || keyIsDown(83) || keyIsDown(68)){
      if(key === "w"){
        this.y -= 3;
        if(this.y < 0) this.y = 0;
      }
      if(key === "s"){
        this.y += 3;
        if(this.y > height) this.y = height;
      }
      if(key === "d"){
        this.x += 3;
        if(this.x > width) this.x = width;
      }
      if(key === "a"){
        this.x -= 3;
        if(this.x < 0) this.x = 0;
      }
      if(key === "a" && key === "s"){
        this.x -= 3;
        if(this.x < 0) this.x = 0;
        this.y += 3;
        if(this.y > height) this.y = height;
      }
      if(key === "a" && key === "w"){
        this.x -= 3;
        if(this.x < 0) this.x = 0;
        this.y -= 3;
        if(this.y < 0) this.y = 0;
      }
      if(key === "d" && key === "s"){
        this.x += 3;
        if(this.x > width) this.x = width;
        this.y += 3;
        if(this.y > height) this.y = height;
      }
      if(key === "d" && key === "w"){
        this.x += 3;
        if(this.x > width) this.x = width;
        this.y -= 3;
        if(this.y < 0) this.y = 0;
      }
    }
    
  }
  gameOver(){
    fill(255);
    triangle(this.x, this.y - 20, this.x - 20, this.y + 20, this.x + 20, this.y + 20);
  }
}

