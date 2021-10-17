const right = ({ current, boardBox }) => {
  if (current < 0 || current + 1 >= boardBox.length) {
    return { rData: boardBox, rUpdated: false };
  } else {
    let rData = boardBox.map((e, i) => {
      if (e.props.active === true) {
        return { ...e, props: { ...e.props, active: false, selected: false } };
      } else if (i === current + 1) {
        return { ...e, props: { ...e.props, active: true, selected: false } };
      } else {
        return e;
      }
    });
    return { rData, rUpdated: true };
  }
};

export default right;
