import React from "react";
import { Line } from "react-chartjs-2";

const PeriodStock = () => {
  const labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Historique par adhérent-valeur",
        data: [12, 19, 3, 5, 2, 3],
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
