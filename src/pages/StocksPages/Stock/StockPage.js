import React, { useEffect } from "react";
import StockSearchForm from "../../../containers/StockSearchForm";
import moment from "moment";
import StockTable from "../../../containers/Tables/StockTable";
import { useDispatch, useSelector } from "react-redux";
import { getStocks } from "../../../_redux/actions/stocks";
const StockPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.token;
  const stocks = useSelector((state) => state.stocks.data);
  useEffect(() => {
    if (!token) return;
    dispatch(getStocks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onSubmit = (values) => {
    console.log({
      ...values,
      stock_exchange_date: moment(values.stock_exchange_date).format(
        "YYYY-MM-DD"
      ),
      accounting_date: moment(values.accounting_date).format("YYYY-MM-DD"),
    });
  };
  return (
    <div>
      <StockSearchForm onSubmit={onSubmit} />
      <StockTable stocks={stocks} />
    </div>
  );
};
export default StockPage;
