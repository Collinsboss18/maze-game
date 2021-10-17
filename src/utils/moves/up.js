const up = ({ current, boardBox, width }) => {
  if (current < 0 || current - Number(width) < 0) {
    return { uData: boardBox, uUpdated: false };
  } else {
    let uData = boardBox.map((e, i) => {
      if (e.props.active === true) {
        return { ...e, props: { ...e.props, active: false, selected: false } };
      } else if (i === current - Number(width)) {
        return { ...e, props: { ...e.props, active: true, selected: false } };
      } else {
        return e;
      }
    });
    return { uData, uUpdated: true };
  }
};

export default up;
