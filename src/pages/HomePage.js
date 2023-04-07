import React from "react";
import LayoutUser from "../containers/layout/LayoutUser";
import Banner from "../components/Banner/Banner";
import HomeContent from "../components/HomeContent/HomeContent";
import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const HomePage = () => {
  return (
    <LayoutUser>
      <Banner />
      <HomeContent />
      <BackTop>
        <ArrowUpOutlined className="btn btn-primary" />
      </BackTop>
    </LayoutUser>
  );
};

export default HomePage;
