const pickSelected = ({ arr, round }) => {
  let resArr = [];

  let createRes = () => {
    Array.from({ length: round }, (_, i) => i + 1).map(() => {
      let randomIndex = arr[Math.floor(Math.random() * arr.length)];
      if (resArr.includes(randomIndex)) {
        round++;
      } else {
        resArr.push(randomIndex);

        if (resArr.length >= round) {
          return resArr;
        }
      }
    });
  };

  createRes();
  return resArr;
};

export default pickSelected;
