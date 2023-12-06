import React, { useState, useEffect, useContext } from "react";
import "./sass/style.scss";
import { useParams } from "react-router-dom"; // Import useParams
import IdContext from "../context/context";

const Asset = () => {
  const { id } = useParams(); // Get the id from the URL
  const [currentAssetId, setCurrentAssetId] = useState(1);
  const [assetData, setAssetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer = null;
    const storedId = localStorage.getItem("currentAssetId");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/asset/${storedId}`
        );

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

  return (
    <div className="asset__contain">
      <h2>Thông tin chung</h2>
      <div className="depri__content">
        {assetData && (
          <div className="asset__detail">
            <div className="asset-image">
              <div class="image-container">
                <img
                  src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <div class="image-border"></div>
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                {" "}
                <label htmlFor="maTaiSan">Mã tài sản</label>
                <input type="text" value={id} />
              </div>
              <div className="asset-info__input">
                <label htmlFor="tenTaiSan">Tên Tài Sản</label>
                <input type="text" value={assetData.assetName} />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="nguyenGia">Nguyên Giá</label>
                <input type="text" value={assetData.price} />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="nhomTaiSan">Nhóm Tài Sản</label>
                <input type="text" value={assetData.assetGroup} />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="kieuTaiSan">Kiểu Tài Sản</label>
                <input type="text" value={assetData.assetGroup} />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="ngayMua">Ngày sử dụng</label>
                <input type="date" value={assetData.dateUsed} />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="ngayNhapKho">Ngày Nhập Kho</label>
                <input type="date" value={assetData.dateInStored} />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="ngayMua">Số Lượng</label>
                <input type="text" value="1" />
              </div>
            </div>
            <div className="asset-info">
              <div className="asset-info__input">
                <label htmlFor="donViTinh">Đơn Vị Tính</label>
                <input type="text" value="Chiếc" />
              </div>
              <div className="asset-info__input">
                {" "}
                <label htmlFor="soSerial">Số serial</label>
                <input type="text" value={assetData.serial} />
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
                  />
                </div>
                <div className="asset-info__input">
                  <label htmlFor={`soLuong_${index}`}>Số lượng</label>
                  <input
                    type="text"
                    id={`soLuong_${index}`}
                    value={item.amount}
                  />
                </div>
                <div className="asset-info__input">
                  <label htmlFor={`donViTinh_${index}`}>Đơn vị tính</label>
                  <input
                    type="text"
                    id={`donViTinh_${index}`}
                    value={item.unit}
                  />
                </div>
                <div className="asset-info__input">
                  <label htmlFor={`nguyenGia_${index}`}>Nguyên giá VNĐ</label>
                  <input
                    type="text"
                    id={`nguyenGia_${index}`}
                    value={item.price}
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
