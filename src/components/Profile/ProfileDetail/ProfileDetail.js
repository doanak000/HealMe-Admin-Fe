import React from "react";
import { Button, Col, DatePicker, Form, Input, Row, Radio } from "antd";
import { useState } from "react";

const ProfileDetail = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const [value, setValue] = useState(1);
  const onChangeRadioGroup = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <Form
        layout="vertical"
        style={{
          maxWidth: 600,
        }}
        size="large"
      >
        <Row gutter={18}>
          <Col lg={12} md={12}>
            <Form.Item
              label={
                <>
                  <span className="me-1">Họ và tên</span>
                  <span className="text-danger">*</span>
                </>
              }
            >
              <Input placeholder="Trần Văn A" />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item
              label={
                <>
                  <span className="me-1">Email</span>
                  <span className="text-danger">*</span>
                </>
              }
            >
              <Input placeholder="tranvana@gmail.com" />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Số điện thoại">
              <Input placeholder="0123456789" />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Ngày tháng năm sinh">
              <DatePicker onChange={onChange} className="w-100" />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Địa chỉ">
              <Input placeholder="Quận Bình Thạnh" />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Giới tính" name="radio-group">
              <Radio.Group onChange={onChangeRadioGroup} value={value}>
                <Radio value={1}>Nam</Radio>
                <Radio value={2}>Nư</Radio>
                <Radio value={3}>Khác</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" size="large">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileDetail;
