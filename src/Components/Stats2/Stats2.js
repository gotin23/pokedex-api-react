import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Chart from "react-apexcharts";

export default function Stats2({ state }) {
  const series = [
    {
      name: "Stats",
      data: [
        `${state.hp}`,
        `${state.attack}`,
        `${state.defense}`,
        `${state.specialAttack}`,
        `${state.specialDefense}`,
        `${state.speed}`,
      ],
    },
  ];

  const [statePkm, setStatePkm] = useState({
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
        series: [
          {
            data: [
              {
                x: "HP",
                y: 10,
                fillColor: "#EB8C87",
                strokeColor: "#C23829",
              },
              {
                x: "category B",
                y: 18,
              },
              {
                x: "category C",
                y: 13,
              },
            ],
          },
        ],

        group: {
          style: {
            fontSize: "12px",
            fontWeight: 700,
          },
        },
      },
      title: {
        text: "Pokemon Statistics",
      },
      colors: [
        "#F44336",
        "#E91E63",
        "#9C27B0",
        "#F44336",
        "#E91E63",
        "#9C27B0",
      ],
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
