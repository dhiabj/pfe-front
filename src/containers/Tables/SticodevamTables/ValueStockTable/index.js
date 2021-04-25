import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import SortIcon from "@material-ui/icons/ArrowDownward";
import "../../../../css/styles.css";
import NoData from "../../../../components/NoData";
import { reduceTotals } from "../../../../helpers/reduceTotals";
import { useDispatch } from "react-redux";
import { selectTotalValueStocks } from "../../../../_redux/actions/stocks";
import { groupBy } from "../../../../helpers/groupBy";
import { reduceItems } from "../../../../helpers/reduceItems";
const ValueStockTable = ({ stocks }) => {
  const dispatch = useDispatch();
  const reducedStocks = stocks?.map((el) => ({
    Isin: el.Isin.Isin,
    ValueLabel: el.Isin.ValueLabel,
    CategoryCode: el.CategoryCode.CategoryCode,
    CategoryLabel: el.CategoryCode.CategoryLabel,
    Quantity: +el.Quantity,
  }));

  const newArray = groupBy(reducedStocks, "Isin");
  const formattedArray =
    newArray &&
    Object.keys(newArray)?.map((el) => ({
      Isin: el,
      groupedStocks: newArray[el],
    }));

  const groupedArrayByCategory = formattedArray?.map((el) => ({
    Isin: el.Isin,
    ValueLabel: el.groupedStocks[0]?.ValueLabel,
    ...groupBy(el.groupedStocks, "CategoryLabel"),
  }));
  //console.log(groupedArrayByCategory);

  const groupedArrayByCategoryWithSum = groupedArrayByCategory?.map((el) => ({
    Isin: el.Isin,
    ValueLabel: el.ValueLabel,
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
    Total: reduceTotals(groupedArrayWithTotal, "total"),
  });

  const data = groupedArrayWithTotal?.map((el) => ({
    ...el,
    part: (el.total / totalArray[0].Total) * 100,
  }));
  //console.log(data);

  const Totals = totalArray?.map((item) => ({
    ...item,
    Part: Math.round(reduceTotals(data, "part")),
  }));
  //console.log(Totals);

  useEffect(() => {
    dispatch(selectTotalValueStocks(Totals));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stocks]);

  const columns = [
    {
      name: "Libellé Valeur",
      cell: (row) => <div>{row.ValueLabel ? row.ValueLabel : "-"}</div>,
      sortable: true,
      width: "150px",
    },
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
          {row.total
            ? row.total.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      ),
      right: true,
    },
    {
      name: "Part (%)",
      cell: (row) => <div>{row.part ? row.part.toFixed(2) : 0}%</div>,
      right: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <div className="mb-3">
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
            noDataComponent={<NoData />}
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};
export default ValueStockTable;
