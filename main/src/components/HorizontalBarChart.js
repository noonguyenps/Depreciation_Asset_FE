import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const HorizontalBarChart = () => {
  const data = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Doanh thu theo tháng",
        backgroundColor: "#36A2EB",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [1000, 1500, 1200, 1800, 2000, 1600],
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return tooltipItem.xLabel.toLocaleString(); // Định dạng số liệu
        },
      },
    },
  };

  return (
    <div>
      <h2>Biểu đồ cột nằm ngang</h2>
      <HorizontalBar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
