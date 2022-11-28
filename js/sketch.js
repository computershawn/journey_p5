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
const radius = 48;
const numLoops = 160; // 200; // 160; // 60;

/*
// Timing

// Geometry
const radius = 48;
const numLoops = 200; // 160; // 60;

// Canvas
const wd, ht;
const cX, cY;
PGraphics canv;

// Display of geometry and guides
const showFan = true;
const showPoints = false;
const showBezier = true;
const showParticles = false;

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
  violet = color(violet_hx);

  // Initialize particles
  for (let j = 0; j < numParticles / 2; j++) {
    const x1 = random(wd);
    const x2 = random(wd);
    const y1 = random(ht);
    const y2 = random(ht);
    particlesFront.push(new Particle(x1, y1));
    particlesBack.push(new Particle(x2, y2));
  }

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

  createCanvas(wd, ht);
  frameRate(24);
}

function draw() {
  background(0);
  noStroke();

  // Update all positions of our references
  nullElements.forEach(nE => {
    nE.update(frameCount);
  });

  // renderParticles(particlesBack);
  renderFan(fanBlades, nullElements);
  // renderParticles(particlesFront);

  // renderPoints();
}

const renderParticles = (particleList) => {
  particleList.forEach(par => {
    par.update();
    par.render();

    if (par.currentFrame === par.lifespan) {
      const x = random(wd);
      const y = random(ht);
      par.reset({ x, y });
    }
  });

}

const renderPoints = () => {
  nullElements.forEach(elem => {
    noStroke();
    fill(255, 0, 0);
    circle(elem.x, elem.y, 4);
  });
};