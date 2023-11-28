import React, { useState } from "react";
import {
  IoIosHome,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import "./sass/style.scss";
import "./sass/reset.scss";

import logo from "../components/assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faHouse,
  faBoxOpen,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import Charts from "./Charts";
const Depriciation = React.lazy(() => import("depriciation/Depriciation"));

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isKhauHaoOpen, setIsKhauHaoOpen] = useState(false);
  const navigate = useNavigate();

  const menuItem = [
    {
      path: "/",
      name: "Trang chủ",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      path: "/asset",
      name: "Tài sản",
      icon: <FontAwesomeIcon icon={faBoxOpen} />,
    },
    {
      path: "/depriciation",
      name: "Khấu hao",
      icon: <FontAwesomeIcon icon={faCalculator} />,
      subMenu: [
        {
          path: "/depriciation",
          name: "Bảng tính",
        },
        {
          path: "/depriciation/charts",
          name: "Biểu đồ",
        },
      ],
    },
  ];

  const toggle = () => setIsOpen(!isOpen);

  const toggleKhauHao = () => {
    setIsKhauHaoOpen(!isKhauHaoOpen);
    setIsOpen(true);
  };
  return (
    <div className="contain">
      <div style={{ width: isOpen ? "200px" : "65px" }} className="sidebar">
        <div className="top_section">
          <img
            style={{ display: isOpen ? "block" : "none" }}
            src={logo}
            alt=""
          />
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Tài sản
          </h1>
          <div
            style={{ marginLeft: isOpen ? "30px" : "0px" }}
            className="bars"
            onClick={toggle}
          >
            {isOpen ? (
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: "black" }}
              />
            ) : (
              <FaBars />
            )}
          </div>
        </div>
        <div className="menu-section">
          {menuItem.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.path}
                className="link"
                activeClassName="active"
                onClick={() =>
                  item.subMenu ? toggleKhauHao() : setIsKhauHaoOpen(false)
                }
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </NavLink>
              {item.subMenu && (
                <div
                  style={{
                    display: isKhauHaoOpen && isOpen ? "block" : "none",
                  }}
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      className={`link ${
                        isKhauHaoOpen && isOpen && subIndex === 0
                          ? "active"
                          : ""
                      }`}
                      activeClassName="active"
                    >
                      <div className="icon">{subItem.name}</div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <main className="main">{children}</main>
    </div>
  );
};

export default Sidebar;
