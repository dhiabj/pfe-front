import React, { useEffect } from "react";
import StocksDaySearchForm from "../../../containers/StocksDaySearchForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getStocks, resetStockTable } from "../../../_redux/actions/stocks";
import FullWidthTabs from "../../../components/StockTabs";
const StockPage = () => {
  useEffect(() => {
    return () => {
      dispatch(resetStockTable());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const search = {
    AccountingDate: "",
    StockExchangeDate: "",
    ValueCode: "",
    MembershipCode: "",
    NatureCode: "",
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStocks(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const stocks = useSelector((state) => state.stocks.data);
  const { showStocks } = useSelector((state) => state.stocks);

  return (
    <>
      <div className="card mb-3">
        <h5 className="card-header">
          <FontAwesomeIcon icon="search" className="mr-2" />
          Consulter l'historique STOCK par jour
        </h5>
        <div className="card-body">
          <StocksDaySearchForm />
        </div>
      </div>
      {showStocks && <FullWidthTabs stocks={stocks} />}
    </>
  );
};
export default StockPage;
