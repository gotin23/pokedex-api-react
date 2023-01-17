import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

export default function Stats2({ state }) {
  const series = [
    {
      name: `${state.firstPkm.name}`,
      data: [
        `${state.firstPkm.hp}`,
        `${state.firstPkm.attack}`,
        `${state.firstPkm.defense}`,
        `${state.firstPkm.specialAttack}`,
        `${state.firstPkm.specialDefense}`,
        `${state.firstPkm.speed}`,
      ],
    },
    {
      name: `${state.secondPkm.name}`,
      data: [
        `${state.secondPkm.hp}`,
        `${state.secondPkm.attack}`,
        `${state.secondPkm.defense}`,
        `${state.secondPkm.specialAttack}`,
        `${state.secondPkm.specialDefense}`,
        `${state.secondPkm.speed}`,
      ],
    },
  ];

  const [statePkm] = useState({
    options: {
      chart: {
        type: "bar",
        height: 350,
      },

      xaxis: {
        type: "category",
        categories: [
          "HP",
          "Attack",
          "Defense",
          "Special Attack",
          "Special Defense",
          "Speed",
        ],

        group: {
          style: {
            fontSize: "14px",
            fontWeight: 700,
          },
        },
      },
      title: {
        text: "Pokemon Statistics",
      },
      colors: ["#F44336", "#9C27B0"],
    },
  });

  return (
    <div className="chart fadeIn">
      <Chart
        options={statePkm.options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}
