import React from "react";
import DoctorItem from "../DoctorItem/DoctorItem";

const DoctorList = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-12 col-lg-6">
        <DoctorItem />
      </div>
      <div className="col-12 col-md-12 col-lg-6">
        <DoctorItem />
      </div>
      <div className="col-12 col-md-12 col-lg-6">
        <DoctorItem />
      </div>
      <div className="col-12 col-md-12 col-lg-6">
        <DoctorItem />
      </div>
    </div>
  );
};

export default DoctorList;
