import React, { useState, useEffect, useRef } from "react";
import "./sass/style.scss";
import ReactPaginate from "react-paginate";
import ReactDOM from "react-dom";
import useDebounce from "../hooks/useDebounce";
import Loading from "../components/loading";
import importIcon from "../components/assets/importIcon.png";
import addIcon from "../components/assets/importIcon.png";
import assetInfo from "../components/assets/assetInfo.png";
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
  const [fromDate, setFromDate] = useState("2019-12-24");
  const [toDate, setToDate] = useState("2023-12-24");
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const fromDateDebounce = useDebounce(fromDate, 500);
  const toDateDebounce = useDebounce(toDate, 500);
  //filterUser
  const [userId, setUserId] = useState("");
  const userDebounce = useDebounce(userId, 500);

  //typeAsset
  const [assetType, setAssetType] = useState([]);
  const [selectedValue, setSelectedValue] = useState(-1); // 'all' or some default value

  //inforTotal
  const [totalAsset, setTotalAsset] = useState(0); // 'all' or some default value

  //depart
  const [department, setDepartment] = useState("");
  const [selectedDeptValue, setSelectedDeptValue] = useState(-1); // 'all' or some default value

  const navigate = useNavigate();

  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/asset/filter?page=${currentPage}&size=${assetsPerPage}&date?fromDate=${fromDate}&toDate=${toDate}&user=${userId}&assetType=${selectedValue}&dept=${selectedDeptValue}`
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
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/asset/count`);

        const data = await response.json();
        setTotalAsset(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/department`
        );

        const data = await response.json();
        console.log("depart", data);
        // setTotalPage(data.data.totalPage);
        setDepartment(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    console.log("selectedValue", selectedValue);
  };

  const handleUserChange = (e) => {
    setUserId(e);
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
          <div className="importExcel">
            <label htmlFor="fileInput" className="customFileInput">
              <img className="importIcon" src={importIcon} alt="" />
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
      </div>

      <div className="asset-content__sellection">
        <div className="content-sellection__infor">
          <div className="info">
            <img src={assetInfo} alt="" />
            <div>
              <p className="info-title">Tổng cộng tài sản</p>
              <h2 className="info-number">{totalAsset}</h2>
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
              <p className="info-title">Chi phí khâu hao</p>
              <h2 className="info-number">5,150,000</h2>
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
                <span className="info-change__color">100%</span>
                <span>tháng này</span>
              </div>
            </div>
          </div>
          <div className="info">
            <img src={assetInfo} alt="" />
            <div>
              <p className="info-title">Nhân viên</p>
              <h2 className="info-number">50</h2>
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
                <span className="info-change__color">100%</span>
                <span>tháng này</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="asset-content__detail">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th colSpan={10}>
                  {" "}
                  <div className="content-sellection">
                    <div className="content-sellection__state">
                      <span>Nhóm tài sản</span>
                      <div className="state-dropdown">
                        <select
                          // value={selectedValue}
                          style={{ width: "100px" }}
                          className="select-dropdown"
                        >
                          <option value="all">Tất cả</option>
                          <option value="1">Máy móc, thiết bị động lực</option>
                          <option value="2">Máy móc, thiết bị công tác</option>
                          <option value="3">
                            Dụng cụ làm việc đo lường, thí nghiệm
                          </option>
                          <option value="4">
                            Thiết bị và phương tiện vận tải
                          </option>
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
                      <span>Kiểu tài sản:</span>
                      <div className="state-dropdown">
                        <select
                          value={selectedValue}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          style={{ width: "100px" }}
                        >
                          <option value="all">Tất cả</option>
                          {!loading &&
                            assetType?.map((asset) => (
                              <option key={asset.id} value={asset.id}>
                                {asset.assetName}
                              </option>
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
                      <span>Phòng Ban:</span>
                      <div className="state-dropdown">
                        <select
                          value={selectedDeptValue}
                          onChange={(e) => setSelectedDeptValue(e.target.value)}
                          style={{ width: "100px" }}
                        >
                          <option value="-1">Tất cả</option>
                          {!loading &&
                            department?.data?.listDepartment.map(
                              (asset, key) => (
                                <option key={asset.id} value={asset.id}>
                                  {asset?.name}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                    </div>
                    <div className="content-sellection__state">
                      <div className="sellection-date">
                        <div className="date">
                          <span>Từ ngày:</span>
                          <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => handleDateChange(e, "from")}
                          />
                        </div>
                        <div className="date">
                          <span>Đến ngày:</span>
                          <input
                            type="date"
                            value={toDate}
                            onChange={(e) => handleDateChange(e, "to")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th>
                  {" "}
                  <input type="checkbox" />
                </th>
                <th>Tài sản</th>
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
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
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
                      {asset?.user?.fullName}
                    </td>
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
            <tfoot>
              <tr>
                <td colSpan="9" className="paging">
                  <div>
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
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetsDetail;
