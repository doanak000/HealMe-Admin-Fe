import { Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/component/DoctorItem/DoctorItem.css";
import { PATH } from "../../../constants/common";

const DoctorItem = () => {
  const id = 123;
  return (
    <div className="row my-2 doctor-item-container shadow p-2 mb-2 bg-body rounded bg-body rounded g-2">
      <div className="col-3">
        <Image
          src="https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg"
          className="rounded"
        />
      </div>
      <div className="col-9 text-justify">
        <p className="text-justify doctor-name">
          <Link to={`/home/doctor/${id}`} style={{ textDecoration: "none" }}>
            <b>Họ tên: </b> Bs. Võ Triệu Đạt
          </Link>
        </p>
        <p className="text-justify">
          <b>Chuyên khoa:</b> Khoa Sản Phụ khoa Trung tâm điều trị bệnh lý tuyến
          vú
        </p>
        <p className="text-justify">
          <b>Kinh nghiệm:</b> Bác sĩ điều trị, Khoa Sản Phụ Khoa, Bệnh viện Hùng
          Vương, thành phố Hồ Chí Minh, Việt Nam, 2005 – 2009
          <br />
          Bác sĩ trợ lý bác sĩ bên ngoài và bác sĩ hợp tác, Khoa Sản Phụ Khoa,
          Bệnh viện FV, 2009 – 2010
        </p>
      </div>
    </div>
  );
};

export default DoctorItem;
