import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../../../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteValue, getValues } from "../../../../_redux/actions/values";
import AddValue from "../../../Modals/GeneralRef/AddValue";
import EditValue from "../../../Modals/GeneralRef/EditValue";
const ValuesTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const values = useSelector((state) => state.values.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [id, setId] = useState();

  const openSelectedValueModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const deleteCv = (id) => {
    dispatch(deleteValue(id));
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deleteCv(row.id)}>
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

  return (
    <>
      <div className="card">
        <DataTable
          title="Données Générales"
          responsive
          overflowY
          overflowYOffset="150px"
          columns={columns}
          data={values}
          defaultSortField="Code STICODEVAM"
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
      <AddValue show={addModalShow} onHide={() => setAddModalShow(false)} />
      <EditValue
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        values={values}
        id={id}
      />
    </>
  );
};

export default ValuesTable;
