import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import {
  cancelOrderPres,
  getOrderPres,
  updateStatusOrderPres,
} from "../../api/api";

const OrderPres = () => {
  const [orders, setOrders] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const getListOrderPres = async (id) => {
    const data = await getOrderPres(id);
    setOrders(data?.[0]);
    console.log("data", data?.[0]);
  };
  useEffect(() => {
    getListOrderPres(userInfo?.user_role_id);
  }, []);

  const updateStatus = async (orderID) => {
    await updateStatusOrderPres(orderID);
    await getListOrderPres(userInfo?.user_role_id);
  };
  const handleCancelOrder = async (orderID) => {
    await cancelOrderPres(orderID);
    await getListOrderPres(userInfo?.user_role_id);
  };
  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Prescription ID",
      dataIndex: "prescription_id",
      key: "prescription_id",
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: "patient_name",
      key: "patient_name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "fulladdress",
      key: "fulladdress",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let statusText;
        switch (status) {
          case 0:
            statusText = "Canceled";
            break;
          case 1:
            statusText = "Completed";
            break;
          case 2:
            statusText = "Pending";
            break;
          default:
            statusText = "Unknown";
        }
        return statusText;
      },
    },
    {
      title: "Update Status",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => updateStatus(record.order_id)}>
            {record.status == 2 ? "Change to Completed" : "Change to Pending"}
          </Button>
          <Button
            onClick={() => handleCancelOrder(record.order_id)}
            type="dashed"
            style={{ marginLeft: "10px" }}
            danger
          >
            Hủy đơn
          </Button>
        </div>
      ),
    },
  ];

  return <Table dataSource={orders} columns={columns} />;
};

export default OrderPres;
