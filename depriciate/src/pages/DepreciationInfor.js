import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./sass/style.scss";
import Loading from "../components/Loading";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const DepreciationInfor = () => {
  const [loading, setLoading] = useState(false);
  const [showChildRow, setShowChildRow] = useState({});

  const { id } = useParams(); // Get the id from the URL
  const [depriData, setDepriData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const storedId = localStorage.getItem("currentAssetId");
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/depreciation/asset/${storedId}`
        )
          .then((res) => res.json())
          .then((data) => setDepriData(data))
          .catch((err) => {})
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log("depri", depriData);

  const handleToggleChildRow = (itemId) => {
    setShowChildRow((prevShowChildRows) => ({
      ...prevShowChildRows,
      [itemId]: !prevShowChildRows[itemId],
    }));
  };
  const formatNumber = (number) => {
    return number
      ? number.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })
      : 0;
  };
  return (
    <div>
      <div className="asset__contain">
        <h2>Thông tin khấu hao</h2>
        <div className="depri__content">
          {depriData && (
            <div className="asset__detail">
              <div className="asset-info">
                <div className="asset-info__input">
                  {" "}
                  <label htmlFor="maTaiSan">Mã tài sản</label>
                  <input type="text" value={depriData.assetId} />
                </div>
                <div className="asset-info__input">
                  <label htmlFor="tenTaiSan">Tên Tài Sản</label>
                  <input type="text" value={depriData.assetName} />
                </div>
              </div>
              <div className="asset-info">
                <div className="asset-info__input">
                  <label htmlFor="nguyenGia">Nguyên Giá</label>
                  <input type="text" value={formatNumber(depriData.price)} />
                </div>
                <div className="asset-info__input">
                  <label htmlFor="kieuTaiSan">Thời gian phân bổ</label>
                  <input type="text" value={depriData.amountMonth + " tháng"} />
                </div>
              </div>
              <div className="asset-info">
                <div className="asset-info__input">
                  {" "}
                  <label htmlFor="nhomTaiSan">Ngày bắt đầu phân bổ</label>
                  <input type="date" value={depriData.fromDate} />
                </div>
                <div className="asset-info__input">
                  {" "}
                  <label htmlFor="ngayMua">Ngày kết thúc phân bổ</label>
                  <input type="date" value={depriData.expDate} />
                </div>
              </div>
              <div className="asset-info">
                <div className="asset-info__input">
                  {" "}
                  <label htmlFor="ngayMua">Luỹ kế kỳ trước</label>
                  <input
                    type="text"
                    value={formatNumber(depriData.valuePrev)}
                  />
                </div>
                <div className="asset-info__input">
                  <label htmlFor="donViTinh">Số ngày trong tháng này</label>
                  <input type="text" value={depriData.changePrice} />
                </div>
              </div>

              <div className="asset-info">
                <div className="asset-info__input">
                  {" "}
                  <label htmlFor="soSerial">Số ngày tính khấu hao</label>
                  <input type="text" value={depriData.amountDate} />
                </div>
                <div className="asset-info__input">
                  {" "}
                  <label htmlFor="soSerial">Số khấu hao kỳ này</label>
                  <input type="text" value={formatNumber(depriData.valuePre)} />
                </div>
              </div>
              <div className="asset-info">
                <div className="asset-info__input">
                  {" "}
                  <label htmlFor="soSerial">Luỹ kế</label>
                  <input
                    type="text"
                    value={formatNumber(
                      depriData.valuePre + depriData.valuePrev
                    )}
                  />
                </div>
                <div className="asset-info__input">
                  {" "}
                  <label htmlFor="soSerial">Giá trị còn lại</label>
                  <input
                    type="text"
                    value={formatNumber(depriData.totalValue)}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="table-container">
            <h4>Lịch sử khấu hao</h4>
            <div className="depri-infor">
              <table className="table-parent">
                <thead>
                  <tr className="header-table">
                    <th>Người sử dụng</th>
                    <th>Phòng ban sử dụng</th>
                    <th>Ngày bắt đầu phân bổ</th>
                    <th>Ngày kết thúc phân bổ</th>
                    <th>Luỹ kế phòng ban</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    depriData?.listDepreciationAssetHistory?.map(
                      (item, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>
                              <div className="user-item">
                                <div className="image">
                                  <img src={item.userResponse.image} alt="" />
                                </div>
                                {item.userResponse.fullName}
                              </div>
                            </td>
                            <td>{item.userResponse.dept.name}</td>
                            <td>{item.fromDate}</td>
                            <td>{item.toDate}</td>
                            <td>{formatNumber(item.value)}</td>
                            <td
                              onClick={() =>
                                handleToggleChildRow(item.depreciationId)
                              }
                            >
                              {showChildRow[item.depreciationId] ? (
                                <FaAngleDown />
                              ) : (
                                <FaAngleRight />
                              )}
                            </td>
                          </tr>
                          <tr
                            className="table-child__wrapper"
                            style={{
                              display: showChildRow[item.depreciationId]
                                ? "table-row"
                                : "none",
                            }}
                          >
                            <td className="table-child" colSpan={12}>
                              <div className="table-scroll">
                                {item.depreciationList.map((subItem, index) => (
                                  <table
                                    className="table-child__content"
                                    key={index}
                                  >
                                    <thead>
                                      <tr className="table-header">
                                        <th>{"Năm " + subItem.year}</th>
                                        <th>Tháng 1</th>
                                        <th>Tháng 2</th>
                                        <th>Tháng 3</th>
                                        <th>Tháng 4</th>
                                        <th>Tháng 5</th>
                                        <th>Tháng 6</th>
                                        <th>Tháng 7</th>
                                        <th>Tháng 8</th>
                                        <th>Tháng 9</th>
                                        <th>Tháng 10</th>
                                        <th>Tháng 11</th>
                                        <th>Tháng 12</th>
                                        <th>Tổng KH</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>Số KH trong tháng</td>
                                        <td>
                                          {formatNumber(subItem.months[1])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[2])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[3])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[4])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[5])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[6])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[7])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[8])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[9])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[10])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[11])}
                                        </td>
                                        <td>
                                          {formatNumber(subItem.months[12])}
                                        </td>

                                        <td>
                                          {formatNumber(
                                            (subItem.months[1]
                                              ? subItem.months[1]
                                              : 0) +
                                              (subItem.months[2]
                                                ? subItem.months[2]
                                                : 0) +
                                              (subItem.months[3]
                                                ? subItem.months[3]
                                                : 0) +
                                              (subItem.months[4]
                                                ? subItem.months[4]
                                                : 0) +
                                              (subItem.months[5]
                                                ? subItem.months[5]
                                                : 0) +
                                              (subItem.months[6]
                                                ? subItem.months[6]
                                                : 0) +
                                              (subItem.months[7]
                                                ? subItem.months[7]
                                                : 0) +
                                              (subItem.months[8]
                                                ? subItem.months[8]
                                                : 0) +
                                              (subItem.months[9]
                                                ? subItem.months[9]
                                                : 0) +
                                              (subItem.months[10]
                                                ? subItem.months[10]
                                                : 0) +
                                              (subItem.months[11]
                                                ? subItem.months[11]
                                                : 0) +
                                              (subItem.months[12]
                                                ? subItem.months[12]
                                                : 0)
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Số ngày phân bổ</td>
                                        <td>
                                          {subItem.dates[1]
                                            ? subItem.dates[1]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[2]
                                            ? subItem.dates[2]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[3]
                                            ? subItem.dates[3]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[4]
                                            ? subItem.dates[4]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[5]
                                            ? subItem.dates[5]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[6]
                                            ? subItem.dates[6]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[7]
                                            ? subItem.dates[7]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[8]
                                            ? subItem.dates[8]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[9]
                                            ? subItem.dates[9]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[10]
                                            ? subItem.dates[10]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[11]
                                            ? subItem.dates[11]
                                            : "-"}
                                        </td>
                                        <td>
                                          {subItem.dates[12]
                                            ? subItem.dates[12]
                                            : "-"}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                ))}
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepreciationInfor;
