import React, { useState, useEffect, useContext } from "react";
import "./sass/style.scss";
import { useParams } from "react-router-dom"; // Import useParams

const Asset = () => {
  const { id } = useParams(); // Get the id from the URL
  const [currentAssetId, setCurrentAssetId] = useState(1);
  const [assetData, setAssetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer = null;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/asset/${id}`);

        const data = await response.json();
        // setTotalPage(data.data.totalPage);
        setAssetData(data.data.asset);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  console.log(assetData);
  useEffect(() => {
    if (!isNaN(id)) {
      localStorage.setItem("currentAssetId", id);
    }
  }, [id]);
  const formatNumber = (number) => {
    return number
      ? number.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })
      : 0;
  };
  return (
    <div className="asset__contain">
      <h2>Thông tin chung</h2>
      <div className="depri__content">
        {assetData && (
          <div className="asset__detail">
            <div className="asset-image">
              <div class="image-container">
                <img src={assetData.assetImage} alt="" />
                <div class="image-border"></div>
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                {" "}
                <label htmlFor="maTaiSan">Mã tài sản</label>
                <input type="text" value={id} disabled />
              </div>
              <div className="asset-info__input">
                <label htmlFor="tenTaiSan">Tên Tài Sản</label>
                <input type="text" value={assetData.assetName} disabled />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="nguyenGia">Nguyên Giá</label>
                <input
                  type="text"
                  value={formatNumber(assetData.price)}
                  disabled
                />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="nhomTaiSan">Nhóm Tài Sản</label>
                <input type="text" value={assetData.assetGroup} disabled />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="kieuTaiSan">Kiểu Tài Sản</label>
                <input type="text" value={assetData.assetGroup} disabled />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="ngayMua">Ngày sử dụng</label>
                {assetData.dateUsed ? (
                  <input type="date" value={assetData.dateUsed} disabled />
                ) : (
                  <input
                    type="text"
                    value="Tài sản chưa được sử dụng"
                    disabled
                  />
                )}
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="ngayNhapKho">Ngày Nhập Kho</label>
                <input type="date" value={assetData.dateInStored} disabled />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="ngayMua">Số Lượng</label>
                <input type="text" value="1" disabled />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="donViTinh">Đơn Vị Tính</label>
                <input type="text" value="Chiếc" disabled />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="soSerial">Số serial</label>
                <input type="text" value={assetData.serial} disabled />
              </div>
            </div>

            <h2>Phụ kiện kèm theo</h2>
            {assetData.accessaries.map((item, index) => (
              <div className="asset-item" key={index}>
                <div className="asset-info__input">
                  <label htmlFor={`tenPhuKien_${index}`}>Tên phụ kiện</label>
                  <input
                    type="text"
                    id={`tenPhuKien_${index}`}
                    value={item.name}
                    disabled
                  />
                </div>
                <div className="asset-info__input">
                  <label htmlFor={`soLuong_${index}`}>Số lượng</label>
                  <input
                    type="text"
                    id={`soLuong_${index}`}
                    value={item.amount}
                    disabled
                  />
                </div>
                <div className="asset-info__input">
                  <label htmlFor={`donViTinh_${index}`}>Đơn vị tính</label>
                  <input
                    type="text"
                    id={`donViTinh_${index}`}
                    value={item.unit}
                    disabled
                  />
                </div>
                <div className="asset-info__input">
                  <label htmlFor={`nguyenGia_${index}`}>Nguyên giá VNĐ</label>
                  <input
                    type="text"
                    id={`nguyenGia_${index}`}
                    value={item.price}
                    disabled
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Asset;
