const renderFan = (fanBladesArr, nullRefs) => {
  // Draw our lines based on the updated references
  for (let j = 0; j < nullRefs.length - 1; j++) {
    const thisRef = nullRefs[j];
    const nextRef = nullRefs[j + 1];

    const px0 = thisRef.point0.x + thisRef.x;
    const py0 = thisRef.point0.y + thisRef.y;
    const px1 = thisRef.point1.x + thisRef.x;
    const py1 = thisRef.point1.y + thisRef.y;
    const px2 = nextRef.point1.x + nextRef.x;
    const py2 = nextRef.point1.y + nextRef.y;
    const px3 = nextRef.point0.x + nextRef.x;
    const py3 = nextRef.point0.y + nextRef.y;

    stroke(0, 63);
    // const co = color(lerpColor(color(239), white, values[i]), 223);
    // const co = color(255, 239);
    const fb = fanBladesArr[j];
    const pv0 = {x: px0, y: py0};
    const pv1 = {x: px1, y: py1};
    const pv2 = {x: px2, y: py2};
    const pv3 = {x: px3, y: py3};
    
    fb.update(pv0, pv2);
    fb.render(pv0, pv1, pv2, pv3, color(239));
    // noLoop();
  }
};
