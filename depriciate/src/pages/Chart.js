import React, { useState, useEffect, useRef } from "react";
import "./sass/style.scss";
import ReactPaginate from "react-paginate";
import ReactDOM from "react-dom";
import useDebounce from "../hooks/useDebounce";
import Loading from "../components/loading";
import importIcon from "../components/assets/importIcon.png";
import addIcon from "../components/assets/importIcon.png";
import assetInfo from "../components/assets/assetInfo.png";

const AssetsDetail = () => {
  return (
    <div className="chart__content">
      <div className="content-top">
        <div className="content-top__header">
          <div className="content-top__title">
            <h2>Danh sách tài sản</h2>
          </div>
          <div className="content-top__filter">
            <div className="search-box">
              <input
                type="text"
                className="search-box__input"
                placeholder="Tìm kiếm..."
                value={userId}
                onChange={(e) => handleUserChange(e.target.value)}
              />
              <div className="search-box__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="content-top__button">
          <div className="asset-content__addMore">
            <img src={addIcon} alt="" />
            <span>Thêm tài sản</span>
          </div>
          <div className="importExcel">
            <img className="importIcon" src={importIcon} alt="" />

            <label htmlFor="fileInput" className="customFileInput">
              Nhập file tài sản
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".xls, .xlsx"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {excelData && (
              <div>
                <h2>Imported Excel Data</h2>
                {/* Display your data here */}
                <pre>{JSON.stringify(excelData, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="asset-content__sellection">
        <div className="content-sellection__infor">
          <div className="info">
            <img src={assetInfo} alt="" />
            <div>
              <p className="info-title">Tổng cộng tài sản</p>
              <h2 className="info-number">1,250</h2>
              <div className="info-change">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                  />
                </svg>
                <span className="info-change__color">16%</span>
                <span>tháng này</span>
              </div>
            </div>
          </div>
          <div className="info">
            <img src={assetInfo} alt="" />
            <div>
              <p className="info-title">Tổng cộng tài sản</p>
              <h2 className="info-number">1,250</h2>
              <div className="info-change">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                  />
                </svg>
                <span className="info-change__color">16%</span>
                <span>tháng này</span>
              </div>
            </div>
          </div>
          <div className="info">
            <img src={assetInfo} alt="" />
            <div>
              <p className="info-title">Tổng cộng tài sản</p>
              <h2 className="info-number">1,250</h2>
              <div className="info-change">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                  />
                </svg>
                <span className="info-change__color">16%</span>
                <span>tháng này</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsDetail;
