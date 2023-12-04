import React, { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import "./sass/style.scss";

const Depriciation = () => {
  const [depriData, setDepriData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const [assetsPerPage, setAssetsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  // Dữ liệu mẫu
  const [viewMode, setViewMode] = useState("year");
  const [viewYear, setViewYear] = useState(2023);
  const [viewMonth, setViewMonth] = useState(8);

  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/depreciation/dept/history?month=${viewMonth}&year=2023`
        );

        const data = await response.json();
        console.log("data", data);
        // setTotalPage(data.data.totalPage);
        setDepriData(data);
        console.log("viewMonth", viewMonth);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, viewMonth]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);

    if (mode === "year") {
      setViewMonth(1);
    }
  };
  const handleClick = () => {
    // Simulate a click and change the value
    const nextViewMode = viewMode === "year" ? "month" : "year";
    handleViewModeChange(nextViewMode);
  };

  const handleYearChange = (year) => {
    setViewYear(year);
  };

  const handleMonthChange = (month) => {
    setViewMonth(month);
  };
  const formatNumber = (number) => {
    return number
      ? number.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })
      : 0;
  };

  const monthlyColumns = [
    <th key="3">Mức trích KH tháng</th>,
    <th key="4">Luỹ kế kỳ trước</th>,
    <th key="5">Số KH kỳ này </th>,
    <th key="6">Luỹ kế </th>,
    <th key="7">Giá trị còn lại</th>,
  ];

  const yearlyColumns = [
    <th key="3">KH luỹ kế đầu năm</th>,
    <th key="4">Giá trị còn lại đầu năm</th>,
    <th key="5">Giá trị KH tháng 1 </th>,
    <th key="6">Giá trị KH tháng 2 </th>,
    <th key="7">Giá trị KH tháng 3 </th>,
    <th key="8">Giá trị KH tháng 4 </th>,
    <th key="9">Giá trị KH tháng 5 </th>,
    <th key="10">Giá trị KH tháng 6 </th>,
    <th key="11">Giá trị KH tháng 7 </th>,
    <th key="12">Giá trị KH tháng 8 </th>,
    <th key="13">Giá trị KH tháng 9 </th>,
    <th key="14">Giá trị KH tháng 10 </th>,
    <th key="15">Giá trị KH tháng 11 </th>,
    <th key="16">Giá trị KH tháng 12 </th>,

    // Thêm các tháng khác tùy thuộc vào nhu cầu
  ];

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="depri-container">
      <div className="content-top">
        <div className="content-top__header">
          <div className="content-top__title">
            <FaBoxOpen />
            <h2>Bảng tính và phân bổ</h2>
          </div>
          <div className="content-top__filter">
            <div className="search-box">
              <input
                type="text"
                className="search-box__input"
                placeholder="Tìm kiếm..."
                // value={userId}
                // onChange={(e) => handleUserChange(e.target.value)}
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
          <div className="content-top__option">
            <button
              value={viewMode}
              onChange={(e) => handleViewModeChange(e.target.value)}
              className="button-view"
              onClick={handleClick}
              style={{ width: "170px" }}
            >
              Trích khấu hao
            </button>
            <div>
              {viewMode === "year" && (
                <div>
                  <select
                    value={viewYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                    className="option-sellect"
                    style={{ width: "110px" }}
                  >
                    {" "}
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    {/* Thêm các năm khác tùy thuộc vào nhu cầu */}
                  </select>
                </div>
              )}
              {viewMode === "month" && (
                <div>
                  <select
                    value={viewMonth}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    className="option-sellect"
                    style={{ width: "110px" }}
                  >
                    <option value={1}>Tháng 1</option>
                    <option value={2}>Tháng 2</option>
                    <option value={3}>Tháng 3</option>
                    <option value={4}>Tháng 4</option>
                    <option value={5}>Tháng 5</option>
                    <option value={6}>Tháng 6</option>
                    <option value={7}>Tháng 7</option>
                    <option value={8}>Tháng 8</option>
                    <option value={9}>Tháng 9</option>
                    <option value={10}>Tháng 10</option>
                    <option value={11}>Tháng 11</option>

                    {/* Thêm các tháng khác tùy thuộc vào nhu cầu */}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="depri-content__detail">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th className="stick">Tài sản</th>
                <th>Nguyên giá</th>
                {viewMode === "month" ? monthlyColumns : yearlyColumns}
              </tr>
            </thead>

            <tbody>
              {depriData &&
                depriData?.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="main-row ">
                      <td className="stick-header">{item.deptName}</td>
                      <td>{formatNumber(item.totalPrice)}</td>
                      <td>{formatNumber(item.totalValuePerMonth)}</td>
                      <td>{formatNumber(item.totalValuePresent)}</td>
                      <td>{formatNumber(item.totalValuePrev)}</td>
                      <td>
                        {formatNumber(
                          item.totalValuePrev + item.totalValuePresent
                        )}
                      </td>
                      <td>
                        {formatNumber(
                          item.totalPrice -
                            (item.totalValuePrev + item.totalValuePresent)
                        )}
                      </td>
                    </tr>
                    {item?.assetTypes.map((subItem, subIndex) => (
                      <tr key={`${index}-${subIndex}`}>
                        <td className="stick-header">{subItem.typeName}</td>
                        <td>{formatNumber(subItem.price)}</td>
                        {viewMode === "month" && (
                          <>
                            <td>{formatNumber(subItem.valuePerMonth)}</td>
                            <td>{formatNumber(subItem.valuePrev)}</td>
                            <td>{formatNumber(subItem.valuePresent)} </td>
                            <td>
                              {formatNumber(
                                subItem.valuePresent + subItem.valuePrev
                              )}{" "}
                            </td>
                            <td>
                              {formatNumber(
                                subItem.price -
                                  (subItem.valuePresent + subItem.valuePrev)
                              )}{" "}
                            </td>
                          </>
                        )}
                        {viewMode === "year" && (
                          <>
                            {/* <td>{formatNumber(item.accumulatedYearPrev)}</td>
                        <td>{formatNumber(item.accumulatedPresentPrev)}</td>
                        <td>{formatNumber(item.months[1])}</td>
                        <td>{formatNumber(item.months[2])}</td>
                        <td>{formatNumber(item.months[3])}</td>
                        <td>{formatNumber(item.months[4])}</td>
                        <td>{formatNumber(item.months[5])}</td>
                        <td>{formatNumber(item.months[6])}</td>
                        <td>{formatNumber(item.months[7])}</td>
                        <td>{formatNumber(item.months[8])}</td>
                        <td>{formatNumber(item.months[9])}</td>
                        <td>{formatNumber(item.months[10])}</td>
                        <td>{formatNumber(item.months[11])}</td>
                        <td>{formatNumber(item.months[12])}</td> */}
                          </>
                        )}{" "}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="paging">
        {" "}
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          pageCount="1"
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

export default Depriciation;
