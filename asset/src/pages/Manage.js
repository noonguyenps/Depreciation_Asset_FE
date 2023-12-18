import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./sass/style.scss";
import "./sass/manage.scss";

import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const Manage = () => {
  const [loading, setLoading] = useState(false);
  const [depriData, setDepriData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedId = localStorage.getItem("currentAssetId");
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/asset/delivery/${storedId}`
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
  console.log("manage", depriData);

  return (
    <div>
      <div className="asset__contain">
        <h2>Thông tin quản lý</h2>
        <div className="depri__content">
          {depriData && (
            <>
              <div className="asset__detail">
                <div className="asset-info">
                  <div className="asset-info__input">
                    {" "}
                    <label htmlFor="maTaiSan">Kho hàng</label>
                    <input type="text" value={depriData.storageName} disabled />
                  </div>
                  <div className="asset-info__input">
                    <label htmlFor="tenTaiSan">Quản lý kho</label>
                    <input type="text" value="Nguyễn Văn Trỗi" disabled />
                  </div>
                </div>

                <div className="asset-info">
                  <div className="asset-info__input">
                    {" "}
                    <label htmlFor="maTaiSan">Ngày nhập kho</label>
                    <input
                      type="date"
                      value={depriData.dateInStored}
                      disabled
                    />
                  </div>
                  <div className="asset-info__input">
                    <label htmlFor="tenTaiSan">Địa chỉ kho</label>
                    <input
                      type="text"
                      value={depriData.storageLocation}
                      disabled
                    />
                  </div>
                </div>
                <div className="asset-info">
                  <div className="asset-info__input">
                    {" "}
                    <label htmlFor="maTaiSan">Người sử dụng</label>
                    <input
                      type="text"
                      value={depriData?.userResponse?.fullName}
                      disabled
                    />
                  </div>
                  <div className="asset-info__input">
                    <label htmlFor="tenTaiSan">Phòng ban hiện tại</label>
                    <input
                      type="text"
                      value={depriData.userResponse?.dept.name}
                      disabled
                    />
                  </div>
                </div>
                <div className="asset-info">
                  <div className="asset-info__input">
                    {" "}
                    <label htmlFor="maTaiSan">Vị trí hiện tại</label>
                    <input
                      type="text"
                      value={depriData.userResponse?.dept.location}
                      disabled
                    />
                  </div>
                  <div className="asset-info__input">
                    <label htmlFor="tenTaiSan">Ngày đưa vào sử dụng</label>
                    <input type="date" value={depriData.dateUsed} disabled />
                  </div>
                </div>
              </div>
              <div className="table-container">
                <h4>Lịch sử cấp phát - thu hồi</h4>

                <div className="depri-infor">
                  <table className="table-parent">
                    <thead>
                      <tr className="header-table">
                        <th>Hoạt động</th>
                        <th>Người sử dụng</th>
                        <th>Phòng ban</th>
                        <th>Vị trí hiện tại</th>
                        <th>Ngày giao dịch</th>
                        <th>Nhân viên kho</th>
                        <th>Tình trạng tài sản</th>
                        <th>Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading &&
                        depriData?.deliveryHistories?.map((item, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>{item.deliveryType}</td>
                              <td>{item.userResponse.fullName}</td>
                              <td>{item.userResponse?.dept?.name}</td>
                              <td>{item.userResponse?.dept.location}</td>
                              <td>{item.deliveryDate}</td>
                              <td>Nguyễn Văn Tiến</td>
                              <td>Đang sử dụng</td>
                              <td>{item.note}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="table-container">
                <h4>Mất - Thanh lý - Huỷ bỏ</h4>

                <div className="depri-infor">
                  <table className="table-parent">
                    <thead>
                      <tr className="header-table">
                        <th>Hoạt động</th>
                        <th>Người sử dụng</th>
                        <th>Phòng ban</th>
                        <th>Vị trí hiện tại</th>
                        <th>Ngày giao dịch</th>
                        <th>Nhân viên kho</th>
                        <th>Tình trạng tài sản</th>
                        <th>Giá trị còn lại</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manage;
