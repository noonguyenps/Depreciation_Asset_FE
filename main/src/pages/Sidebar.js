import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useParams } from "react-router-dom"; // Import useParams

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./sass/reset.scss";
import "./sass/style.scss";

import {
  faBoxOpen,
  faCalculator,
  faChevronLeft,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../components/assets/logo.jpg";
const Depriciation = React.lazy(() => import("depriciation/Depriciation"));

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeSubMenuId, setActiveSubMenuId] = useState(null); // State to track active submenu item
  const [dynamicTo, setDynamicTo] = useState("");
  const [localStoredId, setLocalStoredId] = useState("");
  const [activeLinkId, setActiveLinkId] = useState(null);
  let location = useLocation();

  const navigate = useNavigate();
  const { id } = useParams();
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
          path: "/asset/depreciation-manage",
          name: "Thông tin quản lý",
        },
        {
          id: 1,
          path: "/asset/depreciation-upgrade",
          name: "Thông tin nâng cấp",
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
      name: "Bảng tính khấu hao",
      icon: <FontAwesomeIcon icon={faCalculator} />,
    },
  ];
  console.log("userId", location);
  useEffect(() => {
    if (location.pathname.includes("/asset/details")) {
      console.log("a", location.pathname.includes("/asset/details"));
      setActiveLinkId(true);
    }
  }, [location]);
  const handleNavLinkClick = (item) => {
    console.log("item", item);
    setIsOpen(true);
    if (item.path.startsWith("/asset/details")) {
      const storedId = localStorage.getItem("currentAssetId");
      const updatedAssetId = storedId
        ? `${item.path}/${storedId}`.replace(/\s+/g, "")
        : item.path;
      setDynamicTo(updatedAssetId);
      setLocalStoredId(storedId);
      console.log("updatedAssetId", updatedAssetId);
      // setActiveLinkId(item.id);

      navigate(updatedAssetId);
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
                {item.path == "/asset/details" ? (
                  <NavLink
                    className={({ isActive }) =>
                      isActive && isSubMenuOpen
                        ? "navbar-item active1 link link-parent"
                        : "navbar-item link link-parent"
                    }
                    onClick={() => {
                      setIsSubMenuOpen((isSubMenuOpen) => !isSubMenuOpen);
                      setIsOpen(true);
                    }}
                  >
                    <div className="icon">{item.icon}</div>
                    <div
                      style={{ display: isOpen ? "block" : "none" }}
                      className="link_text "
                    >
                      {item.name}
                    </div>
                  </NavLink>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive || (isSubMenuOpen && activeSubMenuId === item.id)
                        ? "navbar-item active1 link link-parent"
                        : "navbar-item link link-parent"
                    }
                    onClick={() =>
                      setActiveLinkId(() => setActiveLinkId(false))
                    }
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
                      <div key={subIndex}>
                        {subItem.path == "/asset/details" ? (
                          <a
                            style={{ textDecoration: "none" }}
                            className={`link link-subItem link-custom ${
                              activeLinkId ? "active" : ""
                            }`}
                            onClick={() => handleNavLinkClick(subItem)}
                          >
                            Thông tin chung
                          </a>
                        ) : (
                          <NavLink
                            key={subIndex}
                            to={subItem.path}
                            className="link link-subItem"
                            onClick={() => setActiveLinkId(false)}
                          >
                            <div className="icon">{subItem.name}</div>
                          </NavLink>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <main className="main">{children}</main>
    </div>
  );
};

export default Sidebar;
