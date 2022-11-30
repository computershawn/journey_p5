const numParticles = 320;

// Timing
const fps = 24;
const durationSec = 16;
const durationFrames = fps * durationSec;
let currentCycleFrame = 0;
let animationMode = 1;  // 0 = auto, 1 = scrub
// let timeMode = 0;
// let ani = 0;

// Collections of things
const pts = [];
const nullElements = [];
const particlesFront = [];
const particlesBack = [];
const fanBlades = [];

// Geometry
const radius = 108; // 48;
const numLoops = 200; // 160; // 200; // 160; // 60;

// Display of geometry and guides
const showFan = true;
const showPoints = false;
const showPath = false;
const showBezier = true;
const showParticles = false;

// Colors
let lavender, lightCyan, violet;

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
  lavender = color(hexColors.lavender);
  lightCyan = color(hexColors.lightCyan);
  violet = color(hexColors.violet);

  // Set up UI Controls
  const slider = document.querySelector('#frame-number');
  slider.addEventListener('input', (e) => {
    const num = e.target.value;
    goToFrameNumber(num);
  });
  if (animationMode === 1) {
    const randFrame = floor(random(384))
    slider.value = randFrame;
    currentCycleFrame = randFrame;
  }

  const animModeBtn = document.querySelector('#animation-mode');
  animModeBtn.addEventListener('click', () => {
    if (animationMode === 0) {
      animationMode = 1;
      animModeBtn.innerHTML = "play";
    } else {
      animationMode = 0;
      animModeBtn.innerHTML = "pause";
    }
  });

  // Initialize points
  // Unfurly path is a straight line
  // const sp = 4;
  // for (let j = 0; j < numLoops; j++) {
  //   const w = (numLoops - 1) * sp;
  //   const xOffset = cX - w / 2;
  //   const vec = createVector(xOffset + j * sp, cY);
  //   pts.push(vec);
  // }

  // Initialize points
  // Unfurly path is an arc
  const arcPoints = getArcPoints(QUARTER_PI, numLoops, 400);
  for (let j = 0; j < numLoops; j++) {
    pts.push(arcPoints[j]);
  }

  // Initialize null elements
  for (let j = 0; j < pts.length; j++) {
    nullElements.push(new NullElement(pts[j], j));
  }

  // Initialize fan blades
  for (let j = 0; j < nullElements.length - 1; j++) {
    const fb = new FanBlade(j);
    fanBlades.push(fb);
  }

  // Do an initial run to get a 'heading' value from
  // each fan blade; Each particle can attach itself
  // to a random fan blade and move along its heading
  nullElements.forEach(nE => {
    nE.update(frameCount);
  });
  renderFan(fanBlades, nullElements);

  // Initialize particles
  for (let j = 0; j < numParticles / 2; j++) {
    const rand1 = getRandomIndex(fanBlades.length);
    const rand2 = getRandomIndex(fanBlades.length);
    const fb1 = fanBlades[rand1];
    const fb2 = fanBlades[rand2];
    particlesFront.push(new Particle(fb1.center, fb1.getHeading()));
    particlesBack.push(new Particle(fb2.center, fb2.getHeading()));
  }
  
  const den = displayDensity();
  pixelDensity(den);

  createCanvas(wd, ht);
  frameRate(fps);
  // noLoop();
}

function draw() {
  background(0);
  noStroke();

  if (animationMode === 0) {
    currentCycleFrame = frameCount % durationFrames;
  }

  // Update all positions of our references
  nullElements.forEach(nE => {
    nE.update(currentCycleFrame);
  });

  renderParticles(particlesBack);
  renderFan(fanBlades, nullElements);
  renderParticles(particlesFront);

  if (showPoints) {
    renderPoints();
  }

  if (showPath) {
    renderPath();
  }
}

const renderParticles = (particleList) => {
  particleList.forEach(par => {
    par.update();
    par.render();

    // if (par.currentFrame === par.lifespan) {
    //   const randIndex = getRandomIndex(fanBlades.length);
    //   const fb = fanBlades[randIndex];
    //   par.reset(fb.center, random(TWO_PI));
    // }
    if (par.isOutside()) {
      const randIndex = getRandomIndex(fanBlades.length);
      const fb = fanBlades[randIndex];
      const heading = fb.getHeading();
      par.reset(fb.center, heading);
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

const renderPath = () => {
  pts.forEach(pt => {
    noStroke();
    fill(255, 0, 0);
    circle(pt.x, pt.y, 3);
  });
};
