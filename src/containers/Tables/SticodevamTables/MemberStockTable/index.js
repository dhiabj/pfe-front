import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import SortIcon from "@material-ui/icons/ArrowDownward";
import "../../../../css/styles.css";
const MemberStockTable = ({ stocks }) => {
  const formattedArray = [];

  stocks?.forEach((element) => {
    switch (element.CategoryCode.CategoryCode) {
      case "001":
        formattedArray.push({
          CategoryLabel: "Avoirs propres",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;
      case "004":
        formattedArray.push({
          CategoryLabel: "O.P.C.V.M",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;
      case "002":
        formattedArray.push({
          CategoryLabel: "Avoirs domestiques",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;
      case "006":
        formattedArray.push({
          CategoryLabel: "Av cont liq/rachat",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;
      case "003":
        formattedArray.push({
          CategoryLabel: "Avoirs étrangers",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;
      case "000":
        formattedArray.push({
          CategoryLabel: "Avoirs indiff.",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;
      case "032":
        formattedArray.push({
          CategoryLabel: "Av clts gérés étr",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;
      case "021":
        formattedArray.push({
          CategoryLabel: "Av clts libres Tun",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;
      case "031":
        formattedArray.push({
          CategoryLabel: "Av clts libres étr",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;
      case "022":
        formattedArray.push({
          CategoryLabel: "Av. clts gérés Tun",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;
      case "999":
        formattedArray.push({
          CategoryLabel: "Avoirs ordin-depo",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          MembershipCode: element.MembershipCode.MembershipCode,
          MemberName: element.MembershipCode.MemberName,
        });
        break;

      default:
        break;
    }
  });

  const data = Array.from(
    formattedArray
      .reduce((acc, { Quantity, ...r }) => {
        const key = JSON.stringify(r);
        const current = acc.get(key) || { ...r, Quantity: 0 };
        return acc.set(key, {
          ...current,
          Quantity: current.Quantity + Quantity,
        });
      }, new Map())
      .values()
  );
  //console.log(data);

  const columns = [
    {
      name: "Nom Adhérent",
      selector: "MemberName",
      sortable: true,
      grow: 3,
    },
    {
      name: "Av clts gérés étr",
      cell: (row) => (
        <div>
          {row.CategoryCode === "032"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "Av clts libres Tun",
      cell: (row) => (
        <div>
          {row.CategoryCode === "021"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "Av clts libres étr",
      cell: (row) => (
        <div>
          {row.CategoryCode === "031"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "Av cont liq/rachat",
      cell: (row) => (
        <div>
          {row.CategoryCode === "006"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "Av. clts gérés Tun",
      cell: (row) => (
        <div>
          {row.CategoryCode === "022"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "Avoirs étrangers",
      cell: (row) => (
        <div>
          {row.CategoryCode === "003"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "Avoirs domestiques",
      cell: (row) => (
        <div>
          {row.CategoryCode === "002"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "Avoirs indiff.",
      cell: (row) => (
        <div>
          {row.CategoryCode === "000"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "Avoirs ordin-depo",
      cell: (row) => (
        <div>
          {row.CategoryCode === "999"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "Avoirs propres",
      cell: (row) => (
        <div>
          {row.CategoryCode === "001"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "O.P.C.V.M",
      cell: (row) => (
        <div>
          {row.CategoryCode === "004"
            ? row.Quantity.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : "0"}
        </div>
      ),
      right: true,
    },
    {
      name: "Total",
      cell: (row) => <div>0</div>,
      right: true,
    },
    {
      name: "Part (%)",
      cell: (row) => <div>0%</div>,
      right: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <div className="fixed-height">
      <div className="card">
        <DataTableExtensions
          {...tableData}
          print={false}
          filterPlaceholder="Rechercher">
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={data}
            defaultSortField="id"
            pagination
            paginationPerPage={8}
            highlightOnHover
            sortIcon={<SortIcon />}
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};
export default MemberStockTable;
