import React from "react";
import LayoutUser from "../containers/layout/LayoutUser";
import PrescriptionList from "../components/Prescription/PrescriptionList/PrescriptionList";

const PrescriptionPage = () => {
  return (
    <LayoutUser>
      <h3 className="text-center my-3">Tất cả toa thuốc</h3>
      <PrescriptionList />
    </LayoutUser>
  );
};

export default PrescriptionPage;
