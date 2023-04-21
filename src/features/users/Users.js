import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  createBusinessProfile,
  createPatientProfile,
  createUser,
  deleteUserById,
  getAllProvince,
  getAllUsers,
  getDistrictInProvince,
  getWardInDistrict,
  updateUser,
} from "../../api/api.js";
import { NOTIFICATION_TYPE, PATH } from "../../constants/common";
import { Notification } from "../../components/Notification/Notification";
import moment from "moment";

const { Option } = Select;
const Users = () => {
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [dataUsers, setDataUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [optionsProvince, setOptionsProvince] = useState(null);
  const [optionsDistrict, setOptionsDistrict] = useState(null);
  const [optionsWard, setOptionsWard] = useState(null);
  const [disabledDistrict, setDisabledDistrict] = useState(true);
  const [disabledWard, setDisabledWard] = useState(true);
  const [selectedWard, setSelectedWard] = useState(null);
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(1);
  const [isBusinessId, setIsBusinessId] = useState(3);
  const getAllProvinceApi = async () => {
    const data = await getAllProvince();
    const cookedData = data.map(({ id: value, name: label, ...rest }) => ({
      value,
      label,
      ...rest,
    }));
    setOptionsProvince(cookedData);
  };
  const getDistrictInProvinceApi = async (provinceId) => {
    const data = await getDistrictInProvince(provinceId);
    const cookedData = data[0].map(({ id: value, title: label, ...rest }) => ({
      value,
      label,
      ...rest,
    }));
    console.log("district", cookedData);
    setOptionsDistrict(cookedData);
  };
  const getWardInDistrictApi = async (districtId) => {
    const data = await getWardInDistrict(districtId);
    const cookedData = data[0].map(({ id: value, title: label, ...rest }) => ({
      value,
      label,
      ...rest,
    }));
    setOptionsWard(cookedData);
  };
  const handleChangeProvince = async (value) => {
    console.log(value);
    await setDisabledDistrict(true);
    await getDistrictInProvinceApi(value);
    await setDisabledDistrict(false);
    console.log(disabledDistrict);
  };
  const handleChangeDistrict = async (value) => {
    await setDisabledWard(true);
    await getWardInDistrictApi(value);
    await setDisabledWard(false);
  };
  const handleChangeWard = async (value) => {
    setSelectedWard(value);
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event?.target?.name]: event?.target?.value,
    });
  };

  const disabledDate = (current) => {
    // Get the current date and subtract 10 years
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

    // Disable dates that are after the current date or before ten years ago
    return current && (current > new Date() || current < tenYearsAgo);
  };
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
  const onFinishCreate = async (values) => {
    try {
      const userData = await createUser(values);
      setUserId(userData[0][0]?.id);
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: " success",
        description: null,
      });
      getAllUsersApi();
      if (values.role_id == 1) {
        setOpenCreate(false);
      } else {
        setStep(2);
        setIsBusinessId(values.role_id);
      }
    } catch (error) {
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: " fail",
        description: null,
      });
    }
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
  const onCreateProfile = async (values) => {
    const profileData = {
      ...values,
      birthday: moment(values?.birthday).format("YYYY-MM-DD"),
      ward: selectedWard,
      userid: userId,
    };
    try {
      if (isBusinessId == 2) {
        const profileDataResponse = await createPatientProfile(profileData);
      } else {
        const profileDataResponse = await createBusinessProfile(profileData);
      }
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: "Create profile success",
        description: null,
      });
      setOpenCreate(false);
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Create profile fail",
        description: error?.response?.data?.msg,
      });
    }
  };

  useEffect(() => {
    getAllUsersApi();
    getAllProvinceApi();
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
        {step == 1 && (
          <Form
            name="create"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinishCreate}
            autoComplete="off"
          >
            <Form.Item
              label="User Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input this field!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input this field!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="USER ROLE" name="role_id">
              <Select>
                <Option value="1">Admin</Option>
                <Option value="2">Patient </Option>
                <Option value="3">clinic</Option>

                <Option value="4">pharmacy</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input this field!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input this field!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}

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
        )}
        {step == 2 && (
          <Form
            name="create profile"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onCreateProfile}
            autoComplete="off"
          >
            <Form.Item
              size="large"
              id={isBusinessId == 2 ? "fullname" : "business_name"}
              label={<>Name</>}
              name={isBusinessId == 2 ? "fullname" : "business_name"}
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input
                placeholder="name"
                name={isBusinessId == 2 ? "fullname" : "business_name"}
              />
            </Form.Item>
            {isBusinessId == 2 && (
              <>
                <Form.Item
                  id="birthday"
                  label={<>Birthday</>}
                  name="birthday"
                  rules={[
                    {
                      required: true,
                      message: "Please input your birthday!",
                    },
                  ]}
                >
                  <DatePicker
                    name="birthday"
                    style={{ width: "90%" }}
                    disabledDate={disabledDate}
                  />
                </Form.Item>
                <Form.Item
                  id="gender"
                  label={<>Gender</>}
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Please select your gender!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select your gender"
                    style={{
                      width: "90%%",
                    }}
                    options={[
                      {
                        value: "Male",
                        label: "Male",
                      },
                      {
                        value: "Female",
                        label: "Female",
                      },
                    ]}
                  />
                </Form.Item>
              </>
            )}
            {isBusinessId !== 2 && (
              <Form.Item
                size="large"
                id="descr"
                label={<>Descr</>}
                name="descr"
                rules={[
                  {
                    required: true,
                    message: "Please input your descr!",
                  },
                ]}
              >
                <Input placeholder="descr" name="descr" />
              </Form.Item>
            )}
            <Form.Item
              id="province"
              label={<>Province</>}
              name="province"
              size="large"
            >
              {" "}
              <Select
                style={{
                  width: "100%",
                }}
                placeholder="Select your province"
                onChange={handleChangeProvince}
                options={optionsProvince}
              />
            </Form.Item>
            <Form.Item
              id="district"
              label={<>District</>}
              name="district"
              size="large"
            >
              {" "}
              <Select
                name="district"
                disabled={disabledDistrict}
                options={optionsDistrict}
                style={{
                  width: "95%",
                }}
                placeholder="Select your province"
                onChange={handleChangeDistrict}
              />
            </Form.Item>
            <Form.Item id="ward" label={<>Ward</>} name="ward" size="large">
              {" "}
              <Select
                disabled={disabledWard}
                options={optionsWard}
                style={{
                  width: "100%",
                }}
                placeholder="Select your ward"
                onChange={handleChangeWard}
              />
            </Form.Item>
            <Form.Item
              size="large"
              id="address"
              label={<>Address</>}
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input placeholde="Số nhà, tên đường" name="address" />
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
        )}
      </Drawer>
    </>
  );
};
export default Users;
