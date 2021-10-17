import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import right from "./utils/moves/right";
import Box from "./components/Box";
import pickActive from "./utils/pickActive";
import pickSelected from "./utils/pickSelected";
import left from "./utils/moves/left";
import up from "./utils/moves/up";
import down from "./utils/moves/down";

function App() {
  const [board, setBoard] = useState({});
  const [boardBox, setBoardBox] = useState([]);
  const [boardBoxW, setBoardBoxW] = useState([]);
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState(null);
  const [selectedB, setSelectedB] = useState(false);
  const [activeB, setActiveB] = useState(false);

  useEffect(() => {
    let width = prompt("Enter board width");
    let height = prompt("Enter board height");
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

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      // console.log(key, "KEY");
    };

    const onKeyUp = ({ key }) => {
      switch (key) {
        case "ArrowUp":
          console.log("ArrowUp", active, board.width);
          let { uData, uUpdated } = up({
            current: active - 1,
            boardBox: boardBoxW.length > 0 ? boardBoxW : boardBox,
            width: board?.width,
          });
          if (uUpdated) {
            setBoardBox([...uData]);
            setBoardBoxW([...uData]);
            setActive(active - Number(board?.width));
          }
          break;
        case "ArrowDown":
          console.log("ArrowDown");
          let { dData, dUpdated } = down({
            current: active - 1,
            boardBox: boardBoxW.length > 0 ? boardBoxW : boardBox,
            width: board?.width,
          });
          if (dUpdated) {
            setBoardBox([...dData]);
            setBoardBoxW([...dData]);
            setActive(active + Number(board?.width));
          }
          break;
        case "ArrowRight":
          console.log("ArrowRight");
          let { rData, rUpdated } = right({
            current: active - 1,
            boardBox: boardBoxW.length > 0 ? boardBoxW : boardBox,
          });
          if (rUpdated) {
            setBoardBox([...rData]);
            setBoardBoxW([...rData]);
            setActive(active + 1);
          }
          break;
        case "ArrowLeft":
          console.log("ArrowLeft");
          let { lData, lUpdated } = left({
            current: active - 1,
            boardBox: boardBoxW.length > 0 ? boardBoxW : boardBox,
          });
          if (lUpdated) {
            setBoardBox([...lData]);
            setBoardBoxW([...lData]);
            setActive(active - 1);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, setBoard, boardBox, setBoardBox]);

  useEffect(() => {
    if (selected.length > 0 && active !== null && board.board !== undefined) {
      createBoard({ board: board?.board });
    }
  }, [board.board, active, selected, active, selectedB, activeB]);

  const createBoard = ({ board }) => {
    setBoardBox(
      Array.from({ length: board }, (_, i) => i + 1).map((e, i) => {
        if (i + 1 === active) {
          return <Box key={i} idx={i} active={!activeB} />;
        } else if (selected.includes(i + 1)) {
          return <Box key={i} idx={i} selected={!selectedB} />;
        } else {
          return <Box key={i} idx={i} />;
        }
      })
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
          className={"mx-auto h-max mb-20"}
        >
          <div className={`grid grid-cols-${board?.width} 5mb-2`}>
            {boardBoxW.length > 0
              ? boardBoxW.map((e, i) => e)
              : boardBox.map((e, i) => e)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
