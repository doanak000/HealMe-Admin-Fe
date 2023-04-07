import React from "react";
import { Button, Space, Table } from "antd";
import "../../../assets/styles/component/DoctorAppointment/DoctorAppointment.css";

const columns = [
  {
    title: "Ngày",
    dataIndex: "day",
    key: "day",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Địa điểm",
    dataIndex: "place",
    key: "place",
  },

  {
    title: "Đặt lịch",
    key: "Đặt lịch",
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        <Button>Đặt lịch</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    day: "Thứ Hai",
    time: "08:00 – 12:00",
    place: "Bệnh viện FV - Tầng 1, tòa nhà F",
  },
  {
    key: "2",
    day: "Thứ Ba",
    time: "08:00 – 12:00",
    place: "Bệnh viện FV - Tầng 1, tòa nhà F",
  },
  {
    key: "3",
    day: "Thứ Tư",
    time: "08:00 – 12:00",
    place: "Bệnh viện FV - Tầng 1, tòa nhà F",
  },
  {
    key: "4",
    day: "Thứ Năm",
    time: "08:00 – 12:00",
    place: "Bệnh viện FV - Tầng 1, tòa nhà F",
  },
  {
    key: "5",
    day: "Thứ Sáu",
    time: "08:00 – 12:00",
    place: "Bệnh viện FV - Tầng 1, tòa nhà F",
  },
  {
    key: "6",
    day: "Thứ Bảy",
    time: "08:00 – 12:00",
    place: "Bệnh viện FV - Tầng 1, tòa nhà F",
  },
];

const DoctorAppointment = () => {
  return <Table columns={columns} dataSource={data} className="mt-3" />;
};

export default DoctorAppointment;
