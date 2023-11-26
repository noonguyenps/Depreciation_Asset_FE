import React from "react";
import PieChart from "../components/PileChart";
import BarChart from "../components/BarChart";
import HorizontalBarChart from "../components/HorizontalBarChart";

const Charts = () => {
  return (
    <div>
      <h1>Charts page</h1>
      <PieChart />
      <BarChart />
      <HorizontalBarChart />
    </div>
  );
};

export default Charts;
