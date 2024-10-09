import { Button, Form, Input } from "antd";
import { FormProps } from "antd";
import authApiRequest from "./authApiRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export type RegisterType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUppage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish: FormProps<RegisterType>["onFinish"] = (values) => {
    console.log("Success:", values);
    authApiRequest.register(dispatch, navigate, values);
  };
  return (
    <div className="w-full rounded-lg  lg:flex lg:h-[35rem] lg:flex-row">
      {/* BACKGROUND */}
      <div className="lg:w-1/2">
        <img
          src="../src/assets/EduAuth.jpeg"
          alt=""
          className="h-44 w-full md:h-60 lg:h-full lg:w-[650px]"
        />
      </div>
      {/* FORM */}
      <div className=" bg-white p-8 rounded-lg shadow-md w-full lg:w-1/2 ">
        <h1 className="text-3xl font-medium mb-5 text-center">Register</h1>
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* email */}
          <Form.Item<RegisterType>
            name="email"
            rules={[
              { required: true, message: "Please input your username!" },
              { type: "email", message: "Incorrect format of email!" },
            ]}
            className="mb-8"
          >
            <Input placeholder="Email" className="p-2" />
          </Form.Item>
          {/* username */}
          <Form.Item<RegisterType>
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            className="mb-8"
          >
            <Input placeholder="Username*" className="p-2" />
          </Form.Item>
          {/* password */}
          <Form.Item<RegisterType>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="mb-8"
          >
            <Input.Password placeholder="password" className="p-2" />
          </Form.Item>
          {/* confirm password */}
          <Form.Item<RegisterType>
            name="confirmPassword"
            dependencies={["password"]}
            className="mb-8"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" className="p-2" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              shape="round"
              className="bg-[#FF782D] text-xl text-white py-5 w-full"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default SignUppage;
