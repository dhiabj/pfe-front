import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../../../css/styles.css";
import moment from "moment";
import NoData from "../../../../components/NoData";
import DeleteStockFile from "../../../Modals/Sticodevam/DeleteStockFile";
const StockUploadTable = ({ data }) => {
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [id, setId] = useState();

  const openSelectedDeleteModal = (id) => {
    setDeleteModalShow(true);
    setId(id);
  };

  const columns = [
    {
      name: "Supprimer",
      cell: (row) => (
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => openSelectedDeleteModal(row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      name: "Fichier Stock",
      selector: "FileName",
      minWidth: "150px",
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
      name: "Remarque / Motif de rejet",
      selector: "",
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
            noDataComponent={<NoData />}
          />
        </DataTableExtensions>
      </div>
      <DeleteStockFile
        show={deleteModalShow}
        handleClose={() => setDeleteModalShow(false)}
        id={id}
      />
    </>
  );
};

export default StockUploadTable;
