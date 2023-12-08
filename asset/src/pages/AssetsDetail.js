import React, { useState, useEffect, useRef } from "react";
import "./sass/style.scss";
import ReactPaginate from "react-paginate";
import ReactDOM from "react-dom";
import useDebounce from "../hooks/useDebounce";
import Loading from "../components/loading";
import importIcon from "../components/assets/importIcon.png";
import addIcon from "../components/assets/importIcon.png";
import assetInfo from "../components/assets/assetInfo.png";
import assetInfo1 from "../components/assets/assetInfo1.png";
import assetInfo2 from "../components/assets/assetInfo2.png";
import { LuFilter } from "react-icons/lu";
import { FaRegFileAlt } from "react-icons/fa";
import { Select, Space } from "antd";

import { useNavigate } from "react-router-dom";

const AssetsDetail = () => {
  const [assetData, setAssetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [excelData, setExcelData] = useState(null);
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [assetsPerPage, setAssetsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  //filterDate
  const [fromDate, setFromDate] = useState("2014-12-24");
  const [toDate, setToDate] = useState("2023-12-24");
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const fromDateDebounce = useDebounce(fromDate, 500);
  const toDateDebounce = useDebounce(toDate, 500);
  //filterUser
  const [userName, setUserName] = useState("namenull");
  const userDebounce = useDebounce(userName, 500);

  //typeAsset
  const [assetType, setAssetType] = useState([]);
  const [selectedValue, setSelectedValue] = useState(-1); // 'all' or some default value

  //inforTotal
  const [totalAsset, setTotalAsset] = useState(0); // 'all' or some default value
  const [totalDepri, setTotalDepri] = useState(0); // 'all' or some default value
  const [totalUser, setTotalUser] = useState(0); // 'all' or some default value

  //depart
  const [department, setDepartment] = useState("");
  const [selectedDeptValue, setSelectedDeptValue] = useState(-1); // 'all' or some default value
  const [selectedGroupValue, setSelectedGroupValue] = useState(-1); // 'all' or some default value

  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before starting the API call

        const response = await fetch(
          `http://localhost:8080/api/asset/filter?page=${currentPage}&size=${assetsPerPage}&fromDate=${fromDate}&toDate=${toDate}&name=${userName}&assetType=${selectedValue}&dept=${selectedDeptValue}`
        );

        const data = await response.json();
        console.log("data", data);
        setTotalPage(data.data.totalPage);
        setAssetData(data);
      } catch (error) {
        // console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [
    currentPage,
    fromDateDebounce,
    toDateDebounce,
    userDebounce,
    selectedValue,
    selectedDeptValue,
  ]);

  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/asset/type`);

        const data = await response.json();
        console.log("AssetType", data);
        // setTotalPage(data.data.totalPage);
        setAssetType(data);
      } catch (error) {}
    };

    fetchData();
  }, []);
  //Count Asset
  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/asset/count`);

        const data = await response.json();
        setTotalAsset(data);
      } catch (error) {}
    };

    fetchData();
  }, []);
  //Count Depreciate
  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/depreciation/count`
        );

        const data = await response.json();
        setTotalDepri(data);
      } catch (error) {}
    };

    fetchData();
  }, []);
  //Count User
  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/count`);

        const data = await response.json();
        setTotalUser(data);
      } catch (error) {}
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/department`
        );

        const data = await response.json();
        console.log("depart", data);
        setDepartment(data);
      } catch (error) {}
    };

    fetchData();
  }, []);
  console.log("department", department);
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

  const handleUserChange = (e) => {
    setUserName(e);
  };

  const formatNumber = (number) => {
    return number
      ? number.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })
      : 0;
  };
  return (
    <div className="asset__content">
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
                placeholder="Tìm kiếm tài sản"
                value={userName != "namenull" ? userName : ""}
                onChange={(e) => handleUserChange(e.target.value)}
              />
              <div className="search-box__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="gray"
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
      </div>
      <div className="asset-content__sellection">
        <div className="content-sellection__infor">
          <div className="info">
            <img src={assetInfo} alt="" />
            <div>
              <p className="info-title">Tổng cộng tài sản</p>
              <h2 className="info-number">{totalAsset}</h2>
            </div>
          </div>
          <div className="info">
            <img src={assetInfo1} alt="" />
            <div>
              <p className="info-title">Chi phí khâu hao</p>
              <h2 className="info-number">{formatNumber(totalDepri)}</h2>
            </div>
          </div>
          <div className="info">
            <img src={assetInfo2} alt="" />
            <div>
              <p className="info-title">Người sử dụng</p>
              <h2 className="info-number">{totalUser}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="asset-content__detail">
        <div className="content-sellection ">
          <div className="content-sellection__state">
            <span className="filter-title">
              {" "}
              <LuFilter size={"12px"} />
              Nhóm tài sản
            </span>
            <div className="state-dropdown">
              <Space wrap>
                <Select
                  value={selectedDeptValue}
                  style={{
                    width: 120,
                  }}
                  onChange={(e) => setSelectedGroupValue(e)}
                  dropdownMatchSelectWidth={false}
                >
                  <Option value={-1}>Tất cả</Option>
                  {!loading &&
                    department?.listDepartment?.map((asset, key) => (
                      <Option key={asset.id} value={asset.id}>
                        {asset.name}
                      </Option>
                    ))}
                </Select>
              </Space>
            </div>
          </div>
          <div className="content-sellection__state">
            <span className="filter-title">
              {" "}
              <LuFilter size={"12px"} />
              Loại tài sản:
            </span>
            <div className="state-dropdown">
              <Space wrap>
                <Select
                  value={selectedValue}
                  style={{
                    width: 120,
                  }}
                  onChange={(e) => setSelectedValue(e)}
                  dropdownMatchSelectWidth={false}
                >
                  <Option value={-1}>Tất cả</Option>
                  {!loading &&
                    assetType?.map((asset) => (
                      <Option key={asset.id} value={asset.id}>
                        {asset.assetName}
                      </Option>
                    ))}
                </Select>
              </Space>
            </div>
          </div>
          <div className="content-sellection__state">
            <span className="filter-title">
              {" "}
              <LuFilter size={"12px"} />
              Phòng Ban:
            </span>
            <div className="state-dropdown">
              <Space wrap>
                <Select
                  value={selectedDeptValue}
                  style={{
                    width: 120,
                  }}
                  onChange={(e) => setSelectedDeptValue(e)}
                  dropdownMatchSelectWidth={false}
                >
                  <Option value={-1}>Tất cả</Option>
                  {!loading &&
                    department?.listDepartment?.map((asset, key) => (
                      <Option key={asset.id} value={asset.id}>
                        {asset.name}
                      </Option>
                    ))}
                </Select>
              </Space>
            </div>
          </div>
          <div className="content-sellection__state">
            <div className="sellection-date">
              <div className="date">
                <span>
                  {" "}
                  <LuFilter size={"12px"} />
                  Ngày nhập kho:
                </span>
                <div className="date-sellect">
                  <div className="date-title">
                    <div>Từ ngày</div>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => handleDateChange(e, "from")}
                    />
                  </div>
                  <div className="date-title">
                    <div>Đến ngày</div>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => handleDateChange(e, "to")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="importExcel">
            <span>Nhập file excel:</span>
            <label htmlFor="fileInput" className="customFileInput">
              <FaRegFileAlt />
              File
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
                <pre>{JSON.stringify(excelData, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr></tr>
              <tr>
                <th className="stick">Tài sản</th>
                <th>Phòng ban sử dụng</th>
                <th>Người sử dụng</th>
                <th>Kiểu tài sản</th>
                <th>Nhóm tài sản</th>
                <th>Ngày nhập kho</th>
                <th>Trạng thái</th>
                <th>Nguyên giá</th>
                <th>Kích hoạt</th>
              </tr>
            </thead>
            {loading && <Loading />}
            <tbody>
              {!loading &&
                assetData?.data.assets.map((asset, index) => (
                  <tr key={asset.assetId}>
                    <td className="stick-header">
                      {" "}
                      <div
                        onClick={() =>
                          navigate(`/asset/details/${asset.assetId}`)
                        }
                      >
                        {asset.assetName}
                      </div>
                    </td>
                    <td style={{ fontWeight: "600" }}>
                      {asset?.user?.dept.name}
                    </td>
                    <td style={{ fontWeight: "600" }}>
                      <div className="user-item">
                        <div className={asset?.user?.image ? "image" : ""}>
                          <img src={asset?.user?.image} alt="" />
                        </div>
                        {asset?.user?.fullName}
                      </div>
                    </td>
                    <td>{asset.assetTypeName}</td>
                    <td>{asset.assetGroup || "Sản xuất"}</td>
                    <td>{asset.dateInStored}</td>
                    <td>{asset.statusName}</td>
                    <td>{formatNumber(asset.price)}</td>
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
      <div className="paging-wrapper">
        {" "}
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          previousLabel="<"
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
    </div>
  );
};

export default AssetsDetail;
