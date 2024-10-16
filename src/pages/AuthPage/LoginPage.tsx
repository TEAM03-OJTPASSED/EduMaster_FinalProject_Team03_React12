import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Button, Checkbox, Divider, Form, Input, notification } from "antd";
import { FormProps } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export type LoginProps = {
  username: string;
  password: string;
  remember: boolean;
};

const onFinish: FormProps<LoginProps>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const Loginpage = () => {
  useEffect(() => {
    const unauthorized = localStorage.getItem("unauthorized");
    if (unauthorized) {
      notification.error({
        message: "Unauthorized",
        description: "You do not have permission to access that page.",
      });
      localStorage.removeItem("unauthorized"); // Clear flag after showing notification
    }
  }, []);
  return (
    <div className="w-full lg:flex lg:h-[35rem] lg:flex-row lg:rounded-lg overflow-hidden shadow-xl">
      {/* BACKGROUND */}
      <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center">
        <Player
          src={`https://lottie.host/d08bd2de-f201-41ed-9ee3-cf8484903ca6/G0I0mLw1Np.json`}
          loop
          autoplay
          className="h-44 w-full md:h-60 lg:h-full"
        />
      </div>
      {/* FORM */}
      <div className="w-full bg-white p-10 lg:w-1/2 lg:p-16 flex flex-col justify-center">
        <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>
        <Form
          name="login"
          layout="vertical"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* username */}
          <Form.Item<LoginProps>
            label="Username or Email"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}
            className="mb-6"
          >
            <Input
              placeholder="Enter your email or username"
              className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
            />
          </Form.Item>
          {/* password */}
          <Form.Item<LoginProps>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
            className="mb-6"
          >
            <Input.Password
              placeholder="Enter your password"
              className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
            />
          </Form.Item>
          <div className="flex justify-between items-center mb-6">
            {/* remember */}
            <Form.Item<LoginProps> name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <div className="min-h-8 flex mt-1 underline px-1">
              <NavLink to={"/forgot-password"}>Forgot password</NavLink>
            </div>
          </div>
          {/* login */}
          <Form.Item>
            <Button
              htmlType="submit"
              shape="round"
              className="bg-[#FF782D] text-xl text-white py-3 w-full hover:bg-[#e66e27]"
            >
              Login
            </Button>
          </Form.Item>
          <Divider plain className="text-gray-500">
            Or sign in with
          </Divider>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse: CredentialResponse) => {
                console.log(credentialResponse);
                const decode = jwtDecode(
                  credentialResponse?.credential as string
                );
                console.log("decode", decode);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </Form>
        <div className="text-center mt-6">
          <span className="text-gray-500">Don’t have an account? </span>
          <NavLink to={"/signup"} className="text-[#FF782D] hover:underline">
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
