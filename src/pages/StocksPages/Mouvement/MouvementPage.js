import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MouvementTable from "../../../containers/Tables/SticodevamTables/MouvementTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getMouvements,
  getMouvementSum,
  resetMouvementTable,
} from "../../../_redux/actions/mouvements";
import PeriodSearchForm from "../../../containers/PeriodSearchForm";
import MouvementSumTable from "../../../containers/Tables/SticodevamTables/MouvementSumTable";
const MouvementPage = () => {
  const search = {
    ValueCode: "",
    OperationCode: "",
    StockExchangeDate: "",
    AccountingDate: "",
  };
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetMouvementTable());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getMouvements(search));
    dispatch(getMouvementSum(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const mouvements = useSelector((state) => state.mouvements.data);
  const mouvementSum = useSelector((state) => state.mouvements.sum);
  const { show } = useSelector((state) => state.mouvements);
  //let combinedData = [mouvements, mouvementSum];
  //console.log(combinedData);
  return (
    <div>
      <div className="card mb-3">
        <h5 className="card-header">
          <FontAwesomeIcon icon="search" className="mr-2" />
          Consulter l'historique Mouvement
        </h5>
        <div className="card-body">
          <PeriodSearchForm />
        </div>
      </div>
      {show && (
        <>
          <MouvementTable data={mouvements} />
          <MouvementSumTable mouvementSum={mouvementSum} />
        </>
      )}
    </div>
  );
};
export default MouvementPage;
