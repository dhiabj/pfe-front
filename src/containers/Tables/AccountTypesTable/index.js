import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccountType,
  getAccountTypes,
} from "../../../_redux/actions/accountTypes";
import AddAccountType from "../../Modals/Sticodevam/AddAccountType";
import EditAccountType from "../../Modals/Sticodevam/EditAccountType";
const AccountTypesTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const aTypes = useSelector((state) => state.accountTypes.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [id, setId] = useState();

  const openSelectedAccountTypeModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const deleteNc = (id) => {
    dispatch(deleteAccountType(id));
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deleteNc(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => openSelectedAccountTypeModal(row.id)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      name: "Code Nature de Compte",
      selector: "NatureCode",
      sortable: true,
    },
    {
      name: "Libellé Nature de Compte",
      cell: (row) => (
        <div>{row.NatureAccountLabel ? row.NatureAccountLabel : "-"}</div>
      ),
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

  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  return (
    <>
      <div className="card">
        <DataTable
          title="Liste des natures de comptes"
          responsive
          overflowY
          overflowYOffset="150px"
          columns={columns}
          data={aTypes}
          defaultSortField="Code Nature de Compte"
          pagination
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
      <div style={style}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setAddModalShow(true)}>
          <AddIcon />
        </Fab>
      </div>
      <AddAccountType
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
      />
      <EditAccountType
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        aTypes={aTypes}
        id={id}
      />
    </>
  );
};

export default AccountTypesTable;
