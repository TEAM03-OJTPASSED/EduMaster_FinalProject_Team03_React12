import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Button, Checkbox, Form, Input } from "antd";
import { FormProps } from "antd";
import { Divider } from "antd";
import { jwtDecode } from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
import authApiRequest from "./authApiRequest";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import Notification from "../../components/Notification";

export type LoginProps = {
  username: string;
  password: string;
  remember: boolean;
};

const Loginpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isError,isFetching} = useSelector((state:RootState) => state.auth.login)
  const onFinish: FormProps<LoginProps>["onFinish"] = (values) => {
    authApiRequest.login(dispatch, navigate, values);
    console.log(values);
  };

  const handleFinish = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    const decode = jwtDecode(credentialResponse?.credential as string);
    console.log("decode", decode);
  };
  return (
    <div className="w-full  lg:flex lg:h-[35rem] lg:flex-row">
      {/* BACKGROUND */}
      <div className="lg:w-1/2">
        <img
          src="../src/assets/EduAuth.jpeg"
          alt=""
          className="h-44 w-full md:h-60 lg:h-full lg:w-[40.625rem]"
        />
      </div>
      {/* FORM */}
      <div className=" bg-white p-8 rounded-lg shadow-md w-full lg:w-1/2 ">
        <h1 className="text-3xl font-medium mb-5 text-center">Login</h1>
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          
          autoComplete="off"
        >
          {/* username */}
          <Form.Item<LoginProps>
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            className="mb-8"
          >
            <Input placeholder="Email or username*" className="p-2" />
          </Form.Item>
          {/* password */}
          <Form.Item<LoginProps>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="mb-8"
          >
            <Input.Password placeholder="Password" className="p-2" />
          </Form.Item>
          <div className="flex justify-between">
            {/* remember */}
            <Form.Item<LoginProps> name="remember" valuePropName="checked">
              <Checkbox>Remember password</Checkbox>
            </Form.Item>
            <div className="min-h-8 flex mt-1 underline px-1">
              <NavLink to={"/forgot-password"}>Forgot password</NavLink>
            </div>
          </div>
          {/* login */}
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              htmlType="submit"
              shape="round"
              className="bg-[#FF782D] text-xl text-white py-5 w-full"
              loading={isFetching}
            >
              Login
            </Button>
          </Form.Item>
          {<Notification message="Username or password is not correct" type="error" showIcon />}
          <Divider plain>Or sign up with</Divider>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleFinish}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Loginpage;
