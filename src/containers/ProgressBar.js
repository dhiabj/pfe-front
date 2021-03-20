import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const { uploadPercentage } = useSelector((state) => state.fileUpload);
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        style={{ width: `${uploadPercentage}%` }}>
        {uploadPercentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
