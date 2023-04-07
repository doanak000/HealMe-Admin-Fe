import { Col, Image, Row } from "antd";
import React from "react";

const DrugItem = () => {
  return (
    <Row className="my-2 align-items-center">
      <Col span={8}>
        <p className="mb-0 fw-bold">Tên thuốc</p>
        <small>Cách sử dụng</small>
      </Col>
      <Col span={8}>
        <span>Số lượng</span>
      </Col>
      <Col span={8}>
        <span>Thành tiền</span>
      </Col>
    </Row>
  );
};

export default DrugItem;
