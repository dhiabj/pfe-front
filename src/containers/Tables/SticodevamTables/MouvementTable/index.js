import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import "../../../../css/styles.css";
const MouvementTable = ({ data }) => {
  const columns = [
    {
      name: "Libellé opération",
      cell: (row) => <div>{row.OperationCode.OperationLabel}</div>,
    },
    {
      name: "Nombre de titres",
      cell: (row) => (
        <div>
          {Number(row.TitlesNumber).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      name: "Montant",
      cell: (row) => (
        <div>
          {Number(row.Amount).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div className="card mb-3 pl-3">
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
          />
        </DataTableExtensions>
      </div>
    </>
  );
};
export default MouvementTable;
