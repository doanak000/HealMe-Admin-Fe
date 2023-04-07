import React from "react";
import DrugItem from "../../Drug/DrugItem/DrugItem";
import { Button, Card } from "antd";

const PrescriptionItem = () => {
  return (
    <div className="my-3">
      <span>Ngày mua: 01.04.2023</span>
      <Card className="w-100">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <DrugItem />
          </div>
          <div className="col-12 col-md-12 col-lg-12">
            <DrugItem />
          </div>
          <div className="col-12 col-md-12 col-lg-12">
            <DrugItem />
          </div>
        </div>
        <div className="row text-end">
          <div className="text-end">
            <Button className="w-25 mx-1">Mua Lại</Button>
            <Button className="w-25 mx-1" type="primary">
              Xem chi tiết
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PrescriptionItem;
