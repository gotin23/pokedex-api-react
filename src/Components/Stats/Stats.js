import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import "./Stats.css";
import Loader from "../Loader/Loader";

export default function Stats({ state }) {
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

  const [statePkm] = useState({
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      markers: {
        size: 4,

        hover: {
          size: 8,
        },
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColor: "#e8e8e8",
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
      title: {
        text: "Pokemon statitics",
      },
      xaxis: {
        categories: [
          "Hp",
          "Attack",
          "Defense",
          "Special-attack",
          "Special-defense",
          "Speed",
        ],
        labels: {
          show: true,
          style: {
            colors: ["green", "green", "green", "green", "green", "green"],
            fontSize: "12px",
            fontFamily: "sans serif",
          },
        },
      },
      yaxis: {
        tickAmount: 4,
        min: 0,
        max: 180,
      },
    },
  });
  return (
    <div className="chart fadeIn">
      <Chart
        options={statePkm.options}
        series={series}
        type="radar"
        height={350}
      />
      <Loader />
    </div>
  );
}
