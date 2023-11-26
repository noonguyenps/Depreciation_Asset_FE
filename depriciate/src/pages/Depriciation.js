import React, { useState, useEffect, useRef } from "react";
import "./sass/style.scss";
import Loading from "../components/loading";
import ReactPaginate from "react-paginate";

const Depriciation = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [assetsPerPage, setAssetsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  // Dữ liệu mẫu
  const [viewMode, setViewMode] = useState("year");
  const [viewYear, setViewYear] = useState(2023);
  const [viewMonth, setViewMonth] = useState(1);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);

    // Nếu chọn chế độ "view theo năm", tự động tắt chức năng "view theo tháng"
    if (mode === "year") {
      setViewMonth(1);
    }
  };

  const handleYearChange = (year) => {
    setViewYear(year);
  };

  const handleMonthChange = (month) => {
    setViewMonth(month);
  };

  const monthlyColumns = [
    <th key="9">Luỹ kế kỳ trước</th>,
    <th key="10">Luỹ kế kỳ này</th>,
    <th key="11">Luỹ kế</th>,
    <th key="12">Giá trị còn lại</th>,
  ];

  const yearlyColumns = [
    <th key="9">Khấu hao luỹ kế đầu năm</th>,
    <th key="10">Gía trị còn lại đầu năm</th>,
    <th key="11">Tháng 1</th>,
    <th key="12">Tháng 2</th>,
    <th key="13">Tháng 3</th>,
    <th key="14">Tháng 4</th>,
    <th key="15">Tháng 5</th>,
    <th key="16">Tháng 6</th>,
    // Thêm các tháng khác tùy thuộc vào nhu cầu
  ];
  const data = [
    {
      taiSan: "Tài sản 1",
      maTaiSan: "TS001",
      ngayPhanBo: "01/01/2022",
      nguyenGia: 100000000, // Đơn vị VND
      soThangTrikhauHao: 36,
      bienDongNguyenGia: 5000000, // Đơn vị VND
      mucTrikhauHaoThang: 5000000, // Đơn vị VND
      soNgayTrongThang: 30,
      soNgayTinhKH: 30,
      luyKeKyTruoc: 150000000, // Đơn vị VND
      luyKeKyNay: 200000000, // Đơn vị VND
      luyKe: 200000000, // Đơn vị VND
      giaTriConLai: 80000000, // Đơn vị VND
    },
    {
      taiSan: "Tài sản 2",
      maTaiSan: "TS002",
      ngayPhanBo: "01/02/2022",
      nguyenGia: 80000000, // Đơn vị VND
      soThangTrikhauHao: 24,
      bienDongNguyenGia: 4000000, // Đơn vị VND
      mucTrikhauHaoThang: 4000000, // Đơn vị VND
      soNgayTrongThang: 30,
      soNgayTinhKH: 30,
      luyKeKyTruoc: 100000000, // Đơn vị VND
      luyKeKyNay: 120000000, // Đơn vị VND
      luyKe: 120000000, // Đơn vị VND
      giaTriConLai: 20000000, // Đơn vị VND
    },
    {
      taiSan: "Tài sản 2",
      maTaiSan: "TS002",
      ngayPhanBo: "01/02/2022",
      nguyenGia: 80000000, // Đơn vị VND
      soThangTrikhauHao: 24,
      bienDongNguyenGia: 4000000, // Đơn vị VND
      mucTrikhauHaoThang: 4000000, // Đơn vị VND
      soNgayTrongThang: 30,
      soNgayTinhKH: 30,
      luyKeKyTruoc: 100000000, // Đơn vị VND
      luyKeKyNay: 120000000, // Đơn vị VND
      luyKe: 120000000, // Đơn vị VND
      giaTriConLai: 20000000, // Đơn vị VND
    },
    {
      taiSan: "Tài sản 2",
      maTaiSan: "TS002",
      ngayPhanBo: "01/02/2022",
      nguyenGia: 80000000, // Đơn vị VND
      soThangTrikhauHao: 24,
      bienDongNguyenGia: 4000000, // Đơn vị VND
      mucTrikhauHaoThang: 4000000, // Đơn vị VND
      soNgayTrongThang: 30,
      soNgayTinhKH: 30,
      luyKeKyTruoc: 100000000, // Đơn vị VND
      luyKeKyNay: 120000000, // Đơn vị VND
      luyKe: 120000000, // Đơn vị VND
      giaTriConLai: 20000000, // Đơn vị VND
    },
    {
      taiSan: "Tài sản 2",
      maTaiSan: "TS002",
      ngayPhanBo: "01/02/2022",
      nguyenGia: 80000000, // Đơn vị VND
      soThangTrikhauHao: 24,
      bienDongNguyenGia: 4000000, // Đơn vị VND
      mucTrikhauHaoThang: 4000000, // Đơn vị VND
      soNgayTrongThang: 30,
      soNgayTinhKH: 30,
      luyKeKyTruoc: 100000000, // Đơn vị VND
      luyKeKyNay: 120000000, // Đơn vị VND
      luyKe: 120000000, // Đơn vị VND
      giaTriConLai: 20000000, // Đơn vị VND
    },
    // Thêm dữ liệu mẫu cho các tài sản khác
  ];
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="depri-container">
      <div className="content-top">
        <div className="content-top__header">
          <div className="content-top__title">
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
            <label>Chọn chế độ xem:</label>
            <select
              value={viewMode}
              onChange={(e) => handleViewModeChange(e.target.value)}
              className="option-sellect"
              style={{ width: "100px" }}
            >
              <option value="year">Theo năm</option>
              <option value="month">Theo tháng</option>
            </select>
          </div>
          {viewMode === "year" && (
            <div>
              <label>Chọn năm:</label>
              <select
                value={viewYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="option-sellect"
                style={{ width: "70px" }}
              >
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
                {/* Thêm các năm khác tùy thuộc vào nhu cầu */}
              </select>
            </div>
          )}
          {viewMode === "month" && (
            <div>
              <label>Chọn tháng:</label>
              <select
                value={viewMonth}
                onChange={(e) => handleMonthChange(e.target.value)}
              >
                <option value={1}>Tháng 1</option>
                <option value={2}>Tháng 2</option>
                {/* Thêm các tháng khác tùy thuộc vào nhu cầu */}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="depri-content__detail">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Tài sản</th>
                <th>Mã tài sản</th>
                <th>Ngày phân bổ</th>
                <th>Nguyên giá</th>
                <th>Số tháng trích khấu hao</th>
                <th>Biến động nguyên giá</th>
                <th>Mức trích khấu hao tháng</th>
                <th>Số ngày trong tháng</th>
                <th>Số ngày tính KH</th>
                {viewMode === "monthly" ? monthlyColumns : yearlyColumns}
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.taiSan}</td>
                  <td>{item.maTaiSan}</td>
                  <td>{item.ngayPhanBo}</td>
                  <td>{item.nguyenGia}</td>
                  <td>{item.soThangTrikhauHao}</td>
                  <td>{item.bienDongNguyenGia}</td>
                  <td>{item.mucTrikhauHaoThang}</td>
                  <td>{item.soNgayTrongThang}</td>
                  <td>{item.soNgayTinhKH}</td>
                  <td>{item.luyKeKyTruoc}</td>
                  <td>{item.luyKeKyNay}</td>
                  <td>{item.luyKe}</td>
                  <td>{item.giaTriConLai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="paging">
          {" "}
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            pageCount="7"
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
    </div>
  );
};

export default Depriciation;
