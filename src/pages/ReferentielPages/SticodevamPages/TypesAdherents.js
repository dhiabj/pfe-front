import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberTypesTable from "../../../containers/Tables/MemberTypesTable";
import { getMemberTypes } from "../../../_redux/actions/memberType";

const TypesAdherents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMemberTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const mTypes = useSelector((state) => state.memberType.data);
  return (
    <div>
      <MemberTypesTable mTypes={mTypes} />
    </div>
  );
};

export default TypesAdherents;
