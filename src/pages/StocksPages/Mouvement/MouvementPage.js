import React, { useEffect } from "react";
import StockSearchForm from "../../../containers/StockSearchForm";
import moment from "moment";
import MouvementTable from "../../../containers/Tables/MouvementTable";
import { useDispatch, useSelector } from "react-redux";
import { getMouvements } from "../../../_redux/actions/mouvements";
const StocksPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.token;
  const mouvements = useSelector((state) => state.mouvements.data);
  useEffect(() => {
    if (!token) return;
    dispatch(getMouvements());
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
      <MouvementTable mouvements={mouvements} />
    </div>
  );
};
export default StocksPage;
