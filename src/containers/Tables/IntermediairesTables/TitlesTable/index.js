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
import { deleteTitle, getTitles } from "../../../../_redux/actions/titles";
import AddTitle from "../../../Modals/Intermediaire/AddTitle";
import EditTitle from "../../../Modals/Intermediaire/EditTitle";
const TitlesTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTitles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const titles = useSelector((state) => state.titles.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [id, setId] = useState();

  const openSelectedTitleModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const deleteTc = (id) => {
    dispatch(deleteTitle(id));
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deleteTc(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => openSelectedTitleModal(row.id)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      name: "Code Titre",
      selector: "TitleCode",
      sortable: true,
    },
    {
      name: "Libellé Titre",
      cell: (row) => <div>{row.TitleLabel ? row.TitleLabel : "-"}</div>,
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
          title="Codes Titre"
          responsive
          overflowY
          overflowYOffset="150px"
          columns={columns}
          data={titles}
          defaultSortField="Code Titre"
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
      <AddTitle show={addModalShow} onHide={() => setAddModalShow(false)} />
      <EditTitle
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        titles={titles}
        id={id}
      />
    </>
  );
};

export default TitlesTable;