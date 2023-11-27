import React from "react";
import "./sass/style.scss";

const Asset = () => {
  return (
    <div className="asset__contain">
      <h2>Thông tin chung</h2>
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
            <label htmlFor="maTaiSan">Mã Tài Sản</label>
            <input type="text" value="BX53 FSDF SD FS" />
          </div>
          <div className="asset-info__input">
            <label htmlFor="tenTaiSan">Tên Tài Sản</label>
            <input type="text" value="BX53 FSDF SD FS" />
          </div>
        </div>
        <div className="asset-info">
          <div className="asset-info__input">
            <label htmlFor="nguyenGia">Nguyên Giá</label>
            <input type="text" value="BX53 FSDF SD FS" />
          </div>
          <div className="asset-info__input">
            {" "}
            <label htmlFor="nhomTaiSan">Nhóm Tài Sản</label>
            <input type="text" value="BX53 FSDF SD FS" />
          </div>
        </div>
        <div className="asset-info">
          <div className="asset-info__input">
            <label htmlFor="kieuTaiSan">Kiểu Tài Sản</label>
            <input type="text" value="BX53 FSDF SD FS" />
          </div>
          <div className="asset-info__input">
            {" "}
            <label htmlFor="ngayMua">Ngày mua</label>
            <input type="date" value="20/10/2023" />
          </div>
        </div>
        <div className="asset-info">
          <div className="asset-info__input">
            <label htmlFor="ngayNhapKho">Ngày Nhập Kho</label>
            <input type="date" value="20/10/2023" />
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
            <input type="text" value="1" />
          </div>
        </div>
        <div className="asset-info">
          <div className="asset-info__input">
            <label htmlFor="soHopDong">Số Hợp Đồng</label>
            <input type="text" value="" />
          </div>
          <div className="asset-info__input">
            {" "}
            <label htmlFor="soSerial">Quy Cách Tài Sản</label>
            <input type="text" value="1" />
          </div>
        </div>
        <h2>Phụ kiện kèm theo</h2>
        <div className="asset-item">
          <div className="asset-info__input">
            <label htmlFor="soHopDong">Tên phụ kiện</label>
            <input type="text" value="" />
          </div>
          <div className="asset-info__input">
            {" "}
            <label htmlFor="soSerial">Số lượng</label>
            <input type="text" value="1" />
          </div>
          <div className="asset-info__input">
            <label htmlFor="soHopDong">Đơn vị tính</label>
            <input type="text" value="" />
          </div>
          <div className="asset-info__input">
            {" "}
            <label htmlFor="soSerial">Nguyên giá VNĐ</label>
            <input type="text" value="1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
