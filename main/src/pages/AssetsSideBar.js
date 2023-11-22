import React from "react";
import "./sass/style.scss";

export const AssetsSideBar = (props) => {
  return (
    <div className="asset__sideBar">
      <div className="sideBar__user">
        <img
          className="user__avatar"
          src="https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="user__infor">
          <p>PHAN XUÂN VŨ</p>
          <p>Quản lý kho</p>
        </div>
      </div>
      <div className="sideBar__filter">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="sideBar__asset"></div>
      <div className="sideBar__ccdc"></div>
    </div>
  );
};
