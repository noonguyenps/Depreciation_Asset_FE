import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom";
import { FallbackComponent } from "./components/FallbackComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./index.css";
import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import Asset from "./pages/Asset";
import Manage from "./pages/Manage";

const AssetsDetail = lazy(() => import("asset/AssetsDetail"));

const Depreciation = lazy(() => import("depreciation/Depreciation"));
const DepreciationInfor = lazy(() => import("depreciation/DepreciationInfor"));
const DepreciationUpgrade = lazy(() =>
  import("depreciation/DepreciationUpgrade")
);
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
              element={<DepreciationInfor />}
            />
            <Route
              path="/asset/depreciation-upgrade"
              element={<DepreciationUpgrade />}
            />
            <Route path="/asset/depreciation-manage" element={<Manage />} />
            <Route path="/depreciation" element={<Depreciation />} />
            <Route path="/depreciation/list" element={<Depreciation />} />
          </Routes>
        </Suspense>
      </Sidebar>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById("app")); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
