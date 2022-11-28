
// EASING FUNCTIONS
const easeInCubic = (t) => {
  return t * t * t;
}

const easeInQuad = (t) => {
  return t * t;
}

// TAKE A VALUE AND OUTPUT A RANDOM NEW VALUE WITHIN +/- RANGE
const wobble = (val, range) => {
  const dir = Math.random() > 0.5 ? 1 : -1;
  const variance = 1.0 + dir * Math.random() * range;
  const wob = variance * val;
  if (wob < 0 || wob > 1.0) {
    return val;
  }

  return wob;
}

// CALCULATE THE X/Y COORDINATES ALONG AN ARC 
const getArcPoints = (arcAngle, numPoints) => {
  const temp = [];
  for (let i = 0; i < numPoints; i++) {
    const r = 800;
    const a = 2 * i / numPoints * arcAngle - arcAngle - Math.PI / 2;
    const x = r * Math.cos(a);
    const y = r * Math.sin(a) + r;
    temp.push({
      x: cX + x,
      y: cY + y
    });
  }

  return temp;
}

// GET RANDOM INDEX OF ITEM IN ARRAY
const getRandomIndex = (len) => {
  return floor(random(len));
};
