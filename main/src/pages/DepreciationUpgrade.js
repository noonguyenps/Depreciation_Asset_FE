import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./sass/style.scss";
import Loading from "../components/Loading";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const DepreciationUpgrade = () => {
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
        <h2>Thông tin nâng cấp</h2>
        <div className="depri__content">
          {depriData && (
            <>
              <div className="asset__detail">
                <div className="asset-info">
                  <div className="asset-info__input">
                    {" "}
                    <label htmlFor="maTaiSan">Nguyên giá ban đầu</label>
                    <input type="text" value={depriData.storageName} />
                  </div>
                  <div className="asset-info__input">
                    <label htmlFor="tenTaiSan">Tổng chi phí nâng cấp</label>
                    <input type="text" value="{}" />
                  </div>
                </div>

                <div className="asset-info">
                  <div className="asset-info__input">
                    {" "}
                    <label htmlFor="maTaiSan">Nâng cấp gần nhất</label>
                    <input type="text" value={depriData.dateInStored} />
                  </div>
                  <div className="asset-info__input">
                    <label htmlFor="tenTaiSan">Ghi chú</label>
                    <input type="text" value={depriData.storageLocation} />
                  </div>
                </div>
                <div className="asset-info">
                  <div className="asset-info__input">
                    {" "}
                    <label htmlFor="maTaiSan">Thời gian phân bổ ban đầu</label>
                    <input
                      type="text"
                      value={depriData.userResponse.fullName}
                    />
                  </div>
                  <div className="asset-info__input">
                    <label htmlFor="tenTaiSan">Thời gian phân bổ thực tế</label>
                    <input
                      type="text"
                      value={depriData.userResponse.dept.name}
                    />
                  </div>
                </div>
              </div>
              <div className="table-container">
                <h4>Lịch sử nâng cấp</h4>

                <div className="depri-infor">
                  <table className="table-parent">
                    <thead>
                      <tr className="header-table">
                        <th>Vị trí hiện tại</th>
                        <th>Người sử dụng</th>
                        <th>Yêu cầu nâng cấp</th>
                        <th>Tình trạng</th>
                        <th>Ngày nâng cấp</th>
                        <th>Người thực hiện</th>
                        <th>Chi phí nâng cấp</th>
                        <th>Nguyên giá mới</th>
                        <th>Nội dung nâng cấp</th>
                        <th>Thời gian phân bổ thay đổi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading &&
                        depriData?.deliveryHistories?.map((item, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>{item.deliveryType}</td>
                              <td>{item.userResponse.fullName}</td>
                              <td>{item.userResponse.dept.name}</td>
                              <td>{item.userResponse.dept.location}</td>
                              <td>{item.deliveryDate}</td>
                              <td>{item.note}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                    </tbody>
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

export default DepreciationUpgrade;