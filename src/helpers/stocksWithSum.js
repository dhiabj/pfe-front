import moment from "moment";
import { groupBy } from "./groupBy";
import { reduceItems } from "./reduceItems";

export const stocksWithSum = (stocks) => {
  const reducedStocks = stocks?.map((el) => ({
    StockExchangeDate: moment(el.StockExchangeDate).format("YYYY-MM-DD"),
    CategoryCode: el.CategoryCode.CategoryCode,
    CategoryLabel: el.CategoryCode.CategoryLabel,
    Quantity: +el.Quantity,
  }));
  //console.log(reducedStocks);

  const newArray = groupBy(reducedStocks, "StockExchangeDate");
  //console.log(newArray);
  const formattedArray =
    newArray &&
    Object.keys(newArray)?.map((el) => ({
      StockExchangeDate: el,
      groupedStocks: newArray[el],
    }));
  //console.log(formattedArray);

  const groupedArrayByCategory = formattedArray?.map((el) => ({
    StockExchangeDate: el.StockExchangeDate,
    ...groupBy(el.groupedStocks, "CategoryLabel"),
  }));
  //console.log(groupedArrayByCategory);

  const groupedArrayByCategoryWithSum = groupedArrayByCategory?.map((el) => ({
    StockExchangeDate: el.StockExchangeDate,
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
  return groupedArrayWithTotal;
};
