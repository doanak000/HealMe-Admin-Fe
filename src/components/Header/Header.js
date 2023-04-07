import { Dropdown, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import logo from "../../assets/img/HealMe.png";
import "../../assets/styles/component/Header/Header.css";
import { navbarList } from "../../static/data";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  logout,
  selectIsLoggedIn,
  selectUserInfo,
} from "../../features/login/loginSlice";
import { PATH } from "../../constants/common";
import { Link } from "react-router-dom";
import { confirm } from "../ConfirmModal/ConfirmModal";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userInfo =
    useSelector(selectUserInfo) || JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();
  const logoutHandle = () => {
    confirm({
      content: "Are you sure you want to logout?",
      onOk: () => {
        dispatch(logout());
      },
    });
  };
  ///login Data lấy data từ cái login slice về
  const items = [
    {
      key: "1",
      label: (
        <a target="_self" href="/profile" className="text-decoration-none">
          My Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_self"
          href="/profile/change-password"
          className="text-decoration-none"
        >
          Change Password
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a className="mb-0" onClick={logoutHandle}>
          Logout
        </a>
      ),
    },
  ];

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <div className="header__logo overflow-hidden">
              <img src={logo} className="w-50" />
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navbarList.map((item) => (
                <li className="header__navbar-item">
                  <a className="nav-link" href="/" key={item.key}>
                    {item.value}
                  </a>
                </li>
              ))}
              <li className="nav-item dropdown">
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <span className="dropdown-item">Action</span>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form
              className="d-flex"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {isLoggedIn || localStorage.getItem("token") ? (
                <>
                  <span style={{ paddingRight: "10px" }}>
                    {userInfo.username}
                  </span>
                  <Dropdown menu={{ items }} placement="bottomRight">
                    <Avatar icon={<UserOutlined />} />
                  </Dropdown>
                </>
              ) : (
                <>
                  {" "}
                  <Button className="mx-2 login-btn">
                    <Link to={PATH.LOGIN} style={{ textDecoration: "none" }}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="mx-2 register-btn" type="primary">
                    <Link to={PATH.REGISTER} style={{ textDecoration: "none" }}>
                      {" "}
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
