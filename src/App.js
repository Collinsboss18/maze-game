import "./App.css";
import React, { useEffect, useState } from "react";
import right from "./utils/moves/right";
import Box from "./components/Box";
import pickActive from "./utils/pickActive";
import pickSelected from "./utils/pickSelected";
import left from "./utils/moves/left";
import up from "./utils/moves/up";
import down from "./utils/moves/down";
import isGameOver from "./utils/isGameOver";

function App() {
  const [board, setBoard] = useState({});
  const [boardBox, setBoardBox] = useState([]);
  const [boardBoxW, setBoardBoxW] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState(null);
  const [steps, setSteps] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let width = prompt("Enter board width");
    let height = prompt("Enter board height");
    // width = Number(width);
    // height = Number(height);

    if (
      isNaN(width) === true ||
      isNaN(height) === true ||
      height > 70 ||
      width > 70
    ) {
      height = 10;
      width = 10;
    }

    const { selected, shuffled } = pickSelected({
      arr: Array.from({ length: height * width }, (_, i) => i + 1),
      round: Math.floor((Number(width) + Number(height)) / 2),
    });
    const activeBox = pickActive({
      arr: Array.from({ length: height * width }, (_, i) => i + 1),
      round: Math.floor((Number(width) + Number(height)) / 2),
    });

    setSteps(0);
    setShuffled(shuffled);
    setBoard({ board: height * width, width, height });
    setSelected(selected);
    setActive(activeBox);
  }, []);

  useEffect(() => {
    const onKeyDown = ({ key }) => {};

    const onKeyUp = ({ key }) => {
      switch (key) {
        case "ArrowUp":
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board.board, active, selected, active]);

  useEffect(() => {
    setGameOver(isGameOver({ boardBox: boardBoxW }));
  }, [boardBox, boardBoxW]);

  useEffect(() => {
    if (!gameOver) {
      setSteps(steps + 1);
    }
  }, [boardBoxW]);

  const createBoard = ({ board }) => {
    setBoardBox(
      shuffled.map((e, i) => {
        if (i + 1 === active) {
          return <Box key={i} idx={i} active={true} />;
        } else if (selected.includes(shuffled[i])) {
          return <Box key={i} idx={i} selected={true} />;
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
          className={"mx-auto h-max mb-10"}
        >
          <div className={`grid grid-cols-${board?.width} 5mb-2`}>
            {boardBoxW.length > 0
              ? boardBoxW.map((e, i) => e)
              : boardBox.map((e, i) => e)}
          </div>
        </div>
        <div className={"text-center text-xl font-mono mb-10"}>
          <h3>Steps Taken: {steps}</h3>
          {gameOver && (
            <div>
              <h1 className={"text-3xl text-yellow-500"}>Congratulation</h1>
              <p className={"text-lg text-green-500"}>Game Over</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
