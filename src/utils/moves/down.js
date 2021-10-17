const down = ({ current, boardBox, width }) => {
  console.log(current, boardBox.length);
  if (current < 0 || current + Number(width) >= boardBox.length) {
    return { dData: boardBox, dUpdated: false };
  } else {
    let dData = boardBox.map((e, i) => {
      if (e.props.active === true) {
        return { ...e, props: { ...e.props, active: false, selected: false } };
      } else if (i === current + Number(width)) {
        return { ...e, props: { ...e.props, active: true, selected: false } };
      } else {
        return e;
      }
    });
    return { dData, dUpdated: true };
  }
};

export default down;
