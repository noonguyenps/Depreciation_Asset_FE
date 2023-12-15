import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Depreciation from "./pages/Depreciation";
import DepreciationUpgrade from "./pages/DepreciationUpgrade";
import DepreciationInfor from "./pages/DepreciationInfor";

const App = () => <Depreciation />;
ReactDOM.render(<App />, document.getElementById("app"));
