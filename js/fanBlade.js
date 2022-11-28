class FanBlade {
  // PVector center;
  // color co;
  // int index;
  // boolean isOpaque;

  constructor(_index) {
    // this.center = {x: 0, y: 0};
    this.center = createVector(0, 0);
    this.index = _index;
    this.isOpaque = random(1) > 0.1;
    this.topEdge = random(1) > 0.5 ? true : false;
    // if (!_isOpaque) {
    //   co = color(0, 127);
    // }
  }

  // update(PVector point0, PVector point2, color _co) {
  update(point0, point2) {
    // if (isOpaque) {
    //   co = _co;
    // }
    this.center.x = 0.5 * (point0.x + point2.x);
    this.center.y = 0.5 * (point0.y + point2.y);
  }

  getAngle(point0, point1, point2, point3) {
    const {
      center,
    } = this;
    const vec = this.topEdge
      ? createVector((point3.x + point0.x) / 2, (point3.y + point0.y) / 2)
      : createVector((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);

    const trajVec = createVector(center.x - vec.x, center.y - vec.y);

    return trajVec.heading();
  }

  // render(PVector point0, PVector point1, PVector point2, PVector point3) {
  render(point0, point1, point2, point3, co) {
    const {
      center,
      isOpaque
    } = this;
    // Shadow effect
    // if (isOpaque) {
    //   strokeWeight(4);
    //   stroke(0, 31);
    //   line(point0.x, point0.y, point1.x, point1.y);
    // }
    strokeWeight(1);
    //stroke(0, 63);
    stroke(0, 63);
    fill(co);
    beginShape();
    vertex(point0.x, point0.y);
    vertex(point1.x, point1.y);
    vertex(point2.x, point2.y);
    vertex(point3.x, point3.y);
    // texture(img);
    // vertex(point0.x, point0.y, point0.x, point0.y);
    // vertex(point1.x, point1.y, point1.x, point1.y);
    // vertex(point2.x, point2.y, point2.x, point2.y);
    // vertex(point3.x, point3.y, point3.x, point3.y);
    endShape(CLOSE);

    // Experimental stuff here…
    // if (this.index === 30) {
    //   let vec1 = createVector((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
    //   let vec2 = createVector((point3.x + point0.x) / 2, (point3.y + point0.y) / 2);
    //   const r = 20;

    //   stroke(0, 255, 0);
    //   let vec3;
    //   const a = this.getAngle(point0, point1, point2, point3);
    //   if (this.topEdge) {
    //     noStroke();
    //     fill(255, 0, 0);
    //     circle(vec1.x, vec1.y, 4);
    //     vec3 = createVector(center.x - vec1.x, center.y - vec1.y);
    //     stroke(255, 0, 0);
    //     line(vec1.x, vec1.y, vec1.x + r * cos(a), vec1.y + r * sin(a));
    //   } else {
    //     noStroke();
    //     fill(255, 0, 0);
    //     circle(vec2.x, vec2.y, 4);
    //     vec3 = createVector(center.x - vec2.x, center.y - vec2.y);
    //     stroke(255, 0, 0);
    //     line(vec2.x, vec2.y, vec2.x + r * cos(a), vec2.y + r * sin(a));
    //   }
    // }
  }
}
