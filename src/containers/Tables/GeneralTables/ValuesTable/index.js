import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../../../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getValues } from "../../../../_redux/actions/values";
import AddValue from "../../../Modals/GeneralRef/AddValue";
import EditValue from "../../../Modals/GeneralRef/EditValue";
import DeleteValue from "../../../Modals/GeneralRef/DeleteValue";
import NoData from "../../../../components/NoData";
import TableProgress from "../../../../components/TableProgress";

const ValuesTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => state.values.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const [id, setId] = useState();

  const openSelectedValueModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const openSelectedDeleteValueModal = (id) => {
    setDeleteModalShow(true);
    setId(id);
  };

  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => openSelectedDeleteValueModal(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => openSelectedValueModal(row.id)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
      compact: true,
    },
    {
      name: "Code STICODEVAM",
      selector: "Isin",
      sortable: true,
    },
    {
      name: "Libellé de la valeur",
      cell: (row) => <div>{row.ValueLabel ? row.ValueLabel : "-"}</div>,
    },
    {
      name: "Mnémonique",
      cell: (row) => <div>{row.Mnemonique ? row.Mnemonique : "-"}</div>,
    },
    {
      name: "Type de la Valeur",
      cell: (row) => <div>{row.ValueType ? row.ValueType : "-"}</div>,
    },
    {
      name: "Nb titres admis en bourse",
      cell: (row) => (
        <div>{row.NbTitresadmisBourse ? row.NbTitresadmisBourse : "-"}</div>
      ),
    },
    {
      name: "Nb de titres flottants",
      cell: (row) => <div>{row.NbCodFlott ? row.NbCodFlott : "-"}</div>,
    },
    {
      name: "Groupe de cotation",
      cell: (row) => <div>{row.GroupCotation ? row.GroupCotation : "-"}</div>,
    },
    {
      name: "Super Secteur",
      cell: (row) => <div>{row.SuperSecteur ? row.SuperSecteur : "-"}</div>,
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
            data={rows}
            progressPending={pending}
            progressComponent={<TableProgress />}
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
      <AddValue show={addModalShow} onHide={() => setAddModalShow(false)} />
      <EditValue
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        values={data}
        id={id}
      />
      <DeleteValue
        show={deleteModalShow}
        handleClose={() => setDeleteModalShow(false)}
        id={id}
      />
    </>
  );
};

export default ValuesTable;
