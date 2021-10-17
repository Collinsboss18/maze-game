const pickActive = ({ arr, selected, round }) => {
  let middle;
  let arrCon = [...arr];

  function isEven(n) {
    return n % 2 == 0;
  }

  function getMiddle() {
    if (isEven(round)) {
      arrCon.push(arrCon.length + 1);
      middle = arrCon.splice(Math.floor((arrCon.length - 1) / 2), 1)[0] + Math.floor(round/2);
      if (selected.includes(middle)) {
        getMiddle();
      }
    } else {
      middle = arrCon.splice(Math.floor((arrCon.length - 1) / 2), 1)[0];
      if (selected.includes(middle)) {
        getMiddle();
      }
    }
  }
  getMiddle();
  return middle;
};

export default pickActive;
