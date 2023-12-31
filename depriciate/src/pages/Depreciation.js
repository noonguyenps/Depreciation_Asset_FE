import React, { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import "./sass/style.scss";
import { Select, Space, Checkbox } from "antd";
import { LuFilter } from "react-icons/lu";
import { RiInstallLine } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import classnames from "classnames";

import { MdCalculate, MdArrowDropDown, MdArrowRight } from "react-icons/md";

const Depreciation = () => {
  const [depriData, setDepriData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  const [assetsPerPage, setAssetsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  // Dữ liệu mẫu
  const [viewYear, setViewYear] = useState(2016);

  const currentYear = new Date().getFullYear();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/depreciation/history/dept?year=${viewYear}&ids=${selectedDepartment}`
        );
        if (!response.ok) {
          // Handle non-successful HTTP status (error)
          console.error(`Error fetching data. Status: ${response.status}`);
          setLoading(false);
          return;
        }

        const data = await response.json();
        // setTotalPage(data.data.totalPage);
        setDepriData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, viewYear, selectedDepartment]);
  console.log("depriData", depriData);
  const handleYearChange = (sellectedYear) => {
    setViewYear(sellectedYear);
  };

  const formatNumber = (number) => {
    return number
      ? number.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })
      : 0;
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/department`
        );

        const data = await response.json();
        setDepartment(data.data);
      } catch (error) {}
    };

    fetchData();
  }, []);
  const options = [
    // Default option with value 0
    { value: 0, label: "Tất cả" },
  ];
  console.log("department", department);
  if (department?.listDepartment) {
    for (let i = 0; i < department.listDepartment.length; i++) {
      const asset = department.listDepartment[i];
      options.push({
        value: asset.id,
        label: asset.name,
      });
    }
  }
  const handleDeptChange = (value) => {
    const isSelectAll = value.includes(0);
    if (isSelectAll && value.length > 1) {
      setSelectedDepartment(value.filter((v) => v !== 0));
    } else {
      setSelectedDepartment(isSelectAll ? [0] : value.filter((v) => v !== 0));
    }
  };

  const handleExportExcel = async () => {
    confirmAlert({
      title: "Xác nhận",
      message: "Bạn có chắc chắn muốn xuất dữ liệu ra Excel không?",
      buttons: [
        {
          label: "Có",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:8080/api/depreciation/history/dept/export/excel?year=${viewYear}&ids=${selectedDepartment}`
              );

              if (response.ok) {
                // Xử lý khi API trả về dữ liệu thành công, ví dụ: download file Excel
                const blob = await response.blob();
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement("a");
                a.href = url;
                a.download = `KhauHao_${viewYear}.xlsx`; // Tên file tải về
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              } else {
                console.error("Failed to fetch data from the API.");
              }
            } catch (error) {
              console.error("Error:", error);
            }
          },
        },
        {
          label: "Không",
          onClick: () => {
            // Xử lý khi người dùng chọn "Không"
          },
        },
      ],
    });
  };

  return (
    <div className="depri-container">
      <div className="content-top">
        <div className="content-top__header">
          <div className="content-top__title">
            <h2>Bảng tính và phân bổ</h2>
          </div>

          <div className="content-top__filter">
            {/* <div className="search-box">
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
            </div> */}
            <div className="content-sellection__state">
              <div className="state-dropdown">
                <div className="sellect-dept">
                  <Select
                    mode="multiple"
                    style={{
                      width: "100%",
                    }}
                    allowClear
                    placeholder="Please select"
                    defaultValue={[0]}
                    value={selectedDepartment}
                    onChange={handleDeptChange}
                    tokenSeparators={[","]}
                    options={options}
                  />
                </div>
              </div>
            </div>
            <div className="content-top__option">
              {/* <button
                className="button-view"
                style={{ width: "120px", fontSize: "12px" }}
              >
                Trích khấu hao
              </button> */}
              <div>
                <div className="state-dropdown">
                  <Space wrap>
                    <Select
                      value={viewYear}
                      onChange={handleYearChange}
                      className="option-select"
                      style={{ width: "130px" }}
                    >
                      <Option value={2015}>Năm: 2015</Option>
                      <Option value={2016}>Năm: 2016</Option>
                      <Option value={2017}>Năm: 2017</Option>
                      <Option value={2018}>Năm: 2018</Option>
                      <Option value={2019}>Năm: 2019</Option>
                      <Option value={2020}>Năm: 2020</Option>
                      <Option value={2021}>Năm: 2021</Option>
                      <Option value={2022}>Năm: 2022</Option>
                      <Option value={2023}>Năm: 2023</Option>
                      {/* Thêm các năm khác tùy thuộc vào nhu cầu */}
                    </Select>
                  </Space>
                </div>
              </div>
            </div>
            <div style={{ width: "40px" }}>
              <button class="Button" onClick={handleExportExcel}>
                <RiInstallLine size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="depri-content__detail">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th className="stick">
                  <div className="toggle-wrapper">
                    {submenuOpen ? (
                      <MdArrowDropDown
                        size={30}
                        className="toggle-icon"
                        onClick={toggleSubmenu}
                      />
                    ) : (
                      <MdArrowRight
                        size={30}
                        className="toggle-icon"
                        onClick={toggleSubmenu}
                      />
                    )}

                    <span style={{ marginLeft: "10px" }}>Loại tài sản</span>
                  </div>
                </th>
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
                    <tr className="main-row">
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
                      <td>{formatNumber(item.months[11])}</td>
                      <td>
                        {" "}
                        {formatNumber(item.months[12]) !== 0 &&
                        viewYear !== currentYear
                          ? formatNumber(item.months[12])
                          : "-"}
                      </td>
                      <td>
                        {item.months[10] && item.months[11] && item.months[12]
                          ? formatNumber(item.total4)
                          : "-"}
                      </td>
                      <td>
                        {" "}
                        {viewYear < currentYear
                          ? formatNumber(item.totalPrice)
                          : "-"}
                      </td>
                      <td>
                        {viewYear < currentYear
                          ? formatNumber(
                              item.totalPrice + item.depreciationPrev
                            )
                          : "-"}
                      </td>
                    </tr>
                    {item?.assetTypes.map(
                      (subItem, subIndex) =>
                        submenuOpen && (
                          <tr
                            key={`${index}-${subIndex}`}
                            className="tableRowTransition"
                          >
                            <td className="stick-header tableRowTransition popup">
                              {subItem.typeName}
                              {/* <div class="popup">{subItem.typeName}</div> */}
                            </td>
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
                            <td>
                              {" "}
                              {formatNumber(subItem.months[12]) !== 0 &&
                              viewYear !== currentYear
                                ? formatNumber(subItem.months[12])
                                : "-"}
                            </td>
                            {/* <td>{formatNumber(subItem.months[12])}</td> */}
                            <td>
                              {" "}
                              {viewYear < currentYear
                                ? formatNumber(subItem.total4)
                                : "-"}
                            </td>
                            <td>
                              {" "}
                              {viewYear < currentYear
                                ? formatNumber(subItem.totalPrice)
                                : "-"}
                            </td>
                            <td>
                              {viewYear < currentYear
                                ? formatNumber(
                                    subItem.totalPrice +
                                      subItem.depreciationPrev
                                  )
                                : "-"}
                            </td>
                          </tr>
                        )
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Depreciation;
