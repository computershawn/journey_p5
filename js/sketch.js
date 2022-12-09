const numParticles = 320;

// Timing
const fps = 24;
const durationSec = 16;
const durationFrames = fps * durationSec;
let currentCycleFrame = 192;
let animationMode = 1;  // 0 = auto, 1 = scrub

// Collections of things
const pts = [];
const nullElements = [];
const particlesFront = [];
const particlesBack = [];
const fanBlades = [];

// Geometry
const radius = 108; // 48;
const numLoops = 200; // 160; // 200; // 160; // 60;
let balance = 0.5;
let diff = 4.5;

// Display of geometry and guides
let showFan = true;
let showPoints = false;
let showPath = false;
let showBezier = true;
let showParticles = false;

// Colors
let lavender, violet;

/*
// Canvas
PGraphics canv;

const values = [];

// Bezier Curve variables
const dragging;
const lastDragState = false;
const  mouseDX = 0;
const  mouseDY = 0;
BeziCurve b;
*/

function setup() {
  lavender = color(hexColors.lavender);
  violet = color(hexColors.violet);

  // Set up UI Controls
  const frameSlider = document.querySelector('#frame-number');
  const balanceSlider = document.querySelector('#balance');
  const diffSlider = document.querySelector('#diff');

  frameSlider.addEventListener('input', (e) => {
    const num = e.target.value;
    goToFrameNumber(num);
  });

  balanceSlider.addEventListener('input', (e) => {
    const num = e.target.value;
    balance = num / 100;
  });

  diffSlider.addEventListener('input', (e) => {
    diff = map(e.target.value, 0, 100, 1, 8);
  });

  buildSelectMenu();
  addSelectButtonActions(true);

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

  const showPathBtn = document.querySelector('#show-path');
  showPathBtn.addEventListener('click', () => {
    if (!showPath) {
      showPath = true;
      showPathBtn.innerHTML = "hide path";
    } else {
      showPath = false;
      showPathBtn.innerHTML = "show path";
    }
  });

  const saveCompBtn = document.querySelector('#save-comp');
  saveCompBtn.addEventListener('click', () => {
    animationMode = 1;
    saveComp();
    updateMenu(true);
    addSelectButtonActions(false);
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

  // Render particles behind the fan
  if (renderParticles) {
    renderParticles(particlesBack);
  }

  renderFan(fanBlades, nullElements);

  // Render particles in front of the fan
  if (renderParticles) {
    renderParticles(particlesFront);
  }

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

const setComp = (
  compParams,
  frameSlider,
  balanceSlider,
  diffSlider,
) => {
  if (animationMode === 1) {
    frameSlider.value = compParams.storedCycleFrame;
    currentCycleFrame = compParams.storedCycleFrame % durationFrames;
  }

  balanceSlider.value = compParams.storedBalance;
  balance = compParams.storedBalance / 100;

  diffSlider.value = compParams.storedDiff;
  diff = map(compParams.storedDiff, 0, 100, 1, 8);
};

const styleDropdown = (index) => {
  const options = document.querySelectorAll('#comp-select .item');
  options.forEach((option, i) => {
    if (index === i) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
}

const buildSelectMenu = () => {
  const comps = getAllComps();

  if (comps.length) {
    // Remove existing options from dropdown
    const compSelect = document.querySelector('#comp-select');
    while (compSelect.firstChild) {
      compSelect.removeChild(compSelect.firstChild);
    }

    // Add options to dropdown
    comps.forEach((_c, index) => {
      const option = document.createElement('div');
      option.classList.add('item');
      if (index === 0) {
        option.classList.add('active');
      }

      const btn1 = document.createElement('div');
      btn1.classList.add('load-btn');
      btn1.innerText = `comp ${index + 1}`;
      const btn2 = document.createElement('div');
      btn2.classList.add('remove');
      btn2.innerText = '✕';
      option.appendChild(btn1);
      option.appendChild(btn2);

      compSelect.appendChild(option);
    });
  }
}

const addSelectButtonActions = (isInitial = false, shouldSetComp = true) => {
  const comps = getAllComps();
  const container = document.querySelector('#dropdown-container');
  const selectElem = document.querySelector('.dropdown-content');
  const options = document.querySelectorAll('.dropdown-content .item');

  if (comps.length) {
    const selectedIndex = isInitial ? 0 : comps.length - 1;
    const params = getComp(comps[selectedIndex]);
    const frameSlider = document.querySelector('#frame-number');
    const balanceSlider = document.querySelector('#balance');
    const diffSlider = document.querySelector('#diff');

    if (shouldSetComp) {
      setComp(params, frameSlider, balanceSlider, diffSlider);
    }

    // options.forEach((opt, index) => {
    //   const loadBtn = opt.querySelector('.load-btn');
    //   const removeBtn = opt.querySelector('.remove');

    //   loadBtn.addEventListener('click', () => {
    //     const params = getComp(comps[index]);
    //     setComp(params, frameSlider, balanceSlider, diffSlider);
    //     styleDropdown(index);
    //   });

    //   removeBtn.addEventListener('click', () => {
    //     removeComp(comps[index].id);
    //     console.log('updating menu');
    //     updateMenu(false, index);
    //   });
    // });
    // console.log('container', container);
    comps.forEach((comp, index) => {
      const opt = selectElem.childNodes[index];
      const loadBtn = opt.querySelector('.load-btn');
      const removeBtn = opt.querySelector('.remove');

      loadBtn.addEventListener('click', () => {
        const params = getComp(comps[index]);
        setComp(params, frameSlider, balanceSlider, diffSlider);
        styleDropdown(index);
      });

      removeBtn.addEventListener('click', () => {
        console.log(comp.id);
        removeComp(comp.id);
        console.log('updating menu');
        updateMenu(false, index);
      });
    });
    container.style.display = 'inline-block';
  } else {
    container.style.display = 'none';
  }
}

const updateMenu = (saving = false, removeIndex = 0) => {
  const container = document.querySelector('.dropdown-content');
  const numItems = container.childNodes.length;

  if (saving) {
    const option = document.createElement('div');
    option.classList.add('item');
  
    const btn1 = document.createElement('div');
    btn1.classList.add('load-btn');
    btn1.innerText = `comp ${numItems + 1}`;
    const btn2 = document.createElement('div');
    btn2.classList.add('remove');
    btn2.innerText = '✕';
  
    option.appendChild(btn1);
    option.appendChild(btn2);
    container.appendChild(option);
    styleDropdown(numItems);
  } else {
    const itemToRemove = container.childNodes[removeIndex];
    container.removeChild(itemToRemove);

    // RE-NUMBER THE ITEMS IF REMOVING AN ITEM THAT IS NOT THE LAST ITEM
    if (removeIndex < numItems - 1) {
      // console.log('deleted non-last item');
      const btnElems = document.querySelectorAll('.dropdown-content .load-btn');
      btnElems.forEach((btn, index) => {
        btn.innerText = `comp ${index + 1}`;
      });
    }
  }
}