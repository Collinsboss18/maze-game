import React, { useCallback, useEffect, useState } from "react";

const Box = (props) => {
  const check = () => {
    if (props.active) {
      return <img src={"/img/active.png"} alt={"active sprite"} />;
    } else if (props.selected) {
      return <img src={"/img/selected.png"} alt={"active sprite"} />;
    }
  };

  return (
    <div
      id={props.idx}
      style={{ width: "40px", border: ".5px solid #b9b9b9" }}
      className={`bg-gray-50 h-10 p-1`}
      {...props}
    >
      {check()}
    </div>
  );
};

export default Box;
