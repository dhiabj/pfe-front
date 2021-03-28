import React, { useEffect } from "react";
import DaySearchForm from "../../../containers/DaySearchForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import MouvementTable from "../../../containers/Tables/MouvementTable";
import { useDispatch, useSelector } from "react-redux";
import { getMouvements } from "../../../_redux/actions/mouvements";
const StocksPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.token;
  const mouvements = useSelector((state) => state.mouvements.data);
  const search = {
    code_valeur: "",
    code_adherent: "",
    nature_compte: "",
    stock_exchange_date: "",
    accounting_date: "",
  };
  useEffect(() => {
    if (!token) return;
    dispatch(getMouvements(search));
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
    console.log(search);
    dispatch(getMouvements(search));
  };
  return (
    <div>
      <div className="card mb-3">
        <h5 className="card-header">
          <FontAwesomeIcon icon="search" className="mr-2" />
          Consulter l'historique Mouvement par jour
        </h5>
        <div className="card-body">
          <DaySearchForm onSubmit={onSubmit} />
        </div>
      </div>

      <MouvementTable mouvements={mouvements} />
    </div>
  );
};
export default StocksPage;
