const nullelements = [];
let purp, lavender, lightLavender, cyan, lightCyan, redOrange,
  white, rose, violet, gray, lightGray, black;



const numParticles = 20;

// Timing
const fps = 24;
const durationSec = 8;
const durationFrames = fps * durationSec;
// let timeMode = 0;
// let ani = 0;

// Collections of things
const pts = [];
const nullElements = [];
const particlesFront = [];
const particlesBack = [];
const fanBlades = [];

// Geometry
const radius = 96; // 48;
const numLoops = 160; // 200; // 160; // 60;

// Display of geometry and guides
const showFan = true;
const showPoints = false;
const showBezier = true;
const showParticles = false;

/*
// Canvas
PGraphics canv;

const values = [];

ControlP5 cp5;

const  diff = 0;
const  bal = 0;

// Bezier Curve variables
const dragging;
const lastDragState = false;
const  mouseDX = 0;
const  mouseDY = 0;
BeziCurve b;
*/

function setup() {
  violet = color(hexColors.violet);

  // // Initialize particles
  // for (let j = 0; j < numParticles / 2; j++) {
  //   const x1 = random(wd);
  //   const x2 = random(wd);
  //   const y1 = random(ht);
  //   const y2 = random(ht);
  //   particlesFront.push(new Particle(x1, y1));
  //   particlesBack.push(new Particle(x2, y2));
  // }

  // Initialize points
  const sp = 4;
  for (let j = 0; j < numLoops; j++) {
    const w = (numLoops - 1) * sp;
    const xOffset = cX - w / 2;
    pts.push({
      x: xOffset + j * sp,
      y: cY,
    });
  }

  // Initialize null elements
  for (let j = 0; j < pts.length; j++) {
    nullElements.push(new NullElement(pts[j], j));
  }

  // Initialize fan blades
  for (let j = 0; j < nullElements.length - 1; j++) {
    fanBlades.push(new FanBlade(j));
  }

  // Initialize particles
  for (let j = 0; j < numParticles / 2; j++) {
    const rand1 = getRandomIndex(fanBlades.length);
    const rand2 = getRandomIndex(fanBlades.length);
    const fb1 = fanBlades[rand1];
    const fb2 = fanBlades[rand2];
    const {x: x1, y: y1} = fb1.center;
    const {x: x2, y: y2} = fb2.center;
    particlesFront.push(new Particle(x1, y1));
    particlesBack.push(new Particle(x2, y2));
  }

  createCanvas(wd, ht);
  frameRate(fps);
  noLoop();
}

function draw() {
  background(199);
  noStroke();

  // Update all positions of our references
  nullElements.forEach(nE => {
    nE.update(frameCount);
  });

  renderParticles(particlesBack);
  renderFan(fanBlades, nullElements);
  renderParticles(particlesFront);

  if (showPoints) {
    renderPoints();
  }
}

const renderParticles = (particleList) => {
  particleList.forEach(par => {
    par.update();
    par.render();

    if (par.currentFrame === par.lifespan) {
      const randIndex = getRandomIndex(fanBlades.length);
      const fb = fanBlades[randIndex];
      par.reset(fb.center);
    }
  });

}

const renderPoints = () => {
  nullElements.forEach(elem => {
    noStroke();
    fill(255, 0, 0);
    circle(elem.point0.x + elem.x, elem.point0.y + elem.y, 3);
    circle(elem.point1.x + elem.x, elem.point1.y + elem.y, 3);
  });
};