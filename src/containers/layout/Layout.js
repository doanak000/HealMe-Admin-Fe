import React, { useEffect, useState } from "react";
import { Avatar, Layout } from "antd";
import {
  // MenuUnfoldOutlined,
  // MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import {
  CustomContent,
  CustomHeader,
  CustomMenu,
  CustomMenuItem,
  CustomSider,
  DisplayName,
  Logo,
  TabName,
  UserInfo,
} from "./Layout.style";
import { theme } from "../../theme/theme";
import { confirm } from "../../components/ConfirmModal/ConfirmModal";
import { PATH, SIDEBAR } from "../../constants/common";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserInfo } from "../../features/login/loginSlice";
import { selectTranslation } from "../../features/language/languageSlice";

const LayoutAdmin = (props) => {
  const { children } = props;
  const [selectedKey, setSelectedKey] = useState(SIDEBAR.USER);

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const userInfo =
    useSelector(selectUserInfo) || JSON.parse(localStorage.getItem("userInfo"));
  const translation = useSelector(selectTranslation);
  const [tabName, setTabName] = useState(translation.TAB_USER);
  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);
  const selectTabName = (tabName) => {
    setTabName(tabName);
  };
  const logoutHandler = () => {
    confirm({
      content: translation.CONFIRM_LOGOUT,
      onOk: () => {
        dispatch(logout());
      },
    });
  };

  return (
    <Layout>
      <CustomSider
        width={theme.sideBarWidth}
        style={!isLoggedIn ? { display: "none" } : {}}
      >
        <Logo>HEAL ME</Logo>
        <CustomMenu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          onSelect={({ key }) => {
            key !== SIDEBAR.LOGOUT && setSelectedKey(key);
          }}
        >
          <CustomMenuItem
            key={SIDEBAR.USER}
            icon={<UserOutlined style={{ fontSize: theme.sizes.M }} />}
            className={userInfo?.role_id === 1 ? "d-block" : "d-none"}
          >
            <Link
              to={PATH.USER}
              onClick={() => selectTabName(translation.TAB_USER)}
            >
              {translation.TAB_USER}
            </Link>
          </CustomMenuItem>
          <CustomMenuItem
            key={SIDEBAR.TAB_PHARMACY}
            icon={<MedicineBoxOutlined style={{ fontSize: theme.sizes.M }} />}
            className={
              userInfo?.role_id === 3 && userInfo?.business_type === 2
                ? "d-block"
                : "d-none"
            }
          >
            <Link
              to={PATH.PHARMACY}
              onClick={() => selectTabName(translation.TAB_PHARMACY)}
            >
              {translation.TAB_PHARMACY}
            </Link>
          </CustomMenuItem>
          <CustomMenuItem
            key={SIDEBAR.LOGOUT}
            icon={<LogoutOutlined style={{ fontSize: theme.sizes.M }} />}
            onClick={logoutHandler}
            danger
            selectable={false}
            style={{
              marginTop: theme.spaces.twenty * 3,
              alignSelf: "flex-end",
              // backgroundColor: '#ffe6e6'
            }}
          >
            {translation.TEXT_LOGOUT}
          </CustomMenuItem>
        </CustomMenu>
      </CustomSider>
      <Layout className="site-layout">
        <CustomHeader style={!isLoggedIn ? { display: "none" } : {}}>
          <TabName>{tabName}</TabName>
          <UserInfo>
            <DisplayName style={{ paddingRight: "10px" }}>
              {userInfo.username}
            </DisplayName>
            <Avatar
              size="default"
              icon={<UserOutlined />}
              style={{ color: theme.colors.primary }}
            />
          </UserInfo>
        </CustomHeader>
        <CustomContent>{children}</CustomContent>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
