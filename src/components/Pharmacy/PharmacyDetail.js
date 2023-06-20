import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  addMedicineToPharmacy,
  deleteMedicineFromPharmacy,
  getAllMedicine,
  getMedicineInPharmacy,
  getPharmacyDetail,
  updateMedicineInPharmacy,
  getMediaByBusinessId,
  uploadPhoto
} from "../../api/api";
import {
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Drawer,
  Popconfirm,
  Image,
  message,
  Upload
} from "antd";
import { GiMedicines } from "react-icons/gi";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Notification } from "../Notification/Notification";
import { NOTIFICATION_TYPE } from "../../constants/common";
import ExportExcel from "../../utils/excelexport";
import jsPDF from "jspdf";
import axios from "axios";

const PharmacyDetail = () => {
  const params = useParams();

  const [listMedicine, setListMedicine] = useState([]);
  const [listAllMedicine, setAllMedicine] = useState([]);
  const [pharmacyDetail, setPharmacyDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [formUpdate, setFormUpdate] = useState({
    id: "",
    stock: "",
    price: "",
    name: "",
  });
  const [pharmacyImg, setPharmacyImg] = useState("");

  useEffect(async () => {
    await getMediaByBusinessId(+params.id)
      .then(res => setPharmacyImg(res[0][0].url))
      .catch(err => console.log(err))
  })

  useEffect(async () => {
    await getMedicineInPharmacy(params.id).then((res) =>
      setListMedicine(res[0])
    );
    await getPharmacyDetail(params.id).then((res) => setPharmacyDetail(res[0]));
    await getAllMedicine().then((res) => setAllMedicine(res[0]));
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleAddNewMedicine = () => {
    showModal();
  };

  const handleDeleteMedicine = async (value) => {
    await deleteMedicineFromPharmacy(value.key).then(async (res) => {
      await getMedicineInPharmacy(params.id).then((res) =>
        setListMedicine(res[0])
      );
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: res[0].message,
        description: null,
      });
    });
  };

  const handleUpdateMedicine = async (value) => {
    showDrawer();
    setFormUpdate({
      id: value.key,
      stock: value.medicineStock,
      price: value.medicinePrice,
      name: value.medicineName,
    });
  };

  const columns = [
    {
      title: "Tên thuốc",
      dataIndex: "medicineName",
      key: "medicineName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      dataIndex: "medicineStatus",
      key: "medicineStatus",
      render: (text) => (
        <>
          {text === 1 ? (
            <Tag color="blue">Còn hàng</Tag>
          ) : (
            <Tag color="red">Hết hàng</Tag>
          )}
        </>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "medicineStock",
      key: "medicineStock",
    },
    {
      title: "Giá",
      dataIndex: "medicinePrice",
      key: "medicinePrice",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleUpdateMedicine(record)}>Cập nhật</Button>

          <Popconfirm
            title="Xóa thuốc"
            description="Bạn có muốn xóa thuốc ra khỏi nhà thuốc?"
            onConfirm={() => handleDeleteMedicine(record)}
            // onCancel={cancel}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = listMedicine?.map(
    ({
      id: key,
      title: medicineName,
      stock: medicineStock,
      status: medicineStatus,
      price: medicinePrice,
      ...rest
    }) => ({
      key,
      medicineName,
      medicineStock,
      medicineStatus,
      medicinePrice,
      ...rest,
    })
  );

  const options = listAllMedicine?.map(
    ({ id: value, title: label, ...rest }) => ({
      value,
      label,
      ...rest,
    })
  );

  // Form Create Add New Medicine to Pharmacy
  const onFinish = async (values) => {
    console.log("Success:", values);
    await addMedicineToPharmacy(params.id, values).then(async (res) => {
      handleOk();
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: res[0].message,
        description: null,
      });
      await getMedicineInPharmacy(params.id).then((res) =>
        setListMedicine(res[0])
      );
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // End Form Create Add New Medicine to Pharmacy

  const onFinishUpdate = async (values) => {
    if (values.id === undefined) {
      values.id = formUpdate.id;
    }
    if (values.stock === undefined) {
      values.stock = Number(formUpdate.stock);
    }
    if (values.price === undefined) {
      values.price = Number(formUpdate.price);
    }
    await updateMedicineInPharmacy(formUpdate.id, values).then(async (res) => {
      onCloseDrawer();
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: res[0].message,
        description: null,
      });
      await getMedicineInPharmacy(params.id).then((res) =>
        setListMedicine(res[0])
      );
    });
  };
  const onFinishFailedUpdate = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const generatePDF = () => {
    const report = new jsPDF('landscape', 'pt', 'a4');
    report.html(document.querySelector('#table'))
      .then(() => report.save('report.pdf'))
  }

  // Upload
  const props = {
    name: 'file',
    action: 'http://localhost:3000/media/upload/photo',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadImage = options => {

    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        console.log((event.loaded / event.total) * 100);
        onProgress({ percent: (event.loaded / event.total) * 100 }, file);
      }
    };
    fmData.append("image", file);
    fmData.append("business_id", params.id);
    axios
      .post("http://localhost:3000/media/upload/photo", fmData, config)
      .then(res => {
        onSuccess(file);
        console.log(res);
      })
      .catch(err => {
        const error = new Error('Some error');
        onError({ event: error });
      });
  }

  return (
    <div>
      <div>
        <Image
          width={100}
          src={pharmacyImg}
        />
        <GiMedicines className="fs-3" />
        <span className="ms-2 fs-5">{pharmacyDetail && pharmacyDetail[0]?.business_name}</span>
      </div>
      <Space>
        <Button
          type="primary"
          icon={<PlusOutlined className="me-1" />}
          className="d-inline-flex align-items-center my-2"
          onClick={handleAddNewMedicine}
        >
          Thêm thuốc
        </Button>
        <Upload {...props} customRequest={uploadImage}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Button className="bg-info text-white" onClick={generatePDF}>
          Export to PDF
        </Button>
        <ExportExcel excelData={data} fileName={'Excel Export'} />
      </Space>
      <div>
        <Table columns={columns} dataSource={data} id="table" />
      </div>
      <div>
        <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} className="w-25">
          <Form
            name="add_medicine"
            labelCol={{
              span: 7,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="mt-5"
          >
            <Form.Item label="Loại thuốc" name="medicine_id">
              <Select
                showSearch
                placeholder="Nhập loại thuốc"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={options}
              />
            </Form.Item>
            <Form.Item label="Số lượng" name="stock">
              <Input />
            </Form.Item>

            <Form.Item label="Giá" name="price">
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>
        <Drawer
          title={formUpdate.name}
          placement="right"
          onClose={onCloseDrawer}
          open={openDrawer}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishUpdate}
            onFinishFailed={onFinishFailedUpdate}
            autoComplete="off"
          >
            <Form.Item label="ID" name="id">
              <Input defaultValue={formUpdate.id} disabled />
            </Form.Item>
            <Form.Item label="Số lượng" name="stock">
              <Input defaultValue={formUpdate.stock} />
            </Form.Item>
            <Form.Item label="Giá" name="price">
              <Input defaultValue={formUpdate.price} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default PharmacyDetail;
