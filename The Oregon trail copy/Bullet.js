class Bullet{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 20;
    this.yChange = 0;

    if(mouseY <= this.y){
      this.direction = -atan((mouseX - this.x)/ (mouseY-this.y));
    }
    else if( mouseY > this.y){
      this.direction = -atan((mouseX - this.x)/ (mouseY-this.y)) + 180;
    }
    if(abs(this.direction) === 90){
      this.direction *= -1;
    }
    // print(this.direction);
  }
  move(){
    this.yChange -= this.speed;

    
    if(this.yChange*sin(this.direction) < -(width - this.x) || this.yChange*cos(this.direction) > height - this.y || this.yChange*sin(this.direction) > this.x || this.yChange*cos(this.direction) < -this.y){
      bullets.splice(0, 1);
    }
  }

  display(){
    push();
    translate(this.x, this.y);
    rotate(this.direction);

    fill(255);
    triangle(0, this.yChange - 10, -5, this.yChange, 5, this.yChange);

    pop();
  }
  hit(){
    for(let d of deers){
      if(abs((this.x - this.yChange*sin(this.direction)) - d.x) < 40 && abs((this.y + this.yChange*cos(this.direction))- d.y) < 40){
        d.kill();
        bullets.splice(0, 1);
      }
    }

  }
}