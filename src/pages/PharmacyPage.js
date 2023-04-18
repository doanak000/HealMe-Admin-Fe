import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllPharmacy } from "../api/api";
import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";

const PharmacyPage = () => {
  const [listPharmacy, setListPharmacy] = useState([]);

  useEffect(async () => {
    await getAllPharmacy().then((res) => setListPharmacy(res[0]));
  }, []);

  const columns = [
    {
      title: "Nhà thuốc",
      dataIndex: "pharmacyName",
      key: "pharmacyName",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "400",
      title: "Địa chỉ",
      dataIndex: "pharmacyAddress",
      key: "pharmacyAddress",
    },
    {
      width: "200",
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary">
          <Link to={`/pharmacy/${record.key}`} className="text-decoration-none">
            Xem chi tiết
          </Link>
        </Button>
      ),
    },
  ];

  const data = listPharmacy?.map(
    ({
      id: key,
      business_name: pharmacyName,
      fulladdress: pharmacyAddress,
      ...rest
    }) => ({
      key,
      pharmacyName,
      pharmacyAddress,
      ...rest,
    })
  );

  return (
    <React.Fragment>
      <Table columns={columns} dataSource={data} />;
    </React.Fragment>
  );
};

export default PharmacyPage;