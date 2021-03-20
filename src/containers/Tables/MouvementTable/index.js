import React from "react";
import DataTable from "react-data-table-component";
import "../../../css/styles.css";
import moment from "moment";
const MouvementTable = ({ mouvements }) => {
  const columns = [
    {
      name: "Code opération",
      selector: "OperationCode",
    },
    {
      name: "ISIN valeur ",
      selector: "Isin",
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
    {
      name: "Code adhérent livreur",
      selector: "DeliveryMemberCode",
    },
    {
      name: "Nature de compte livreur",
      selector: "DeliveryAccountType",
    },
    {
      name: "Catégorie d'avoir livreur",
      selector: "DeliveryCategoryCredit",
    },
    {
      name: "Code adhérent livré",
      selector: "DeliveredMemberCode",
    },
    {
      name: "Nature de compte livré",
      selector: "DeliveredAccountType",
    },
    {
      name: "Catégorie d'avoir livré",
      selector: "DeliveredCategoryCredit",
    },
    {
      name: "Nombre de titres",
      selector: "TitlesNumber",
    },
    {
      name: "Montant",
      selector: "Amount",
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
          title="Mouvements"
          overflowY
          columns={columns}
          data={mouvements}
          defaultSortField="title"
          pagination
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
    </div>
  );
};
export default MouvementTable;
