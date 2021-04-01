import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountTypesTable from "../../../containers/Tables/AccountTypesTable";
import { getAccountTypes } from "../../../_redux/actions/accountTypes";

const NaturesComptes = () => {
  const dispatch = useDispatch();
  const token = localStorage.token;
  useEffect(() => {
    if (!token) return;
    dispatch(getAccountTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const aTypes = useSelector((state) => state.accountTypes.data);
  return (
    <div>
      <AccountTypesTable aTypes={aTypes} />
    </div>
  );
};

export default NaturesComptes;
