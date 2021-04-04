import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MvtUploadTable from "../../../containers/Tables/MvtUploadTable";
import { getMvtUploads } from "../../../_redux/actions/mouvements";

const RenseignementMvt = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMvtUploads());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const mvtUploads = useSelector((state) => state.mouvements.uploads);
  return (
    <div>
      <MvtUploadTable mvtUploads={mvtUploads} />
    </div>
  );
};

export default RenseignementMvt;
