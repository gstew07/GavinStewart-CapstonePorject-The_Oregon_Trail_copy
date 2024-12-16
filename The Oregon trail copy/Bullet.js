class Bullet{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 50;

    if(mouseY <= this.y){
      this.direction = rotate(-atan((mouseX - this.x)/ (mouseY-this.y)));
    }
    else if( mouseY > this.y){
      this.direction = rotate(-atan((mouseX - this.x)/ (mouseY-this.y)) + 180);
    }
  }
  move(){
    this.y += this.speed;
  }

  display(){
    push();
  }
}