import { Button } from "antd";
import React from "react";
import banner from "../../assets/img/banner2.png";
import "../../assets/styles/component/Banner/Banner.css";

const Banner = () => {
  return (
    <div className="banner row my-3 align-items-center">
      <div className="col-lg-7 col-md-12 col-12">
        <div className="banner__info">
          <h1 className="banner__heading fw-bold">
            HealMe - Heal your pain =))
          </h1>
          <p className="banner__desc text-justify">
            Adipisicing laborum id tempor Lorem.Lorem labore nostrud pariatur
            dolore. Eiusmod commodo officia velit eu consequat ut. Exercitation
            proident tempor minim amet incididunt esse eiusmod fugiat incididunt
            nisi veniam ipsum elit. Dolore cupidatat dolore in magna ea elit
            deserunt laboris est excepteur.
          </p>
          <Button
            size="large"
            type="primary"
            className="text-uppercase fw-bold"
          >
            Join With Us
          </Button>
        </div>
      </div>
      <div className="col-lg-5 col-md-12 col-12">
        <img src={banner} className="w-lg-100 w-100 py-2 banner__img" alt="" />
      </div>
    </div>
  );
};

export default Banner;
