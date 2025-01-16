/* eslint-disable curly */
class Hunter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.change = 0;
    this.yD = 1;
    this.xD = 1;
  }
  action() {
    if (bulletsLeft > 0) {
      bullets.push(new Bullet(this.x, this.y));
      bulletsLeft -= 1;
    }

  }
  display() {
    push();
    translate(this.x, this.y);
    if (mouseY <= this.y) {
      rotate(-atan((mouseX - this.x) / (mouseY - this.y)));
      this.change = atan(abs(mouseX - this.x) / abs(mouseY - this.y)) / 90;
      this.yD = -1;

    }
    else if (mouseY > this.y) {
      rotate(-atan((mouseX - this.x) / (mouseY - this.y)) + 180);
      this.change = atan(abs(mouseX - this.x) / abs(mouseY - this.y)) / 90;
      this.yD = 1;
    }
    if (abs(-atan(abs(mouseX - this.x) / abs(mouseY - this.y))) === 90) {
      rotate(180);
    }
    print(this.change);


    fill(255);
    triangle(0, -20, -20, 20, 20, 20);
    pop();
  }
  move() {
    if (mouseX < this.x) this.xD = -1;
    else this.xD = 1;

    if (keyIsDown(65) || keyIsDown(87) || keyIsDown(83) || keyIsDown(68)) {
      if (key === "w") {
        print(this.change);
        this.x += this.xD * (3 * this.change);
        this.y += this.yD * (3 - 3 * this.change);

      }
      if (key === "s") {
        this.x += -this.xD * (3 * this.change);
        this.y += -this.yD * (3 - 3 * this.change);

      }

    }
    if (this.x < 0) this.x = 0;
    if (this.x > width) this.x = width;
    if (this.x < 0) this.y = 0;
    if (this.y > height) this.y = height;
  }

  gameOver() {
    fill(255);
    triangle(this.x, this.y - 20, this.x - 20, this.y + 20, this.x + 20, this.y + 20);
  }
}

