import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { resetStockTable } from "../../../_redux/actions/stocks";
import PeriodFullWidthTabs from "../../../components/PeriodStockTabs";
import StocksPeriodSearchForm from "../../../containers/StocksPeriodSearchForm";

const PeriodStockPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetStockTable());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stocks = useSelector((state) => state.stocks.data);
  const { showStocks } = useSelector((state) => state.stocks);

  return (
    <>
      <div className="card mb-3">
        <h5 className="card-header">
          <FontAwesomeIcon icon="search" className="mr-2" />
          Consulter l'historique STOCK par periode
        </h5>
        <div className="card-body">
          <StocksPeriodSearchForm />
        </div>
      </div>
      {showStocks && <PeriodFullWidthTabs stocks={stocks} />}
    </>
  );
};
export default PeriodStockPage;
