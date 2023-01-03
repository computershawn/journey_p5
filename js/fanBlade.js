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
    this.co = this.isOpaque ? color(255) : color(0, 127);
    this.altColorIndex = floor(random(5));
    this.altColorOpacity = round(random(143, 247));
    this.value = random(1);
    this.colorStartIndex = floor(random(maxTicks));
  }

  update(pt0, pt1, pt2, pt3) {
    this.points.pt0 = pt0;
    this.points.pt1 = pt1;
    this.points.pt2 = pt2;
    this.points.pt3 = pt3;
    this.center.x = 0.5 * (pt0.x + pt2.x);
    this.center.y = 0.5 * (pt0.y + pt2.y);
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
      altColorIndex,
      altColorOpacity,
      isOpaque,
      co,
      points: { pt0, pt1, pt2, pt3 },
      value,
    } = this;

    // Shadow effect
    strokeCap(SQUARE);
    strokeWeight(3);
    stroke(0, 55);
    line(pt0.x, pt0.y, pt1.x, pt1.y);
    line(pt3.x, pt3.y, pt0.x, pt0.y);

    strokeWeight(1);
    stroke(0, 63);
    fill(co);
    if (showColor && !isOpaque && palette.length) {
      const c = palette[altColorIndex];
      const altColor = color(red(c), green(c), blue(c), altColorOpacity);
        fill(altColor);
    }
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

    // Render tick marks
    if (isOpaque && showColor) {
      const longSide = max(dist(pt0.x, pt0.y, pt1.x, pt1.y), dist(pt2.x, pt2.y, pt3.x, pt3.y));
      const len = constrain(longSide, 1, 200);
      const numTicks = map(len, 1, 200, 1, maxTicks);
  
      for (let j = 1; j < numTicks; j++) {
        const b = j / numTicks;
        if (palette.length && tickSequence.length) {
          const tickMarkIndex = this.colorStartIndex + j - 1;
          const tickColor = palette[tickSequence[tickMarkIndex]];
          stroke(tickColor);
        }
        line(
          pt0.x + b * value * (pt1.x - pt0.x),
          pt0.y + b * value * (pt1.y - pt0.y),
          pt3.x + b * value * (pt2.x - pt3.x),
          pt3.y + b * value * (pt2.y - pt3.y)
        );
      }
    }
  }
}
