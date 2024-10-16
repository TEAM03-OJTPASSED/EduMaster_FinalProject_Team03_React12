import { Button, Form, Input } from "antd";
import { FormProps } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";

export type RegisterType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const onFinish: FormProps<RegisterType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const SignUppage = () => {
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
          Create Account
        </h1>

        <Form
          name="register"
          layout="vertical"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* email */}
          <Form.Item<RegisterType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Incorrect format of email!" },
            ]}
            className="mb-6"
          >
            <Input
              placeholder="Enter your email"
              className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
            />
          </Form.Item>
          {/* username */}
          <Form.Item<RegisterType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            className="mb-6"
          >
            <Input
              placeholder="Enter your username"
              className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
            />
          </Form.Item>
          {/* password */}
          <Form.Item<RegisterType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="mb-6"
          >
            <Input.Password
              placeholder="Enter your password"
              className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
            />
          </Form.Item>
          {/* confirm password */}
          <Form.Item<RegisterType>
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            className="mb-6"
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
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Re-enter your password"
              className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
            />
          </Form.Item>
          {/* register button */}
          <Form.Item>
            <Button
              htmlType="submit"
              shape="round"
              className="bg-[#FF782D] text-xl text-white py-4 w-full hover:bg-[#e66e27]"
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
