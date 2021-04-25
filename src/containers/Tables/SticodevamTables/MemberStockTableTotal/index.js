import React from "react";
import DataTable from "react-data-table-component";
import "../../../../css/styles.css";

const MemberStockTableTotal = ({ totalMemberStocks }) => {
  const columns = [
    {
      name: "Av clts gérés étr",
      cell: (row) => (
        <div>
          {row["Av clts gérés étr"]
            ? row["Av clts gérés étr"].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Av clts libres Tun",
      cell: (row) => (
        <div>
          {row["Av clts libres Tun"]
            ? row["Av clts libres Tun"].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Av clts libres étr",
      cell: (row) => (
        <div>
          {row["Av clts libres étr"]
            ? row["Av clts libres étr"].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Av cont liq/rachat",
      cell: (row) => (
        <div>
          {row["Av cont liq/rachat"]
            ? row["Av cont liq/rachat"].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Av. clts gérés Tun",
      cell: (row) => (
        <div>
          {row["Av. clts gérés Tun"]
            ? row["Av. clts gérés Tun"].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Avoirs étrangers",
      cell: (row) => (
        <div>
          {row["Avoirs étrangers"]
            ? row["Avoirs étrangers"].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Avoirs domestiques",
      cell: (row) => (
        <div>
          {row["Avoirs domestiques"]
            ? row["Avoirs domestiques"].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Avoirs indiff.",
      cell: (row) => (
        <div>
          {row["Avoirs indiff."]
            ? row["Avoirs indiff."].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Avoirs ordin-depo",
      cell: (row) => (
        <div>
          {row["Avoirs ordin-depo"]
            ? row["Avoirs ordin-depo"].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Avoirs propres",
      cell: (row) => (
        <div>
          {row["Avoirs propres"]
            ? row["Avoirs propres"].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "O.P.C.V.M",
      cell: (row) => (
        <div>
          {row["O.P.C.V.M"]
            ? row["O.P.C.V.M"].toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Total",
      cell: (row) => (
        <div>
          {row.Total
            ? row.Total.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Part (%)",
      cell: (row) => <div>{row.Part ? row.Part.toFixed(2) : 0}%</div>,
      right: true,
    },
  ];

  return (
    <div className="fixed-height">
      <div className="card">
        <DataTable
          title="Total"
          responsive
          columns={columns}
          data={totalMemberStocks}
          defaultSortField="id"
          noDataComponent=""
        />
      </div>
    </div>
  );
};
export default MemberStockTableTotal;
