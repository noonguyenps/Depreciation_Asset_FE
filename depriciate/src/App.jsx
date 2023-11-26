import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Depriciation from "./pages/Depriciation";

const App = () => (
  <div>
    <Depriciation />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
