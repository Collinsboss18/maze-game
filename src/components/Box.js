import React, { useState } from "react";

const Box = ({ idx, active, selected }) => {
  const check = () => {
    if (active) {
      return <img src={"/img/active.png"} alt={"active sprite"} />;
    } else if (selected) {
      return <img src={"/img/selected.png"} alt={"active sprite"} />;
    }
  };

  return (
    <div
      id={idx}
      style={{ width: "40px", border: ".5px solid #b9b9b9" }}
      className={`bg-gray-50 h-10 p-1`}
    >
      {check()}
    </div>
  );
};

export default Box;
