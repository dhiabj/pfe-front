import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StockUploadTable from "../../../containers/Tables/StockUploadTable";
import { getStockUploads } from "../../../_redux/actions/stocks";

const RenseignementStock = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStockUploads());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const stockUploads = useSelector((state) => state.stocks.uploads);
  return (
    <div>
      <StockUploadTable stockUploads={stockUploads} />
    </div>
  );
};

export default RenseignementStock;
