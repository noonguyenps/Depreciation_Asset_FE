import React, { useState, useEffect, useRef } from "react";
import "./sass/style.scss";
import ReactPaginate from "react-paginate";
import ReactDOM from "react-dom";
import useDebounce from "../hooks/useDebounce";
import Loading from "../components/loading";
import logo from "../components/assets/logo.jpg";

const AssetsDetail = () => {
  const [assetData, setAssetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [excelData, setExcelData] = useState(null);
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [assetsPerPage, setAssetsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  //filterDate
  const [fromDate, setFromDate] = useState("2019-12-24");
  const [toDate, setToDate] = useState("2023-12-24");
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const fromDateDebounce = useDebounce(fromDate, 500);
  const toDateDebounce = useDebounce(toDate, 500);

  //typeAsset
  const [selectedValue, setSelectedValue] = useState("all"); // 'all' or some default value

  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/asset/filter?page=${currentPage}&size=${assetsPerPage}&date?fromDate=${fromDate}&toDate=${toDate}`
        );

        const data = await response.json();
        console.log("data", data);
        setTotalPage(data.data.totalPage);
        setAssetData(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, fromDateDebounce, toDateDebounce]);

  useEffect(() => {
    setCurrentPage(0);
  }, [fromDateDebounce, toDateDebounce]);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const confirmed = window.confirm(
      "Are you sure you want to import this Excel file?"
    );

    if (confirmed && file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          "http://localhost:8080/api/asset/upload-assets-data",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("Success:", result.Message);
        } else {
          console.error("Failed to upload Excel data.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleDateChange = (e, type) => {
    const value = e.target.value;
    if (type === "from") {
      setFromDate(value);
    } else {
      setToDate(value);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="asset__content">
      <div className="asset-content__title">
        <img style={{ width: "50px", height: "50px" }} src={logo} alt="" />

        <h2>Tài sản</h2>
        <div className="importExcel">
          <label htmlFor="fileInput" className="customFileInput">
            Import File
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

      <div className="asset-content__filter">
        <button className="asset-content__addMore">Add Asset</button>
        <div className="search-box">
          <input
            type="text"
            className="search-box__input"
            placeholder="Search..."
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
      <div className="asset-content__sellection">
        <div className="content-sellection__state">
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
              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
            />
          </svg>
          <span>Nhóm tài sản:</span>
          <div className="state-dropdown">
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              style={{ width: "100px" }}
            >
              <option value="all">Tất cả</option>
              <option value="1">Máy móc, thiết bị động lực</option>
              <option value="2">Máy móc, thiết bị công tác</option>
              <option value="3">Dụng cụ làm việc đo lường, thí nghiệm</option>
              <option value="4">Thiết bị và phương tiện vận tải</option>
              <option value="5">Dụng cụ quản lý</option>
              <option value="6">Nhà cửa, vật kiến trúc</option>
              <option value="7">"Súc vật, vườn cây lâu năm"</option>
            </select>
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div className="content-sellection__state">
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
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
            />
          </svg>
          <span>Kiểu tài sản:</span>
          <div className="state-dropdown">
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              style={{ width: "100px" }}
            >
              <option value="all">Tất cả</option>
              {!loading &&
                assetData?.data.assets.map((asset, key) => (
                  <option key={asset.assetId}>{asset.assetTypeName}</option>
                ))}
            </select>
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div className="content-sellection__state">
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
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
            />
          </svg>
          <span>Kho hàng:</span>
          <div className="state-dropdown">
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              style={{ width: "100px" }}
            >
              <option value="all">Tất cả</option>
              {!loading &&
                assetData?.data.assets.map((asset, key) => (
                  <option key={asset.assetId}>{asset.user.dept.name}</option>
                ))}
            </select>
          </div>
        </div>
        <div className="content-sellection__state">
          <label>
            Từ ngày:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => handleDateChange(e, "from")}
            />
          </label>
          <label>
            Đến ngày:
            <input
              type="date"
              value={toDate}
              onChange={(e) => handleDateChange(e, "to")}
            />
          </label>
        </div>
      </div>
      <div className="asset-content__detail">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  {" "}
                  <input type="checkbox" />
                </th>

                <th>Tài sản</th>
                <th>Người sử dụng</th>
                <th>Kiểu tài sản</th>
                <th>Nhóm tài sản</th>
                <th>Ngày nhập kho</th>
                <th>Trạng thái</th>
                <th>Nguyên giá</th>
                <th>Kích hoạt</th>
              </tr>
            </thead>
            <tbody>
              {loading && <Loading />}
              {!loading &&
                assetData?.data.assets.map((asset, index) => (
                  <tr key={asset.assetId}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{asset.assetName}</td>
                    <td style={{ fontWeight: "600" }}>{asset.user.fullName}</td>
                    <td>{asset.assetTypeName}</td>
                    <td>{asset.assetGroup || "Sản xuất"}</td>
                    <td>{asset.dateInStored}</td>
                    <td>{asset.statusName}</td>
                    <td>{asset.price}</td>
                    <td>
                      <div
                        className={`status ${
                          asset.status === 1 ? "active" : "inactive"
                        }`}
                      >
                        {asset.status === 1 ? "✓" : "✗"}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="asset__pagination"> */}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
    // </div>
  );
};

export default AssetsDetail;
