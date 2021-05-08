import React from "react";
import { Line } from "react-chartjs-2";

const PeriodStock = ({ groupedArrayWithTotal }) => {
  console.log(groupedArrayWithTotal);
  const dateArray = groupedArrayWithTotal.map((date) => date.StockExchangeDate);
  const quantityArray = groupedArrayWithTotal.map((quantity) => quantity.total);
  const labels = dateArray;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Historique par adhérent-valeur",
        data: quantityArray,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return (
    <div>
      <Line
        data={data}
        width={400}
        height={600}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default PeriodStock;
