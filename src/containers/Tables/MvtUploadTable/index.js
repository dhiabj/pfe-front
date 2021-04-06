import React from "react";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../../css/styles.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteMvtUploads } from "../../../_redux/actions/mouvements";
const MvtUploadTable = ({ mvtUploads }) => {
  const dispatch = useDispatch();
  const deleteMvt = (id) => {
    dispatch(deleteMvtUploads(id));
  };
  const columns = [
    {
      name: "Supprimer",
      cell: (row) => (
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => deleteMvt(row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      name: "Fichier Mouvement ",
      selector: "FileName",
    },
    {
      name: "Date de chargement ",
      cell: (row) => <div>{moment(row.UploadDate).format("YYYY-MM-DD")}</div>,
    },
    {
      name: "Heure de chargement",
      cell: (row) => <div>{moment(row.UploadDate).format("HH:mm:ss")}</div>,
    },
    {
      name: "Date Bourse",
      cell: (row) => (
        <div>{moment(row.StockExchangeDate).format("YYYY-MM-DD")}</div>
      ),
    },
    {
      name: "Etat de fichier",
      selector: "StateFile",
    },
    {
      name: "Nombre de lignes",
      selector: "NbLines",
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
          title="Renseignements sur les chargements de données MOUVEMENT"
          responsive
          overflowY
          overflowYOffset="150px"
          columns={columns}
          data={mvtUploads}
          pagination
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
    </div>
  );
};

export default MvtUploadTable;
