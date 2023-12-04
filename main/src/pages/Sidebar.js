import React, { useState, useContext, useEffect } from "react";
import {
  IoIosHome,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { useParams } from "react-router-dom"; // Import useParams

import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
import IdContext from "../context/context";
const Depriciation = React.lazy(() => import("depriciation/Depriciation"));

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeSubMenuId, setActiveSubMenuId] = useState(null); // State to track active submenu item
  const [dynamicTo, setDynamicTo] = useState("");
  const location = useLocation();
  const [currentAssetId, setCurrentAssetId] = useState();
  const { id } = useParams();
  console.log("id", id);
  const menuItem = [
    {
      path: "/",
      name: "Trang chủ",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      id: 1,
      path: "/asset/details",
      name: "Tài sản",
      icon: <FontAwesomeIcon icon={faBoxOpen} />,
      subMenu: [
        {
          id: 1,
          path: "/asset/details",
          name: "Thông tin chung",
        },
        {
          id: 1,
          path: "/asset/depreciation-info",
          name: "Thông tin khấu hao",
        },
      ],
    },
    {
      path: "/depreciation",
      name: "Khấu hao",
      icon: <FontAwesomeIcon icon={faCalculator} />,
    },
  ];
  const handleNavLinkClick = (item) => {
    item.subMenu ? setIsSubMenuOpen(true) : setIsSubMenuOpen(false);
    if (item.path.startsWith("/asset")) {
      const storedId = localStorage.getItem("currentAssetId");
      const updatedAssetId = storedId
        ? `${item.path}/${storedId}`.replace(/\s+/g, "")
        : item.path;
      setDynamicTo(updatedAssetId);

      setActiveSubMenuId(item.id);
    }
  };
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="contain">
      <div style={{ width: isOpen ? "250px" : "65px" }} className="sidebar">
        <div className={isOpen ? "top_section-active" : "top_section"}>
          <div className="logo">
            <img
              style={{ display: isOpen ? "block" : "none" }}
              src={logo}
              alt=""
            />
            <h1
              style={{ display: isOpen ? "block" : "none" }}
              className="logo-title"
            >
              Tài sản
            </h1>
          </div>

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
          {menuItem.map((item, index) => {
            {
              /* const activeDisable = !isActive && item.path.startsWith("/asset"); */
            }
            return (
              <div key={index}>
                <NavLink
                  to={
                    dynamicTo && item.path == "/asset/details"
                      ? dynamicTo
                      : item.path
                  }
                  className={({ isActive }) =>
                    isActive || (isSubMenuOpen && activeSubMenuId === item.id)
                      ? "navbar-item active1 link link-parent"
                      : "navbar-item link link-parent"
                  }
                  onClick={() => handleNavLinkClick(item)}
                  disabled="disabled"
                >
                  <div className="icon">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text "
                  >
                    {item.name}
                  </div>
                </NavLink>

                {item.subMenu && (
                  <div
                    style={{
                      display: isSubMenuOpen && isOpen ? "block" : "none",
                    }}
                  >
                    {item.subMenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={
                          dynamicTo && subItem.path.startsWith("/asset/details")
                            ? dynamicTo
                            : subItem.path
                        }
                        className="link link-subItem"
                      >
                        <div className="icon">{subItem.name}</div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
              /*{<div key={index}>
                {activeDisable ? (
                  <a>Link</a>
                ) : (
                  <NavLink
                    to={
                      dynamicTo && item.path == "/asset/details"
                        ? dynamicTo
                        : item.path
                    }
                    className={({ isActive }) =>
                      isActive || (isSubMenuOpen && activeSubMenuId === item.id)
                        ? "navbar-item active1 link link-parent"
                        : "navbar-item link link-parent"
                    }
                    onClick={() => handleNavLinkClick(item)}
                    disabled="disabled"
                  >
                    <div className="icon">{item.icon}</div>
                    <div
                      style={{ display: isOpen ? "block" : "none" }}
                      className="link_text "
                    >
                      {item.name}
                    </div>
                  </NavLink>
                )}

                {item.subMenu && (
                  <div
                    style={{
                      display: isSubMenuOpen && isOpen ? "block" : "none",
                    }}
                  >
                    {item.subMenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={
                          dynamicTo && subItem.path.startsWith("/asset/details")
                            ? dynamicTo
                            : subItem.path
                        }
                        className="link link-subItem"
                      >
                        <div className="icon">{subItem.name}</div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div> }*/
            );
          })}
        </div>
      </div>
      <main className="main">{children}</main>
    </div>
  );
};

export default Sidebar;
