import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { AssetsSideBar } from "./pages/AssetsSideBar";
import { FallbackComponent } from "./components/FallbackComponent";
import "./index.css";
const AssetsDetail = React.lazy(() => import("asset/AssetsDetail"));

const App = () => (
  <div className="contain">
    <AssetsSideBar />
    <Suspense fallback={<div>Loading...</div>}>
      <AssetsDetail />
    </Suspense>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
