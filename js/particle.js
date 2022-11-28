class Particle {
  constructor(_x0, _y0) {
    this.x0 = _x0;
    this.y0 = _y0;
    this.pos = { x: _x0, y: _y0 };
    this.diam = 5;
    this.travel = this.pos.x + this.diam;
    this.co = random(1) > 0.5 ? color(47) : color(127);
    this.lifespan = 200 + round(random(200));
    this.currentFrame = floor(random(this.lifespan));
    this.opacity = 0;
    this.xStretch = 0;
  }

  // void reset(PVector p) {
  reset(p) {
    this.currentFrame = 0;
    this.lifespan = 200 + round(random(200));
    this.x0 = p.x;
    this.pos = { x: p.x, y: p.y };
    this.travel = this.pos.x + this.diam;
  }

  // void update() {
  update() {
    let {currentFrame, opacity, pos, travel} = this;
    const {x0, lifespan} = this;
    const a = TWO_PI * (currentFrame % 20) / 20;
    this.xStretch = sin(a);
    if (this.currentFrame < 24) {
      opacity = round(159 * currentFrame / 24);
    } else {
      opacity = 159;
    }
    const amt = easeInQuad(currentFrame / lifespan);
    pos.x = x0 - amt * travel;
    this.currentFrame += 1;
  }

  // void render() {
  render() {
    const {
      opacity, pos, xStretch, diam, co
    } = this;
    stroke(47, opacity);
    fill(co, opacity);
    ellipse(pos.x, pos.y, xStretch * diam, diam);
  }
}