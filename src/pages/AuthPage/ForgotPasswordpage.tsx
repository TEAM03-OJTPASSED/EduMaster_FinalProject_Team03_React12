import { Input, Button } from "antd";
import "./forgotpass.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import Notification from "../../components/Notification";
import { ChangeEvent, useState } from "react";
import authApiRequest from "./authApiRequest";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");

  const { isSuccess, isError } = useSelector(
    (state: RootState) => state.auth.forgot_password
  );
  const dispatch = useDispatch();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleOnClick = () => {
    authApiRequest.verifyEmailExisted(dispatch, email);
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        {isSuccess && (
          <Notification
            message="Check Your Mail"
            description={`"We sent an email to ${email} with instructions to reset your password. If you do not receive a password reset message after 1 minute, verify that you entered the correct email address, or check your spam folder.`}
            showIcon
            type="success"
          />
        )}
        {isError && (
          <Notification
            message="Error"
            description={`Email ${email} is not exist.`}
            showIcon
            type="success"
          />
        )}
        <h1 className="text-center text-2xl font-extrabold my-4 md:text-4xl lg:text-6xl lg:font-bold lg:my-7">
          Forgot Password
        </h1>
        <p className="text-center font-bold mb-4 md:mb-8">
          Enter your email address and we'll send you instructions to create a
          new password
        </p>
        <Input
          className="mb-5 p-3"
          placeholder="Email"
          onChange={handleOnChange}
        />
        <div>
          <Button
            className="w-full bg-[#FF782D] text-xl text-white py-5"
            onClick={handleOnClick}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
