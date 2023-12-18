import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import AssetsDetail from "./pages/AssetsDetail";
import Manage from "./pages/Manage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Manage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
