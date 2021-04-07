import React, { useEffect } from "react";
import DaySearchForm from "../../../containers/DaySearchForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import StockTable from "../../../containers/Tables/SticodevamTables/StockTable";
import { useDispatch, useSelector } from "react-redux";
import { getStocks } from "../../../_redux/actions/stocks";
const StockPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.token;
  const stocks = useSelector((state) => state.stocks.data);
  const search = {
    code_valeur: "",
    code_adherent: "",
    nature_compte: "",
    stock_exchange_date: "",
    accounting_date: "",
  };
  useEffect(() => {
    if (!token) return;
    dispatch(getStocks(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onSubmit = (values) => {
    const search = {
      ...values,
      stock_exchange_date: values.stock_exchange_date
        ? moment(values.stock_exchange_date).format("YYYY-MM-DD")
        : "",
      accounting_date: values.accounting_date
        ? moment(values.accounting_date).format("YYYY-MM-DD")
        : "",
    };
    dispatch(getStocks(search));
  };
  return (
    <div>
      <div className="card mb-3">
        <h5 className="card-header">
          <FontAwesomeIcon icon="search" className="mr-2" />
          Consulter l'historique STOCK par jour
        </h5>
        <div className="card-body">
          <DaySearchForm onSubmit={onSubmit} />
        </div>
      </div>

      <StockTable stocks={stocks} />
    </div>
  );
};
export default StockPage;
