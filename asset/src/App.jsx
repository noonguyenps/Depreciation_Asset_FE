import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import AssetsDetail from "./pages/AssetsDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AssetsDetail />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
