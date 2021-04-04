import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountTypesTable from "../../../containers/Tables/AccountTypesTable";
import { getAccountTypes } from "../../../_redux/actions/accountTypes";

const NaturesComptes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const aTypes = useSelector((state) => state.accountTypes.data);
  return (
    <div>
      <AccountTypesTable aTypes={aTypes} />
    </div>
  );
};

export default NaturesComptes;
