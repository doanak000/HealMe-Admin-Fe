import { Button, Drawer, Form, Input, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { deleteUserById, getAllUsers, updateUser } from "../../api/api.js";
import { NOTIFICATION_TYPE, PATH } from "../../constants/common";
import { Notification } from "../../components/Notification/Notification";

const { Option } = Select;
const Users = () => {
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [dataUsers, setDataUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const showDrawer = (record) => {
    console.log("helo", record);
    setSelectedUser(record);
    setOpen(true);
  };
  const getAllUsersApi = async () => {
    const data = await getAllUsers();
    setDataUsers(data[0]);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      await updateUser(selectedUser.id, values);
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: "Edit success",
        description: null,
      });
      getAllUsersApi();
      setOpen(false);
    } catch (error) {
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Edit fail",
        description: null,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setOpen(false);
  };
  const showDrawerCreate = () => {
    setOpenCreate(true);
  };
  const onCloseCreate = () => {
    setOpenCreate(false);
  };
  const onFinishCreate = (values) => {
    setOpenCreate(false);
  };

  const onFinishFailedCreate = (errorInfo) => {
    setOpenCreate(false);
  };
  const handleDelete = async (record) => {
    try {
      await deleteUserById(record.id);
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: "Delete success",
        description: null,
      });
      getAllUsersApi();
      setOpen(false);
    } catch (error) {
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Delete fail",
        description: null,
      });
    }
  };

  useEffect(() => {
    getAllUsersApi();
  }, []);

  const columns = [
    {
      width: "100",
      title: "UserName",
      dataIndex: "username",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "70",
      title: "Account Status",
      dataIndex: "account_status",
      key: "account_status",
      render: (text) => <a>{text == 1 ? "Active" : "InActive"}</a>,
    },
    {
      width: "200",
      title: "User Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "200",
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "150",
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "300",
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "200",
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showDrawer(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record)}>
            {_.account_status == 1 ? "Disbale" : "Enable"}
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Button onClick={showDrawerCreate} style={{ marginBottom: "10px" }}>
        Create User
      </Button>
      <Table columns={columns} dataSource={dataUsers} />
      <Drawer title="Edit User" placement="right" onClose={onClose} open={open}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Email" name="email">
            <Input
              defaultValue={selectedUser?.email}
              key={selectedUser?.email}
            />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone">
            <Input
              defaultValue={selectedUser?.phone}
              key={selectedUser?.phone}
            />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input
              defaultValue={selectedUser?.address}
              key={selectedUser?.address}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "20px" }}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title="Create User"
        placement="right"
        onClose={onCloseCreate}
        open={openCreate}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinishCreate={onFinishCreate}
          onFinishFailedCreate={onFinishFailedCreate}
          autoComplete="off"
        >
          <Form.Item label="User Name" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
          <Form.Item label="Refill Password" name="password2">
            <Input />
          </Form.Item>
          <Form.Item label="USER ROLE" name="role">
            <Select>
              <Option value="duocSi">Dược sĩ</Option>
              <Option value="bacSi">Bác sĩ</Option>
              <Option value="admin">Admin</Option>
              <Option value="benhNhan">Bệnh Nhân</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "20px" }}
            >
              Submit
            </Button>
            <Button onClick={onCloseCreate}>Cancel</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default Users;
