import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../../../css/styles.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOperation,
  getOperations,
} from "../../../../_redux/actions/operationCode";
import AddOperation from "../../../Modals/Sticodevam/AddOperation";
import EditOperation from "../../../Modals/Sticodevam/EditOperation";
const OperationTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOperations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const operations = useSelector((state) => state.operationCode.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [id, setId] = useState();

  const openSelectedOperationModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const deleteOc = (id) => {
    dispatch(deleteOperation(id));
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deleteOc(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => openSelectedOperationModal(row.id)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      name: "Code Opération",
      selector: "OperationCode",
    },
    {
      name: "Libellé Opération",
      cell: (row) => <div>{row.OperationLabel ? row.OperationLabel : "-"}</div>,
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

  return (
    <>
      <div className="card">
        <DataTable
          title="Liste des codes opérations"
          responsive
          overflowY
          overflowYOffset="150px"
          columns={columns}
          data={operations}
          pagination
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
      <div className="add-button">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setAddModalShow(true)}>
          <AddIcon />
        </Fab>
      </div>
      <AddOperation show={addModalShow} onHide={() => setAddModalShow(false)} />
      <EditOperation
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        operations={operations}
        id={id}
      />
    </>
  );
};

export default OperationTable;
