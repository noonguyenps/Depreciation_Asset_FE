import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  // Dữ liệu mẫu cho biểu đồ cột
  const data = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Doanh thu theo tháng",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [1000, 1500, 1200, 1800, 2000, 1600],
        backgroundColor: "#36A2EB", // Màu sắc

        barThickness: 20,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h2>Biểu đồ cột</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
