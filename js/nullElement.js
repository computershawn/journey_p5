// This declaration is temporary. The 'bal' value
// is user-controllable in the original Processing
// sketch. Either make it controllable or leave it
// as a constant
const bal = 0.5;
const diff = 4;

class NullElement {
  constructor(_pos, _index) {
    this.x = _pos.x;
    this.y = _pos.y;
    this.counter = _index;
    this.angleOffset = radians(_index * 2);
    this.point0 = {x: 0, y: 0};
    this.point1 = {x: 0, y: 0};
  }

  update(frameNum) {
    const {
      angleOffset, counter
    } = this;
    const c = frameNum + counter;
    const unitAmount = c % durationFrames / durationFrames;
    const sinAmount = sin(unitAmount * TWO_PI);
    const a = (HALF_PI + angleOffset) * sinAmount;
    const len = map(sinAmount, -1, 1, radius, radius * diff);
    // const len = lerp(0.5 * (sinAmount + 1), radius, radius * diff);
    // console.log('fps', fps);
    // console.log('durationSec', durationSec);
    // console.log('durationFrames', durationFrames);
    // console.log('unitAmount', unitAmount);
    // console.log('sinAmount', sinAmount);

    this.point0.x = -len * bal * cos(a);
    this.point0.y = -len * bal * sin(a);
    this.point1.x = len * (1.0 - bal) * cos(a) * 0.5;
    this.point1.y = len * (1.0 - bal) * sin(a) * 0.5;
  }
}