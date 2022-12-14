
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
const getArcPoints = (arcAngle, numPoints, r) => {
  const temp = [];
  for (let i = 0; i < numPoints; i++) {
    const a = 2 * i / numPoints * arcAngle - arcAngle - Math.PI / 2;
    const x = r * Math.cos(a);
    const y = r * Math.sin(a) + r;
    const vec = createVector(cX + x, cY + y);
    temp.push(vec);
  }

  return temp;
}

// GET RANDOM INDEX OF ITEM IN ARRAY
const getRandomIndex = (len) => {
  return floor(random(len));
};

// JUMP TO A SPECIFIC FRAME NUMBER IN THE UNFURLY ANIMATION
const goToFrameNumber = (frameNum) => {
  if (animationMode === 1) {
    currentCycleFrame = frameNum % durationFrames;
  }
}

// SAVE SETTINGS OF CURRENT COMPOSITION
const saveComp = () => {
  const comps = getAllComps();
  
  const diffValue = document.querySelector('#diff').value;
  const balanceValue = document.querySelector('#balance').value;
  const frameValue = document.querySelector('#frame-number').value;

  const curveSetPoints = {
    pt1: {x: bezi.cs.anchor11.c.x, y: bezi.cs.anchor11.c.y},
    pt2: {x: bezi.cs.anchor12.c.x, y: bezi.cs.anchor12.c.y},
    pt3: {x: bezi.cs.anchor22.c.x, y: bezi.cs.anchor22.c.y},
    pt4: {x: bezi.cs.ctrl11.c.x, y: bezi.cs.ctrl11.c.y},
    pt5: {x: bezi.cs.ctrl12.c.x, y: bezi.cs.ctrl12.c.y},
    pt6: {x: bezi.cs.ctrl22.c.x, y: bezi.cs.ctrl22.c.y},
  };

  settings = {
    id: uniqueID(),
    balance: balanceValue,
    currentCycleFrame: frameValue,
    diff: diffValue,
    curveSetPoints,
  };

  comps.push(settings);
  window.localStorage.setItem('savedComps', JSON.stringify(comps));

  return comps.length;
};

// REMOVE COMPOSITION SETTINGS
const removeComp = (compID) => {
  const comps = getAllComps();
  const updatedComps = comps.filter((item) => item.id !== compID);

  window.localStorage.setItem('savedComps', JSON.stringify(updatedComps));
};

const getAllComps = () => {
  let savedComps = window.localStorage.getItem('savedComps');

  if (!savedComps) {
    return [];
  }

  return JSON.parse(savedComps);
}

const getComp = (compObj) => {
  const keys = Object.keys(compObj);
  const hasAllKeys = ['balance', 'currentCycleFrame', 'diff', 'id'].every((item) => keys.includes(item));

  if (hasAllKeys) {
    return {
      storedBalance: compObj.balance,
      storedCycleFrame: compObj.currentCycleFrame,
      storedDiff: compObj.diff,
    };
  }

  return {};
}

// DROPDOWN
const toggleDropdown = () => {
  document.getElementById("comp-select").classList.toggle("show");
}

// CLOSE THE DROPDOWN IF THE USER CLICKS OUTSIDE OF IT
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// CREATE UNIQUE ID
const uniqueID = () => {
  const chars = '0123456789abcdef';
  const len = chars.length;
  let id = '';
  for (let i = 0; i < 8; i++) {
    const i = getRandomIndex(len);
    const c = chars[i];
    id += c;
  }

  return id;
};
