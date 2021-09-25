import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SortIcon from "@material-ui/icons/ArrowDownward";
import "../../../css/styles.css";
import NoData from "../../../components/NoData";
import TableProgress from "../../../components/TableProgress";

const UsersTable = () => {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const data = [
    {
      id: 1,
      prenom: "benzaied",
      nom: "khoubaib",
      identifiant: "benzy",
      email: "khoubaibbenzaied@gmail.com",
      role: "Utilisateur",
    },
    {
      id: 2,
      prenom: "bejaoui",
      nom: "dhia",
      identifiant: "dhia010",
      email: "dhiabejaoui@gmail.com",
      role: "Utilisateur",
    },
  ];
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
          <IconButton aria-label="delete" color="secondary">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" color="primary">
            <EditIcon />
          </IconButton>
        </div>
      ),
      compact: true,
    },
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Prénom",
      selector: "prenom",
    },
    {
      name: "Nom",
      selector: "nom",
    },
    {
      name: "Identifiant",
      selector: "identifiant",
    },
    {
      name: "E-mail",
      selector: "email",
      width: "250px",
    },
    {
      name: "Rôle",
      selector: "role",
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
          title="Utilisateurs"
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
      </div>
      <div className="add-button">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};

export default UsersTable;
