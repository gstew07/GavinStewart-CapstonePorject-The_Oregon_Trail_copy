class Hunter{
  constructor(x, y){
    this.x = x;
    this.y = y;
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
  gameOver(){
    fill(255);
    triangle(this.x, this.y - 20, this.x - 20, this.y + 20, this.x + 20, this.y + 20);
  }
}

