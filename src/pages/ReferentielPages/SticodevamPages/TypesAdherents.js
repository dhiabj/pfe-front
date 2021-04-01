import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberTypesTable from "../../../containers/Tables/MemberTypesTable";
import { getMemberTypes } from "../../../_redux/actions/memberType";

const TypesAdherents = () => {
  const dispatch = useDispatch();
  const token = localStorage.token;
  useEffect(() => {
    if (!token) return;
    dispatch(getMemberTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const mTypes = useSelector((state) => state.memberType.data);
  return (
    <div>
      <MemberTypesTable mTypes={mTypes} />
    </div>
  );
};

export default TypesAdherents;
