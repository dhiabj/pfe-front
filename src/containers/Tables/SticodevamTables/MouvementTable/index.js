import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import NoData from "../../../../components/NoData";
import TableProgress from "../../../../components/TableProgress";
import "../../../../css/styles.css";

const MouvementTable = ({ mouvements }) => {
  const formattedArray = [];
  mouvements?.forEach((element) => {
    formattedArray.push({
      OperationLabel: element.OperationCode.OperationLabel,
      TitlesNumber: +element.TitlesNumber,
      Amount: +element.Amount,
    });
  });

  const data = Array.from(
    formattedArray
      .reduce((acc, { TitlesNumber, Amount, ...r }) => {
        const key = JSON.stringify(r);
        const current = acc.get(key) || { ...r, TitlesNumber: 0, Amount: 0 };
        return acc.set(key, {
          ...current,
          TitlesNumber: current.TitlesNumber + TitlesNumber,
          Amount: current.Amount + Amount,
        });
      }, new Map())
      .values()
  );

  const columns = [
    {
      name: "Libellé opération",
      cell: (row) => <div>{row.OperationLabel}</div>,
    },
    {
      name: "Nombre de titres",
      cell: (row) => (
        <div>
          {row.TitlesNumber.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      name: "Montant",
      cell: (row) => (
        <div>
          {row.Amount.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
  ];

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

  const tableData = {
    columns,
    data,
  };

  return (
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
          data={rows}
          progressPending={pending}
          progressComponent={<TableProgress />}
          defaultSortField="id"
          pagination
          highlightOnHover
          noDataComponent={<NoData />}
        />
      </DataTableExtensions>
    </div>
  );
};
export default MouvementTable;
