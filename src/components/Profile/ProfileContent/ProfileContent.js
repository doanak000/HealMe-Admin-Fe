import { Tabs } from "antd";
import React from "react";
import ProfileDetail from "../ProfileDetail/ProfileDetail";

const ProfileContent = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `Thông tin cá nhân`,
      children: <ProfileDetail />,
    },
    {
      key: "2",
      label: `Lich sử đơn hàng`,
      children: `Content of Tab Pane 2`,
    },
  ];
  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" />
  );
};

export default ProfileContent;
