
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

  settings = {
    balance: balanceValue,
    currentCycleFrame: frameValue,
    diff: diffValue,
  };

  comps.push(settings);

  window.localStorage.setItem('savedComps', JSON.stringify(comps));
};

// REMOVE COMPOSITION SETTINGS
const removeComp = (compIndex) => {
  const comps = getAllComps();
  const updatedComps = comps.filter((_item, index) => {
    return index !== compIndex;
  });

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
  // const compObj = compsList[index];
  const keys = Object.keys(compObj);
  const hasAllKeys = keys.every((item) => ['balance', 'currentCycleFrame', 'diff'].includes(item));

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

// Close the dropdown if the user clicks outside of it
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
