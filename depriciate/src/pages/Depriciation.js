import React, { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import "./sass/style.scss";

import { MdCalculate } from "react-icons/md";

const Depriciation = () => {
  const [depriData, setDepriData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const [assetsPerPage, setAssetsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  // Dữ liệu mẫu
  const [viewMode, setViewMode] = useState("year");
  const [viewYear, setViewYear] = useState(2016);
  const [viewMonth, setViewMonth] = useState(8);

  const currentYear = new Date().getFullYear();

  console.log("yearOfDate", currentYear);

  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/depreciation/history/dept?&year=${viewYear}`
        );

        const data = await response.json();
        console.log("data", data);
        // setTotalPage(data.data.totalPage);
        setDepriData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, viewYear]);
  console.log("depriData", depriData);
  const handleYearChange = (sellectedYear) => {
    setViewYear(sellectedYear);
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
            <div>
              <MdCalculate size={"2em"} fill="black" />
            </div>

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
            <div className="content-top__option">
              <button
                className="button-view"
                style={{ width: "120px", fontSize: "12px" }}
              >
                Trích khấu hao
              </button>
              <div>
                <div>
                  <select
                    value={viewYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                    className="option-sellect"
                    style={{ width: "130px" }}
                  >
                    {" "}
                    <option value={2015}>Năm: 2015</option>
                    <option value={2016}>Năm: 2016</option>
                    <option value={2017}>Năm: 2017</option>
                    <option value={2018}>Năm: 2018</option>
                    <option value={2019}>Năm: 2019</option>
                    <option value={2020}>Năm: 2020</option>
                    <option value={2021}>Năm: 2021</option>
                    <option value={2022}>Năm: 2022</option>
                    <option value={2023}>Năm: 2023</option>
                    {/* Thêm các năm khác tùy thuộc vào nhu cầu */}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="depri-content__detail">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th className="stick">Loại tài sản</th>
                <th style={{ color: "red" }}>Khấu hao luỹ kế đầu năm</th>
                <th>Giá trị KH tháng 1 </th>
                <th>Giá trị KH tháng 2 </th>
                <th>Giá trị KH tháng 3 </th>
                <th style={{ color: "red" }}>Tổng KH quý 1 </th>
                <th>Giá trị KH tháng 4 </th>
                <th>Giá trị KH tháng 5 </th>
                <th>Giá trị KH tháng 6 </th>
                <th style={{ color: "red" }}>Tổng KH quý 2 </th>
                <th>Giá trị KH tháng 7 </th>
                <th>Giá trị KH tháng 8 </th>
                <th>Giá trị KH tháng 9 </th>
                <th style={{ color: "red" }}>Tổng KH quý 3 </th>
                <th>Giá trị KH tháng 10 </th>
                <th>Giá trị KH tháng 11 </th>
                <th>Giá trị KH tháng 12 </th>
                <th style={{ color: "red" }}>Tổng KH quý 4 </th>
                <th style={{ color: "red" }}>Tổng KH năm </th>
                <th style={{ color: "red" }}>Khấu hao luỹ kế cuối năm </th>
              </tr>
            </thead>

            <tbody>
              {depriData &&
                depriData?.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="main-row ">
                      <td className="stick-header">
                        {"Phòng ban " + item.deptName}
                      </td>
                      <td>{formatNumber(item.depreciationPrev)}</td>
                      <td>{formatNumber(item.months[1])}</td>
                      <td>{formatNumber(item.months[2])}</td>
                      <td>{formatNumber(item.months[3])}</td>
                      <td>{formatNumber(item.total1)}</td>
                      <td>{formatNumber(item.months[4])}</td>
                      <td>{formatNumber(item.months[5])}</td>
                      <td>{formatNumber(item.months[6])}</td>
                      <td>{formatNumber(item.total2)}</td>
                      <td>{formatNumber(item.months[7])}</td>
                      <td>{formatNumber(item.months[8])}</td>
                      <td>{formatNumber(item.months[9])}</td>
                      <td>{formatNumber(item.total3)}</td>
                      <td>{formatNumber(item.months[10])}</td>
                      <td>
                        {formatNumber(item.months[11]) != 0
                          ? formatNumber(item.months[11])
                          : "-"}
                      </td>
                      <td>
                        {" "}
                        {formatNumber(item.months[12]) != 0
                          ? formatNumber(item.months[12])
                          : "-"}
                      </td>
                      <td>
                        {item.months[10] && item.months[11] && item.months[12]
                          ? formatNumber(item.total4)
                          : "-"}
                      </td>
                      <td>{formatNumber(item.totalPrice)}</td>
                      <td>
                        {viewYear < currentYear
                          ? formatNumber(
                              item.totalPrice + item.depreciationPrev
                            )
                          : "-"}
                      </td>
                    </tr>
                    {item?.assetTypes.map((subItem, subIndex) => (
                      <tr key={`${index}-${subIndex}`}>
                        <td className="stick-header">{subItem.typeName}</td>
                        <td>{formatNumber(subItem.depreciationPrev)}</td>
                        <td>{formatNumber(subItem.months[1])}</td>
                        <td>{formatNumber(subItem.months[2])}</td>
                        <td>{formatNumber(subItem.months[3])}</td>
                        <td>{formatNumber(subItem.total1)}</td>

                        <td>{formatNumber(subItem.months[4])}</td>
                        <td>{formatNumber(subItem.months[5])}</td>
                        <td>{formatNumber(subItem.months[6])}</td>
                        <td>{formatNumber(subItem.total2)}</td>

                        <td>{formatNumber(subItem.months[7])}</td>
                        <td>{formatNumber(subItem.months[8])}</td>
                        <td>{formatNumber(subItem.months[9])}</td>
                        <td>{formatNumber(subItem.total3)}</td>

                        <td>{formatNumber(subItem.months[10])}</td>
                        <td>{formatNumber(subItem.months[11])}</td>
                        <td>{formatNumber(subItem.months[12])}</td>
                        <td>{formatNumber(subItem.total4)}</td>
                        <td>{formatNumber(subItem.totalPrice)}</td>
                        <td>
                          {viewYear < currentYear
                            ? formatNumber(
                                subItem.totalPrice + subItem.depreciationPrev
                              )
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Depriciation;
