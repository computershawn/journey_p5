class FanBlade {
  constructor(_index) {
    this.center = createVector(0, 0);
    this.index = _index;
    this.isOpaque = random(1) > 0.1;
    this.topEdge = random(1) > 0.5 ? true : false;
    this.points = {
      pt0: createVector(0, 0),
      pt1: createVector(0, 0),
      pt2: createVector(0, 0),
      pt3: createVector(0, 0),
    };
    this.co = color(127, 127);
    this.value = random(1);
  }

  update(pt0, pt1, pt2, pt3, _co) {
    this.points.pt0 = pt0;
    this.points.pt1 = pt1;
    this.points.pt2 = pt2;
    this.points.pt3 = pt3;
    this.center.x = 0.5 * (pt0.x + pt2.x);
    this.center.y = 0.5 * (pt0.y + pt2.y);
    if (this.isOpaque) {
      this.co = _co;
    }
  }

  getHeading() {
    const {
      center,
      points: { pt0, pt1, pt2, pt3 },
    } = this;
    const vec = this.topEdge
      ? createVector((pt3.x + pt0.x) / 2, (pt3.y + pt0.y) / 2)
      : createVector((pt1.x + pt2.x) / 2, (pt1.y + pt2.y) / 2);
    const trajVec = createVector(center.x - vec.x, center.y - vec.y);

    return trajVec.heading();
  }

  render() {
    const {
      isOpaque,
      co,
      points: { pt0, pt1, pt2, pt3 },
      value,
    } = this;
    // Shadow effect
    if (isOpaque) {
      strokeCap(SQUARE);
      strokeWeight(4);
      stroke(0, 31);
      line(pt0.x, pt0.y, pt1.x, pt1.y);
    }
    strokeWeight(1);
    stroke(0, 63);
    fill(co);
    beginShape();
    vertex(pt0.x, pt0.y);
    vertex(pt1.x, pt1.y);
    vertex(pt2.x, pt2.y);
    vertex(pt3.x, pt3.y);
    // texture(img);
    // vertex(point0.x, point0.y, point0.x, point0.y);
    // vertex(point1.x, point1.y, point1.x, point1.y);
    // vertex(point2.x, point2.y, point2.x, point2.y);
    // vertex(point3.x, point3.y, point3.x, point3.y);
    endShape(CLOSE);

    // noStroke();
    // fill(0, 31);
    // beginShape();
    // vertex(pt0.x, pt0.y);
    // vertex(pt0.x + value * (pt1.x - pt0.x), pt0.y + value * (pt1.y - pt0.y));
    // vertex(pt3.x + value * (pt2.x - pt3.x), pt3.y + value * (pt2.y - pt3.y));
    // vertex(pt3.x, pt3.y);
    // endShape(CLOSE);
    noFill();

    for (let j = 0; j < 10; j++) {
      const b = j / 10;
      line(
        pt0.x + b * value * (pt1.x - pt0.x),
        pt0.y + b * value * (pt1.y - pt0.y),
        pt3.x + b * value * (pt2.x - pt3.x),
        pt3.y + b * value * (pt2.y - pt3.y)
      );
    }
  }
}
