import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SortIcon from "@material-ui/icons/ArrowDownward";
import "../../../../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getAccountTypes } from "../../../../_redux/actions/accountTypes";
import AddAccountType from "../../../Modals/Sticodevam/AddAccountType";
import EditAccountType from "../../../Modals/Sticodevam/EditAccountType";
import DeleteAccType from "../../../Modals/Sticodevam/DeleteAccType";
import NoData from "../../../../components/NoData";

const AccountTypesTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => state.accountTypes.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const [id, setId] = useState();

  const openSelectedAccountTypeModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const openSelectedDeleteAccTypeModal = (id) => {
    setDeleteModalShow(true);
    setId(id);
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => openSelectedDeleteAccTypeModal(row.id)}>
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

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div className="card">
        <DataTableExtensions
          {...tableData}
          print={false}
          filterPlaceholder="Rechercher">
          <DataTable
            noHeader
            responsive
            overflowY
            columns={columns}
            data={data}
            defaultSortField="id"
            pagination
            highlightOnHover
            selectableRows
            selectableRowsComponent={BootyCheckbox}
            sortIcon={<SortIcon />}
            noDataComponent={<NoData />}
          />
        </DataTableExtensions>
      </div>
      <div className="add-button">
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
        atypes={data}
        id={id}
      />
      <DeleteAccType
        show={deleteModalShow}
        handleClose={() => setDeleteModalShow(false)}
        id={id}
      />
    </>
  );
};

export default AccountTypesTable;
