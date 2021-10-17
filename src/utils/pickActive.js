const pickActive = ({ arr, round }) => {
  let middle;

  function isEven(n) {
    return n % 2 === 0;
  }

  if (isEven(arr.length)) {
    middle = arr[Math.round((arr.length - 1) / 2)] - Math.floor(round / 2);
  } else {
    middle = arr[Math.round((arr.length - 1) / 2)];
  }
  return middle;
};

export default pickActive;
