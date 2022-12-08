// const buildDropdown = () => {
//   const comps = getComps();
//   if (comps.length) {
//     const compSelect = document.querySelector('#comp-select');
//     comps.forEach((c, index) => {
//       const option = document.createElement('div');
//       option.classList.add('item');
//       option.innerText = `comp ${index + 1}`;
//       option.addEventListener('click', () => selectComp(c));
//       compSelect.appendChild(option);
//     });

//     document.querySelector('#dropdown-container').style.display = 'inline-block';
//   }
// }

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

// const selectComp = (compParams) => {
//   // console.log('comp data', item);
//   // const compParams = getComp(allComps, index);
//   // console.log('compParams', compParams);

//   if (animationMode === 1) {
//     frameSlider.value = compParams.storedCycleFrame;
//     currentCycleFrame = compParams.storedCycleFrame;
//   }

//   balanceSlider.value = compParams.storedBalance;
//   balance = compParams.storedBalance / 100;

//   diffSlider.value = compParams.storedDiff;
//   diff = map(compParams.storedDiff, 0, 100, 1, 8);
// }

// buildDropdown();