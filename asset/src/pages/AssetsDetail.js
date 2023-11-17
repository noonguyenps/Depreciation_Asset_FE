import React, { useState, useEffect } from "react";
import "./sass/style.scss";
import ReactPaginate from "react-paginate";
import ReactDOM from "react-dom";

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
  const [assetFiltered, setAssetFiltered] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/asset?page=${currentPage}&size=${assetsPerPage}`
        );

        const data = await response.json();
        setTotalPage(data.data.totalPage);
        setAssetData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

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

  useEffect(() => {
    let timer = null;

    // Fetch data from the API based on the current date range
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/asset/date?fromDate=${fromDate}&toDate=${toDate}&page=${currentPage}&size=${assetsPerPage}`
        );
        const data = await response.json();
        setAssetData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const debounceApiCall = () => {
      clearTimeout(timer); // Clear the existing timer
      timer = setTimeout(() => fetchData(), 500); // Set a new timer
    };

    // Call the debounced function on fromDate or toDate change
    debounceApiCall();

    // Cleanup function to clear the timer on component unmount
    return () => {
      clearTimeout(timer);
    }; // Fetch data when fromDate or toDate changes
  }, [fromDate, toDate]);

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  return (
    <div className="asset__content">
      <div className="asset-content__title">
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
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>

        <h2>Tài sản</h2>
      </div>
      <div className="asset-content__filter">
        <ul className="menu">
          <li cả className="menu__items">
            Tất cả
          </li>
          <li className="menu__items">Chưa bàn giao</li>
          <li className="menu__items">Cấp phát</li>
        </ul>
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
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
            />
          </svg>
          <span>Trạng thái:</span>
          <div className="state-dropdown">
            <p>Tất cả</p>
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
              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
            />
          </svg>
          <span>Nhóm tài sản:</span>
          <div className="state-dropdown">
            <p>Tất cả</p>
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
            <p>Tất cả</p>
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
            <p>Tất cả</p>
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
          {/* <svg
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
          <span>Ngày nhập kho:</span>
          <p>--/--/--</p> */}
          <label>
            From Date:
            <input
              type="date"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </label>
          <label>
            To Date:
            <input type="date" value={toDate} onChange={handleToDateChange} />
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
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {assetData &&
                assetData.data.assets.map((asset, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{asset.assetName}</td>
                    <td>{asset.userIdUsed}</td>
                    <td>{asset.assetTypeId}</td>
                    <td>{asset.assetGroup || "Sản xuất"}</td>
                    <td>{<asset className="dateInStored"></asset>}</td>
                    <td>{asset.statusName}</td>
                    <td>{asset.price}</td>
                    <td>{asset.status}</td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
          {excelData && (
            <div>
              <h2>Imported Excel Data</h2>
              {/* Display your data here */}
              <pre>{JSON.stringify(excelData, null, 2)}</pre>
            </div>
          )}
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
