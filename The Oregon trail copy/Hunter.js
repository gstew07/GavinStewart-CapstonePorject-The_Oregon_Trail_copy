class Hunter{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  action(){
    
    bullets.push(new Bullet(this.x, this.y));
    
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
}

