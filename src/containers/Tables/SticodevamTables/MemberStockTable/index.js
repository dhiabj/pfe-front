import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component-footer";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import SortIcon from "@material-ui/icons/ArrowDownward";
import "../../../../css/styles.css";
import NoData from "../../../../components/NoData";
import { reduceItems } from "../../../../helpers/reduceItems";
import { groupBy } from "../../../../helpers/groupBy";
import { reduceTotals } from "../../../../helpers/reduceTotals";
import TableProgress from "../../../../components/TableProgress";

const MemberStockTable = ({ stocks }) => {
  const reducedStocks = stocks?.map((el) => ({
    MembershipCode: el.MembershipCode.MembershipCode,
    MemberName: el.MembershipCode.MemberName,
    CategoryCode: el.CategoryCode.CategoryCode,
    CategoryLabel: el.CategoryCode.CategoryLabel,
    Quantity: +el.Quantity,
  }));
  // console.log(reducedStocks);

  const newArray = groupBy(reducedStocks, "MembershipCode");
  const formattedArray =
    newArray &&
    Object.keys(newArray)?.map((el) => ({
      MembershipCode: el,
      groupedStocks: newArray[el],
    }));
  // console.log(formattedArray);

  const groupedArrayByCategory = formattedArray?.map((el) => ({
    MembershipCode: el.MembershipCode,
    MemberName: el.groupedStocks[0]?.MemberName,
    ...groupBy(el.groupedStocks, "CategoryLabel"),
  }));
  //console.log(groupedArrayByCategory);

  const groupedArrayByCategoryWithSum = groupedArrayByCategory?.map((el) => ({
    MembershipCode: el.MembershipCode,
    MemberName: el.MemberName,
    "Av clts gérés étr": reduceItems(el["Av clts gérés étr"]),
    "Av clts libres Tun": reduceItems(el["Av clts libres Tun"]),
    "Av clts libres étr": reduceItems(el["Av clts libres étr"]),
    "Av cont liq/rachat": reduceItems(el["Av cont liq/rachat"]),
    "Av. clts gérés Tun": reduceItems(el["Av. clts gérés Tun"]),
    "Avoirs étrangers": reduceItems(el["Avoirs étrangers"]),
    "Avoirs domestiques": reduceItems(el["Avoirs domestiques"]),
    "Avoirs indiff.": reduceItems(el["Avoirs indiff."]),
    "Avoirs ordin-depo": reduceItems(el["Avoirs ordin-depo"]),
    "Avoirs propres": reduceItems(el["Avoirs propres"]),
    "O.P.C.V.M": reduceItems(el["O.P.C.V.M"]),
  }));
  //console.log(groupedArrayByCategoryWithSum);

  const groupedArrayWithTotal = groupedArrayByCategoryWithSum?.map((item) => ({
    ...item,
    total:
      item["Av clts gérés étr"] +
      item["Av clts libres Tun"] +
      item["Av clts libres étr"] +
      item["Av cont liq/rachat"] +
      item["Av. clts gérés Tun"] +
      item["Avoirs étrangers"] +
      item["Avoirs domestiques"] +
      item["Avoirs indiff."] +
      item["Avoirs ordin-depo"] +
      item["Avoirs propres"] +
      item["O.P.C.V.M"],
  }));

  const totalArray = [];
  totalArray.push({
    MemberName: "Total",
    "Av clts gérés étr": reduceTotals(
      groupedArrayWithTotal,
      "Av clts gérés étr"
    ),
    "Av clts libres Tun": reduceTotals(
      groupedArrayWithTotal,
      "Av clts libres Tun"
    ),
    "Av clts libres étr": reduceTotals(
      groupedArrayWithTotal,
      "Av clts libres étr"
    ),
    "Av cont liq/rachat": reduceTotals(
      groupedArrayWithTotal,
      "Av cont liq/rachat"
    ),
    "Av. clts gérés Tun": reduceTotals(
      groupedArrayWithTotal,
      "Av. clts gérés Tun"
    ),
    "Avoirs étrangers": reduceTotals(groupedArrayWithTotal, "Avoirs étrangers"),
    "Avoirs domestiques": reduceTotals(
      groupedArrayWithTotal,
      "Avoirs domestiques"
    ),
    "Avoirs indiff.": reduceTotals(groupedArrayWithTotal, "Avoirs indiff."),
    "Avoirs ordin-depo": reduceTotals(
      groupedArrayWithTotal,
      "Avoirs ordin-depo"
    ),
    "Avoirs propres": reduceTotals(groupedArrayWithTotal, "Avoirs propres"),
    "O.P.C.V.M": reduceTotals(groupedArrayWithTotal, "O.P.C.V.M"),
    total: reduceTotals(groupedArrayWithTotal, "total"),
  });

  const data = groupedArrayWithTotal?.map((el) => ({
    ...el,
    part: ((el.total / totalArray[0].total) * 100).toFixed(2),
    totalPart: (el.total / totalArray[0].total) * 100,
  }));
  // console.log(data);

  const total = totalArray?.map((item) => ({
    ...item,
    part: Math.round(reduceTotals(data, "totalPart")).toFixed(2),
  }));
  //console.log(total);

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
      name: "Nom Adhérent",
      cell: (row) => <div>{row.MemberName ? row.MemberName : "-"}</div>,
      sortable: true,
      width: "150px",
    },
    {
      name: "Av clts gérés étr",
      cell: (row) => (
        <div>{row["Av clts gérés étr"] ? row["Av clts gérés étr"] : 0}</div>
      ),
      right: true,
    },
    {
      name: "Av clts libres Tun",
      cell: (row) => (
        <div>{row["Av clts libres Tun"] ? row["Av clts libres Tun"] : 0}</div>
      ),
      right: true,
    },
    {
      name: "Av clts libres étr",
      cell: (row) => (
        <div>{row["Av clts libres étr"] ? row["Av clts libres étr"] : 0}</div>
      ),
      right: true,
    },
    {
      name: "Av cont liq/rachat",
      cell: (row) => (
        <div>{row["Av cont liq/rachat"] ? row["Av cont liq/rachat"] : 0}</div>
      ),
      right: true,
    },
    {
      name: "Av. clts gérés Tun",
      cell: (row) => (
        <div>{row["Av. clts gérés Tun"] ? row["Av. clts gérés Tun"] : 0}</div>
      ),
      right: true,
    },
    {
      name: "Avoirs étrangers",
      cell: (row) => (
        <div>{row["Avoirs étrangers"] ? row["Avoirs étrangers"] : 0}</div>
      ),
      right: true,
    },
    {
      name: "Avoirs domestiques",
      cell: (row) => (
        <div>{row["Avoirs domestiques"] ? row["Avoirs domestiques"] : 0}</div>
      ),
      right: true,
    },
    {
      name: "Avoirs indiff.",
      cell: (row) => (
        <div>{row["Avoirs indiff."] ? row["Avoirs indiff."] : 0}</div>
      ),
      right: true,
    },
    {
      name: "Avoirs ordin-depo",
      cell: (row) => (
        <div>{row["Avoirs ordin-depo"] ? row["Avoirs ordin-depo"] : 0}</div>
      ),
      right: true,
    },
    {
      name: "Avoirs propres",
      cell: (row) => (
        <div>{row["Avoirs propres"] ? row["Avoirs propres"] : 0}</div>
      ),
      right: true,
    },
    {
      name: "O.P.C.V.M",
      cell: (row) => <div>{row["O.P.C.V.M"] ? row["O.P.C.V.M"] : 0}</div>,
      right: true,
    },
    {
      name: "Total",
      cell: (row) => <div>{row.total ? row.total : 0}</div>,
      right: true,
    },
    {
      name: "Part (%)",
      cell: (row) => <div>{row.part ? row.part : 0}%</div>,
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
            data={rows}
            progressPending={pending}
            progressComponent={<TableProgress />}
            defaultSortField="id"
            pagination
            paginationPerPage={7}
            highlightOnHover
            sortIcon={<SortIcon />}
            noDataComponent={<NoData />}
            footer={total[0]}
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};
export default MemberStockTable;
