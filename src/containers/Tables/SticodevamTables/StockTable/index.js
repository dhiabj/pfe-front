import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import "../../../../css/styles.css";
const StockTable = ({ stocks }) => {
  const formattedArray = [];

  stocks?.forEach((element) => {
    switch (element.CategoryCode.CategoryCode) {
      case "001":
        formattedArray.push({
          CategoryLabel: "Avoirs propres",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;
      case "004":
        formattedArray.push({
          CategoryLabel: "O.P.C.V.M",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;
      case "002":
        formattedArray.push({
          CategoryLabel: "Avoirs domestiques",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;
      case "006":
        formattedArray.push({
          CategoryLabel: "Av cont liq/rachat",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;
      case "003":
        formattedArray.push({
          CategoryLabel: "Avoirs étrangers",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;
      case "000":
        formattedArray.push({
          CategoryLabel: "Avoirs indiff.",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;
      case "032":
        formattedArray.push({
          CategoryLabel: "Av clts gérés étr",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;
      case "021":
        formattedArray.push({
          CategoryLabel: "Av clts libres Tun",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;
      case "031":
        formattedArray.push({
          CategoryLabel: "Av clts libres étr",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;
      case "022":
        formattedArray.push({
          CategoryLabel: "Av. clts gérés Tun",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;
      case "999":
        formattedArray.push({
          CategoryLabel: "Avoirs ordin-depo",
          CategoryCode: element.CategoryCode.CategoryCode,
          Quantity: +element.Quantity,
          Isin: element.Isin.Isin,
        });
        break;

      default:
        break;
    }
  });
  // console.log(stocks);
  // let holder = {};
  // formattedArray.forEach((el) => {
  //   if (holder.hasOwnProperty(el.Isin)) {
  //     holder[el.Isin] = holder[el.Isin] + el.Quantity;
  //   } else {
  //     holder[el.Isin] = el.Quantity;
  //   }
  // });
  // const obj2 = [];
  // console.log(holder);
  // for (let prop in holder) {
  //   obj2.push({ Isin: prop, sum: holder[prop] });
  // }
  // console.log(obj2);

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
      name: "Valeur",
      selector: "Isin",
      sortable: true,
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
    },
    {
      name: "Total",
      cell: (row) => <div>0</div>,
    },
    {
      name: "Part (%)",
      cell: (row) => <div>0%</div>,
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div className="card pl-3">
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
export default StockTable;
