import React, { useEffect, useState } from "react";
import "./App.css";
import Box from "./components/Box";
import pickActive from "./utils/pickActive";
import pickSelected from "./utils/pickSelected";

function App() {
  const [board, setBoard] = useState({});
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let width = prompt("Enter board height");
    let height = prompt("Enter board width");
    let selected = pickSelected({
      arr: Array.from({ length: height * width }, (_, i) => i + 1),
      round: Math.floor((Number(width) + Number(height)) / 2),
    });

    if (
      isNaN(width) === true ||
      isNaN(height) === true ||
      height > 50 ||
      width > 50
    ) {
      height = 10;
      width = 10;
    }

    setBoard({ board: height * width, width, height });
    setSelected(selected);
    setActive(
      pickActive({
        arr: Array.from({ length: height * width }, (_, i) => i + 1),
        round: Math.floor((Number(width) + Number(height)) / 2),
        selected,
      })
    );
  }, []);

  const createBoard = ({ width, height, board }) => {
    return (
      <div className={`grid grid-cols-${width} 5mb-2`}>
        {Array.from({ length: board }, (_, i) => i + 1).map((e, i) => {
          if (selected.includes(i + 1)) {
            return <Box idx={i} selected={true} />;
          } else if (i + 1 == active) {
            return <Box idx={i} active={true} />;
          } else {
            return <Box idx={i} />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="App">
      <h1
        className={
          "text-center text-3xl text-green-500 font-mono my-10 font-semibold"
        }
      >
        Welcome to the Maze Game
      </h1>
      <div className="flex flex-col justify-center container mx-auto">
        <div
          style={{ width: `${40 * board?.width}px` }}
          className={"mx-auto h-max"}
        >
          {createBoard({ ...board })}
        </div>
      </div>
    </div>
  );
}

export default App;
