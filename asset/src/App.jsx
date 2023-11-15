import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import AssetsDetail from "./pages/AssetsDetail";

const App = () => (
  <div>
    <AssetsDetail />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
