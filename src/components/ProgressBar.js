import React from "react";

const ProgressBar = ({ max, current }) => {
  const width = (current / max) * 100;
  return (
    <div>
      <div id="progressBar">
        <div id="progressBarFull" style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
