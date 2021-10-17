const pickSelected = ({ arr, round }) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  const selected = Array.from({ length: round }, (_, i) => i + 1);

  return { selected, shuffled };
};

export default pickSelected;
