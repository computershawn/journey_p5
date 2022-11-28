class Particle {
  constructor(_x0, _y0, _heading) {
    // this.x0 = _x0;
    // this.y0 = _y0;
    this.x0 = random(wd);
    this.y0 = random(ht);
    this.pos = createVector(_x0, _y0);
    this.diam = 5;
    this.travel = this.pos.x + this.diam;
    this.co = random(1) > 0.5 ? color('#444') : color('#CCC');
    this.lifespan = 200 + round(random(200));
    this.currentFrame = floor(random(this.lifespan));
    this.opacity = 0;
    this.xStretch = 0;
    this.heading = _heading;
    this.speed = 1;
  }

  reset(newPoint, newHeading) {
    this.currentFrame = 0;
    this.lifespan = 200 + round(random(200));
    this.x0 = newPoint.x;
    this.y0 = newPoint.y;
    this.pos = createVector(newPoint.x, newPoint.y);
    this.travel = this.pos.x + this.diam;
    this.heading = newHeading;
  }

  isOutside() {
    const { pos: { x, y }, diam } = this;
    return x < -1 * diam ||
      x > wd + diam ||
      y < -1 * diam ||
      y > ht + diam;
  }

  update() {
    let {currentFrame, pos, travel} = this;
    const {x0, y0, lifespan, speed, heading} = this;
    const a = TWO_PI * (currentFrame % 20) / 20;
    this.xStretch = sin(a);
    if (this.currentFrame < 24) {
      this.opacity = round(159 * currentFrame / 24);
    } else {
      this.opacity = 159;
    }
    // const amt = easeInQuad(currentFrame / lifespan);
    // pos.x = x0 - amt * travel;
    pos.x = x0 + currentFrame * speed * cos(heading);
    pos.y = y0 + currentFrame * speed * sin(heading);
    this.currentFrame += 1;
  }

  render() {
    const {
      opacity, pos, xStretch, diam, co, heading,
    } = this;
    stroke(47, opacity);
    fill(co, opacity);
    push();
    translate(pos.x, pos.y);
    rotate(heading)
    ellipse(0, 0, xStretch * diam, diam);
    pop();
  }
}