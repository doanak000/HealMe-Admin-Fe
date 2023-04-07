import React from "react";
import PrescriptionItem from "../PrescriptionItem/PrescriptionItem";

const PrescriptionList = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-12 col-lg-6">
        <PrescriptionItem />
      </div>
      <div className="col-12 col-md-12 col-lg-6">
        <PrescriptionItem />
      </div>
      <div className="col-12 col-md-12 col-lg-6">
        <PrescriptionItem />
      </div>
    </div>
  );
};

export default PrescriptionList;
