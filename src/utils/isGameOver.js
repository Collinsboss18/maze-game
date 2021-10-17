const isGameOver = ({ boardBox }) => {
    if (boardBox.length > 0) {
        let arr = [];
        boardBox.map((e, i) => {
          if (e.props.selected === true) {
            arr.push(i);
          }
        });
      
        if (arr.length > 0) return false;
        else return true;
    }
    return false
};

export default isGameOver;
