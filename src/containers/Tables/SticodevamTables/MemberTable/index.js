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
import { deleteMember, getMembers } from "../../../../_redux/actions/member";
import AddMember from "../../../Modals/Sticodevam/AddMember";
import EditMember from "../../../Modals/Sticodevam/EditMember";
import { getMemberTypes } from "../../../../_redux/actions/memberType";
const MemberTable = () => {
  useEffect(() => {
    dispatch(getMembers());
    dispatch(getMemberTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useSelector((state) => state.member.data);
  const membertypes = useSelector((state) => state.memberType.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [id, setId] = useState();

  const openSelectedMemberModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const dispatch = useDispatch();
  const deleteMc = (id) => {
    dispatch(deleteMember(id));
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deleteMc(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => openSelectedMemberModal(row.id)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      name: "Code Adhérent",
      selector: "MembershipCode",
      sortable: true,
    },
    {
      name: "Nom Adhérent",
      cell: (row) => <div>{row.MemberName ? row.MemberName : "-"}</div>,
    },
    {
      name: "Type Adhérent",
      cell: (row) => (
        <div>{row.MemberType ? row.MemberType.memberTypeCode : "-"}</div>
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
      <AddMember
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        membertypes={membertypes}
      />
      <EditMember
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        membertypes={membertypes}
        members={data}
        id={id}
      />
    </>
  );
};

export default MemberTable;
