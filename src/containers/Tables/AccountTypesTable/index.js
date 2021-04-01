import React from "react";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../../css/styles.css";
import { useDispatch } from "react-redux";
import { deleteAccountType } from "../../../_redux/actions/accountTypes";
const AccountTypesTable = ({ aTypes }) => {
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
  const dispatch = useDispatch();
  const deleteNc = (NatureCode) => {
    dispatch(deleteAccountType(NatureCode));
  };
  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deleteNc(row.NatureCode)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" color="primary">
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      name: "Code Nature de Compte",
      selector: "NatureCode",
    },
    {
      name: "Libellé Nature de Compte",
      selector: "NatureAccountLabel",
    },
  ];

  const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        ref={ref}
        {...rest}
      />
      <label className="custom-control-label" onClick={onClick} />
    </div>
  ));
  return (
    <div>
      <div className="card">
        <DataTable
          title="Liste des natures de comptes"
          overflowY
          columns={columns}
          data={aTypes}
          pagination
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
      <div className={classes.root}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default AccountTypesTable;
