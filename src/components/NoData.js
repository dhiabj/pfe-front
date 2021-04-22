import React from "react";
import NoDataFound from "../NoDataFound.png";
const NoData = () => {
  return (
    <div>
      <img
        src={NoDataFound}
        alt="no-data-found"
        className="img-fluid img-center"
      />
    </div>
  );
};

export default NoData;
