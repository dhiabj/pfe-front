import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../../../css/styles.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReglement,
  getReglements,
} from "../../../../_redux/actions/reglement";
import AddReglement from "../../../Modals/Intermediaire/AddReglement";
import EditReglement from "../../../Modals/Intermediaire/EditReglement";
const ReglementsTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReglements());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => state.reglement.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [id, setId] = useState();

  const openSelectedReglementModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const deleteRc = (id) => {
    dispatch(deleteReglement(id));
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deleteRc(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => openSelectedReglementModal(row.id)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      name: "Code Réglement",
      selector: "ReglementCode",
      sortable: true,
    },
    {
      name: "Libellé Profit",
      cell: (row) => <div>{row.ReglementLabel ? row.ReglementLabel : "-"}</div>,
    },
    {
      name: "Date de mise à jour",
      cell: (row) => (
        <div>
          {row.UpdateDate ? moment(row.UpdateDate).format("YYYY-MM-DD") : "-"}
        </div>
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
        <DataTableExtensions {...tableData} print={false}>
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
      <AddReglement show={addModalShow} onHide={() => setAddModalShow(false)} />
      <EditReglement
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        reglements={data}
        id={id}
      />
    </>
  );
};

export default ReglementsTable;
