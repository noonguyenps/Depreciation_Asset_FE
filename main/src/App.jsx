import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { FallbackComponent } from "./components/FallbackComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import Asset from "./pages/Asset";
import Charts from "./pages/Charts";
const AssetsDetail = React.lazy(() => import("asset/AssetsDetail"));
const Depriciation = React.lazy(() => import("depriciation/Depriciation"));

const App = () => (
  <BrowserRouter>
    <Sidebar>
      <Suspense fallback={<FallbackComponent />}>
        <Routes>
          <Route path="/" element={<AssetsDetail />} />
          <Route path="/home" element={<AssetsDetail />} />
          <Route path="/asset" element={<Asset />} />
          <Route path="/depriciation" element={<Depriciation />} />
          <Route path="/depriciation/charts" element={<Charts />} />
        </Routes>
      </Suspense>
    </Sidebar>
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById("app"));
