import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SortIcon from "@material-ui/icons/ArrowDownward";
import "../../../../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getMarkets } from "../../../../_redux/actions/market";
import moment from "moment";
import AddMarket from "../../../Modals/Intermediaire/AddMarket";
import EditMarket from "../../../Modals/Intermediaire/EditMarket";
import DeleteMarket from "../../../Modals/Intermediaire/DeleteMarket";
import NoData from "../../../../components/NoData";
import TableProgress from "../../../../components/TableProgress";

const MarketTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMarkets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => state.market.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const [id, setId] = useState();

  const openSelectedMarketModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const openSelectedDeleteMarketModal = (id) => {
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
            onClick={() => openSelectedDeleteMarketModal(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => openSelectedMarketModal(row.id)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      name: "Code Marché",
      selector: "MarketCode",
      sortable: true,
    },
    {
      name: "Libellé marché",
      cell: (row) => <div>{row.MarketLabel ? row.MarketLabel : "-"}</div>,
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
      <AddMarket show={addModalShow} onHide={() => setAddModalShow(false)} />
      <EditMarket
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        markets={data}
        id={id}
      />
      <DeleteMarket
        show={deleteModalShow}
        handleClose={() => setDeleteModalShow(false)}
        id={id}
      />
    </>
  );
};

export default MarketTable;
