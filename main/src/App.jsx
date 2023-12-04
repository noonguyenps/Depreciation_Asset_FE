import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom";
import { FallbackComponent } from "./components/FallbackComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import Asset from "./pages/Asset";
import Charts from "./pages/Charts";
import IdContext from "./context/context";
import DepricationInfor from "./pages/DepriciationInfor";

const AssetsDetail = React.lazy(() => import("asset/AssetsDetail"));
const Depriciation = React.lazy(() => import("depriciation/Depriciation"));

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Suspense fallback={<FallbackComponent />}>
          <Routes>
            <Route path="/" element={<AssetsDetail />} />
            <Route path="/home" element={<AssetsDetail />} />
            <Route path="/asset/details/:id" element={<Asset />} />
            <Route
              path="/asset/depreciation-info"
              element={<DepricationInfor />}
            />

            <Route path="/depreciation" element={<Depriciation />} />
            <Route path="/depriciation/list" element={<Depriciation />} />
            <Route path="/depriciation/charts" element={<Charts />} />
          </Routes>
        </Suspense>
      </Sidebar>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
