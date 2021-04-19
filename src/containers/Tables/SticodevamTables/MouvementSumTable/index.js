import React from "react";
import DataTable from "react-data-table-component";
import "../../../../css/styles.css";
const MouvementSumTable = ({ mouvementSum }) => {
  const columns = [
    {
      name: "Nombre de titres",
      cell: (row) => (
        <div>
          {Number(row.TitlesTotal).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      name: "Montant",
      cell: (row) => (
        <div>
          {Number(row.AmountTotal).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="card pl-3">
        <DataTable
          title="Total"
          responsive
          overflowY
          columns={columns}
          data={mouvementSum}
          defaultSortField="id"
        />
      </div>
    </>
  );
};
export default MouvementSumTable;
