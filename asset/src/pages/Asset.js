import React, { useState, useEffect, useContext } from "react";
import "./sass/style.scss";
import { useParams } from "react-router-dom"; // Import useParams
import { Button, Modal, Select, Input } from "antd";

const Asset = () => {
  const { id } = useParams(); // Get the id from the URL
  const [currentAssetId, setCurrentAssetId] = useState(1);
  const [assetData, setAssetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRecallOpen, setIsModalRecallOpen] = useState(false);

  const [selectedDeptValue, setSelectedDeptValue] = useState(); // 'all' or some default value
  const [selectedUserValue, setSelectedUserValue] = useState(); // 'all'
  const [inputValue, setInputValue] = useState(""); // 'all'

  const [department, setDepartment] = useState([]);
  const [user, setUser] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalRecall = () => {
    setIsModalRecallOpen(true);
  };

  const handleCancelRecall = () => {
    setIsModalRecallOpen(false);
  };
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
  //Modal
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/department`
        );

        const data = await response.json();
        setDepartment(data.data.listDepartment);
      } catch (error) {}
    };

    fetchData();
  }, []);
  //userByDept
  useEffect(() => {
    const fetchData = async () => {
      let url;
      if (selectedDeptValue) {
        url = `http://localhost:8080/api/user/department/getUsers/${selectedDeptValue}`;
      } else {
        url = "http://localhost:8080/api/user?page=0&size=1000";
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setUser([]);
        }
        if (response.ok && !selectedDeptValue) {
          const data = await response.json();
          setUser(data.data.listUser);
        } else {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {}
    };

    fetchData();
  }, [selectedDeptValue]);
  console.log("user", user);
  const handleChangeDept = (e) => {
    setSelectedDeptValue(e);
  };
  const handleChangeUser = (e) => {
    setSelectedUserValue(e);
  };
  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  //submit form
  const submitForm = async (e) => {
    const requestBody = {
      userId: selectedUserValue,
      note: inputValue,
    };

    try {
      const response = await fetch(
        `http://localhost:8082/api/asset/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",

            // Add other headers as needed
          },
          credentials: "include",

          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        console.error("Failed to submit form:", response.statusText);
        return;
      }

      console.log("Form submitted successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  //recall
  const submitFormRecall = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/asset/recall/${id}?note=${encodeURIComponent(
          inputValue
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to submit form:", response.statusText);
        return;
      }

      console.log("Form submitted successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
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

            {assetData.accessaries.length > 0 ? <h2>Phụ kiện kèm theo</h2> : ""}
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
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "45px",
          }}
        >
          <Button
            type="primary"
            onClick={showModal}
            style={{
              width: "150px",
              display: assetData?.userIdUsed ? "none" : "block",
            }}
          >
            Bàn giao tài sản
          </Button>
          <Button
            type="primary"
            onClick={showModalRecall}
            style={{
              width: "150px",
              display: assetData?.userIdUsed ? "block" : "none",
            }}
          >
            Thu hồi
          </Button>
          <Modal
            title="Bàn giao tài sản"
            open={isModalOpen}
            onOk={(e) => submitForm(e)}
            onCancel={handleCancel}
            style={{ textAlign: "center" }}
            okText="Đồng ý"
            cancelText="Huỷ"
            okButtonProps={{ style: { width: "100px" } }}
          >
            <div className="modal__wrapper">
              <div className="modal__content">
                <label className="label" htmlFor="">
                  Chọn phòng ban:{" "}
                </label>
                <Select
                  value={selectedDeptValue}
                  style={{
                    width: "100%",
                  }}
                  onChange={(e) => handleChangeDept(e)}
                  popupMatchSelectWidth={false}
                >
                  {!loading &&
                    department?.map((dept, key) => (
                      <Select.Option key={dept.id} value={dept.id}>
                        {dept.name}
                      </Select.Option>
                    ))}
                </Select>
              </div>
              <div className="modal__content">
                <label className="label" htmlFor="">
                  Chọn người dùng:{" "}
                </label>
                <Select
                  value={selectedUserValue}
                  style={{
                    width: "100%",
                  }}
                  onChange={(e) => handleChangeUser(e)}
                  popupMatchSelectWidth={false}
                >
                  {!loading &&
                    user?.map((user, key) => (
                      <Select.Option key={user.id} value={user.id}>
                        {user.fullName}
                      </Select.Option>
                    ))}
                </Select>{" "}
              </div>
              <div className="modal__content">
                <label className="label" htmlFor="">
                  Ghi chú:
                </label>
                <Input
                  placeholder="Ghi chú:"
                  value={inputValue}
                  onChange={handleChangeInput}
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            </div>
          </Modal>
          <Modal
            title="Thu hồi tài sản"
            open={isModalRecallOpen}
            onOk={(e) => submitFormRecall(e)}
            onCancel={handleCancelRecall}
            style={{ textAlign: "center" }}
            okText="Đồng ý"
            cancelText="Huỷ"
            cancelButtonProps={{ style: { width: "100px" } }}
            okButtonProps={{ style: { width: "100px" } }}
          >
            <div className="modal__wrapper">
              <div className="modal__content">
                <label className="label" htmlFor="" style={{ width: "100px" }}>
                  Ghi chú:
                </label>
                <Input
                  placeholder="Ghi chú"
                  value={inputValue}
                  onChange={handleChangeInput}
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Asset;
