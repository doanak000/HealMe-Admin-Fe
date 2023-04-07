import React, { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux'
// import { registerFail, registerSuccess } from './registerSlice'
// import {  useLocation } from 'react-router-dom'
import { Notification } from "../../components/Notification/Notification";
// import { NOTIFICATION_TYPE } from '../../constants/common'
// import { selectTranslation } from '../language/languageSlice'
import { Form, Input, Checkbox } from "antd";
import {
  RegisterButton,
  RegisterLable,
  TitleRegister,
  WrapperRegister,
  WrapperRegisterForm,
} from "./Register.style";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerSuccess } from "./registerSlice";
import { NOTIFICATION_TYPE, PATH } from "../../constants/common";
import { translation } from "../../configs/translation";
import { register } from "../../api/api.js";
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 24,
  },
};
const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [stopRegister, setStopRegister] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const { from } = { from: { pathname: "/" } };
  const [user, setUser] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event?.target?.name]: event?.target?.value,
    });
  };
  // chưa có api nên tui để Register auto đúng vô đC.
  const RegisterHandler = async () => {
    setStopRegister(true);
    setLoadingState(true);
    if (user.password !== user.password2) {
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Register fail",
        description: "Password refill is different password",
      });
      return;
    }
    try {
      const userData = await register(user);
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: "Register success",
        description: null,
      });
      history.push(history.push({ pathname: PATH.LOGIN }));

      setLoadingState(false);
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Register fail",
        description: error?.response?.data?.msg,
      });
      console.error(error);
      setLoadingState(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <WrapperRegister>
      <WrapperRegisterForm>
        <Form
          size="large"
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={RegisterHandler}
          onFinishFailed={onFinishFailed}
        >
          <TitleRegister>Register</TitleRegister>
          <Form.Item
            size="large"
            id="username"
            label={<RegisterLable>User name</RegisterLable>}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="username"
              onChange={handleChange}
              name="username"
            />
          </Form.Item>

          <Form.Item
            id="password"
            label={<RegisterLable>Password</RegisterLable>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              placeholder="password"
              onChange={handleChange}
              name="password"
              type="password"
            />
          </Form.Item>

          <Form.Item
            id="password2"
            label={<RegisterLable>Refill Password</RegisterLable>}
            name="password2"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              placeholder="password"
              onChange={handleChange}
              name="password2"
              type="password"
            />
          </Form.Item>

          <Form.Item
            size="large"
            id="email"
            label={<RegisterLable>Email</RegisterLable>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="email" onChange={handleChange} name="email" />
          </Form.Item>

          <Link to={PATH.LOGIN}>Login</Link>

          <Form.Item {...tailLayout}>
            <RegisterButton type="primary" htmlType="submit">
              Submit
            </RegisterButton>
          </Form.Item>
        </Form>
      </WrapperRegisterForm>
    </WrapperRegister>
  );
};

export default Register;
