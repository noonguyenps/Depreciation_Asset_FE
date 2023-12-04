import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./sass/style.scss";
import Loading from "../components/Loading";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const DepricationInfor = () => {
  const [loading, setLoading] = useState(false);
  const [showChildRow, setShowChildRow] = useState(false);

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

  const handleToggleChildRow = () => {
    setShowChildRow(!showChildRow);
  };

  return (
    <div>
      <div className="asset__contain">
        <h2>Thông tin chung</h2>
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
                <input type="text" value={depriData.price} />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="nhomTaiSan">Ngày bắt đầu phân bổ</label>
                <input type="text" value={depriData.fromDate} />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="kieuTaiSan">Thời gian phân bổ</label>
                <input type="text" value={depriData.amountMonth} />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="ngayMua">Ngày kết thúc phân bổ</label>
                <input type="date" value={depriData.expDate} />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="ngayNhapKho">Biến động nguyên giá</label>
                <input type="text" value={depriData.changePrice} />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="ngayMua">Luỹ kế kỳ trước</label>
                <input type="text" value={depriData.valuePrev} />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="donViTinh">Số ngày trong tháng này</label>
                <input type="text" value={depriData.changePrice} />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="soSerial">Số ngày tính khấu hao</label>
                <input type="text" value={depriData.changePrice} />
              </div>
            </div>

            <div className="asset-info">
              <div className="asset-info__input">
                {" "}
                <label htmlFor="soSerial">Số khấu hao kỳ này</label>
                <input type="text" value="AA" />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="soSerial">Luỹ kế</label>
                <input type="text" value="AA" />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                {" "}
                <label htmlFor="soSerial">Giá trị còn lại</label>
                <input type="text" value="AA" />
              </div>
            </div>
          </div>
        )}
        <div className="table-container">
          <h2>Lịch sử khấu hao</h2>
          <table className="table-parent">
            <thead>
              <tr className="header-table">
                <th>Người sử dụng</th>
                <th>Phòng ban sử dụng</th>
                <th>Ngày bắt đầu sử dụng</th>
                <th>Ngày kết thúc</th>
                <th>Luỹ kế phòng ban</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                depriData?.listDepreciationAssetHistory?.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{item.userResponse.fullName}</td>
                      <td>{item.userResponse.dept.name}</td>
                      <td>{item.fromDate}</td>
                      <td>{item.toDate}</td>
                      <td>{item.value}</td>
                      <td onClick={handleToggleChildRow}>
                        {showChildRow ? <FaAngleUp /> : <FaAngleDown />}
                      </td>
                    </tr>
                    <tr
                      className="table-child"
                      style={{ display: showChildRow ? "table-row" : "none" }}
                    >
                      <td colSpan={7}>
                        <table>
                          <thead>
                            <tr>
                              <th>Năm 2023</th>
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
                            </tr>
                          </thead>
                          <tbody>
                            {item.depreciationList.map((subItem, index) => (
                              <tr>
                                <td>Số ngày</td>
                                <td>{subItem.months[1]}</td>
                                <td>{subItem.months[2]}</td>
                                <td>{subItem.months[3]}</td>
                                <td>{subItem.months[4]}</td>
                                <td>{subItem.months[5]}</td>
                                <td>{subItem.months[6]}</td>
                                <td>{subItem.months[7]}</td>
                                <td>{subItem.months[8]}</td>
                                <td>{subItem.months[9]}</td>
                                <td>{subItem.months[10]}</td>
                                <td>{subItem.months[11]}</td>
                                <td>{subItem.months[12]}</td>
                              </tr>
                            ))}

                            <tr>
                              <td>Số tiền</td>
                              <td>100000</td>
                              <td>100000</td>
                              <td>100000</td>
                              <td>100000</td>
                              <td>100000</td>
                              <td>100000</td>
                              <td>100000</td>
                              <td>100000</td>
                              <td>100000</td>
                              <td>100000</td>
                              <td>100000</td>
                              <td>100000</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepricationInfor;
