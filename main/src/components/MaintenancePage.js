// MaintenancePage.js
import { text } from "@fortawesome/fontawesome-svg-core";
import React from "react";

const MaintenancePage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="https://demo.wpbeaveraddons.com/wp-content/uploads/2018/02/main-vector.png"
          alt="maintenance"
        />
        <h1 style={{ textAlign: "center" }}>Đang Bảo Trì</h1>
        <p>
          Xin lỗi, tính năng đang trong quá trình bảo trì. Hãy quay lại sau.
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
