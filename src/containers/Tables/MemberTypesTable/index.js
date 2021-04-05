import React, { useState } from "react";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../../css/styles.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteMemberType } from "../../../_redux/actions/memberType";
import AddMemberType from "../../Modals/Sticodevam/AddMemberType";
import EditMemberType from "../../Modals/Sticodevam/EditMemberType";
const MemberTypesTable = ({ mTypes }) => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [id, setId] = useState();

  const openSelectedMemberTypeModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const dispatch = useDispatch();
  const deleteMtc = (id) => {
    dispatch(deleteMemberType(id));
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {row.id !== 1 ? (
            <div>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => deleteMtc(row.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => openSelectedMemberTypeModal(row.id)}>
                <EditIcon />
              </IconButton>
            </div>
          ) : (
            <div className="ml-4">-</div>
          )}
        </div>
      ),
    },
    {
      name: "Code Type Adhérent",
      selector: "MemberTypeCode",
    },
    {
      name: "Libellé Type Adhérent",
      cell: (row) => (
        <div>{row.MemberTypeLabel ? row.MemberTypeLabel : "-"}</div>
      ),
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
          title="Liste des types des adhérents"
          responsive
          overflowY
          overflowYOffset="150px"
          columns={columns}
          data={mTypes}
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
      <AddMemberType
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
      />
      <EditMemberType
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        id={id}
      />
    </>
  );
};

export default MemberTypesTable;
