class FanBlade {
  // PVector center;
  // color co;
  // int index;
  // boolean isOpaque;

  constructor(_index) {
    this.center = {x: 0, y: 0};
    this.index = _index;
    this.isOpaque = random(1) > 0.1;
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
    stroke(255, 0, 0);
    // line(point1.x, point1.y, point2.x, point2.y);
    line(center.x, center.y, (point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
  }
}
