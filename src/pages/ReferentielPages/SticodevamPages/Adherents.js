import { Fab, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import AddMember from "../../../containers/Modals/Sticodevam/AddMember";
import MemberTable from "../../../containers/Tables/MemberTable";
import { getMembers } from "../../../_redux/actions/member";
import { getMemberTypes } from "../../../_redux/actions/memberType";

const Adherents = () => {
  const dispatch = useDispatch();
  const token = localStorage.token;
  useEffect(() => {
    if (!token) return;
    dispatch(getMembers());
    dispatch(getMemberTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const members = useSelector((state) => state.member.data);
  const memberTypes = useSelector((state) => state.memberType.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        position: "absolute",
        top: theme.spacing(62),
        right: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <MemberTable members={members} memberTypes={memberTypes} />
      <div className={classes.root}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setAddModalShow(true)}>
          <AddIcon />
        </Fab>
      </div>
      <AddMember
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        mTypes={memberTypes}
      />
    </div>
  );
};

export default Adherents;
