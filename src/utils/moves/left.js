const left = ({ current, boardBox }) => {
  if (current < 0 || current - 1 < 0) {
    return { lData: boardBox, lUpdated: false };
  } else {
    let lData = boardBox.map((e, i) => {
      if (e.props.active === true) {
        return { ...e, props: { ...e.props, active: false, selected: false } };
      } else if (i === current - 1) {
        return { ...e, props: { ...e.props, active: true, selected: false } };
      } else {
        return e;
      }
    });
    return { lData, lUpdated: true };
  }
};

export default left;
