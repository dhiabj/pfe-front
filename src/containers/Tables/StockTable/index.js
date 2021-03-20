import React from "react";
import DataTable from "react-data-table-component";
import "../../../css/styles.css";
import moment from "moment";
const StockTable = ({ stocks }) => {
  const columns = [
    {
      name: "Code Adhérent",
      selector: "MembershipCode",
    },
    {
      name: "ISIN valeur ",
      selector: "Isin",
    },
    {
      name: "Code Nature de Compte",
      selector: "NatureCode",
    },
    {
      name: "Code Catégorie d'avoir",
      selector: "CategoryCode",
    },
    {
      name: "Quantité",
      selector: "Quantity",
    },
    {
      name: "Sens",
      selector: "Direction",
    },
    {
      name: "Date Bourse de la situation",
      cell: (row) => (
        <div>{moment(row.StockExchangeDate).format("YYYY-MM-DD")}</div>
      ),
    },
    {
      name: "Date Comptable situation",
      cell: (row) => (
        <div>{moment(row.AccountingDate).format("YYYY-MM-DD")}</div>
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
    <div>
      <div className="card">
        <DataTable
          title="Stocks"
          overflowY
          columns={columns}
          data={stocks}
          defaultSortField="title"
          pagination
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
    </div>
  );
};
export default StockTable;
