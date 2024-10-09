import { Input, Button } from "antd";
import "./forgotpass.css";
const ForgotPasswordPage = () => {
  //viet api kiem tra email ton tai neu duoc thi hien lem modal nhap ma otp va password moi

  //

  return (
    <div className="flex justify-center items-center">
      <div>
        <h1 className="text-center text-2xl font-extrabold my-4 md:text-4xl lg:text-6xl lg:font-bold lg:my-7">
          Forgot Password
        </h1>
        <p className="text-center font-bold mb-4 md:mb-8">
          Enter your email address and we'll send you instructions to create a
          new password
        </p>
        <Input className="mb-5 p-3" placeholder="Email"  />
        <div>
          <Button className="w-full bg-[#FF782D] text-xl text-white py-5">
            Send Verified Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
