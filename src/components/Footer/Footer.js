import { Image } from "antd";
import React from "react";
import { BsFacebook } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./style.scss";

const Footer = () => {
  return (
    <div className="row bg-light footer-home" style={{ paddingTop: "20px" }}>
      <div className="col-lg-3 col-md-6 col-12 footer-item">
        <h6 style={{ fontWeight: "bold" }}>Cái gì đó em chưa nghĩ ra</h6>
      </div>
      <div className="col-lg-3 col-md-6 col-12 footer-item">
        <h6 style={{ fontWeight: "bold" }}>Hệ thống HealMe</h6>
      </div>
      <div className="col-lg-3 col-md-6 col-12 footer-item">
        <h6 style={{ fontWeight: "bold" }}>Đường dẫn hữu ích</h6>
        <p className="mb-0">
          <NavLink to="/" className="text-decoration-none">
            Tìm bác sĩ
          </NavLink>
        </p>
        <p className="mb-0">
          <NavLink to="/" className="text-decoration-none">
            Đặt hẹn khám bệnh
          </NavLink>
        </p>
        <p className="mb-0">
          <NavLink to="/" className="text-decoration-none">
            Hỏi đáp
          </NavLink>
        </p>
        <p className="mb-0">
          <NavLink to="/" className="text-decoration-none">
            Đánh giá
          </NavLink>
        </p>
      </div>
      <div className="col-lg-3 col-md-6 col-12 footer-item">
        <h6 style={{ fontWeight: "bold" }}>Hợp tác quốc tế</h6>
        <Image src="https://www.fvhospital.com/wp-content/uploads/2022/09/hcgoncology-logo.png" />
        <Image src="https://www.fvhospital.com/wp-content/uploads/2022/09/e-rs-singapore-logo.png" />
        <h6 className="mt-3">Theo dõi chúng tôi</h6>
        <div>
          <BsFacebook className="fs-3 me-2" />
          <AiFillYoutube className="fs-2" />
        </div>
      </div>
      <p className="text-center mt-3 py-4 bg-secondary bg-gradient text-white">
        DATN ©2023 Created by BDSM
      </p>
    </div>
  );
};

export default Footer;
