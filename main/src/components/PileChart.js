import React from "react";
import { Doughnut } from "react-chartjs-2";

const PieChart = () => {
  const data = {
    labels: ["Máy phát", "Thiết bị", "Cần cẩu", "Dụng cụ quản lý"],
    datasets: [
      {
        data: [30, 20, 25, 15], // Thay đổi dữ liệu tương ứng với yêu cầu của bạn
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
    options: {
      //  responsive: true,
      maintainAspectRatio: false,
    },
  };

  return <Doughnut data={data} />;
};

export default PieChart;
