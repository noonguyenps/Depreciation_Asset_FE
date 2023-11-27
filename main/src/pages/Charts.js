import React from "react";
import PieChart from "../components/PileChart";
import BarChart from "../components/BarChart";
import HorizontalBarChart from "../components/HorizontalBarChart";
import "./sass/style.scss";

const Charts = () => {
  return (
    <div className="asset__chart">
      <h2 className="chart-title">Biểu đồ</h2>
      <div>Content</div>
      <div className="chart-top">
        <div className="pie-chart chart">
          <h2>Biểu đồ tròn</h2>
          <PieChart />
        </div>
        <div className="bar-chart chart">
          <h2>Biểu đồ cột</h2>
          <BarChart />
        </div>
      </div>
      <div className="chart-bottom">
        <div className="pie-chart chart">
          <h2>Biểu đồ tròn</h2>
          <PieChart />
        </div>
        <div className="horizone-chart chart">
          <h2>Biểu đồ cột nằm ngang</h2>
          <HorizontalBarChart />
        </div>
      </div>
    </div>
  );
};

export default Charts;
