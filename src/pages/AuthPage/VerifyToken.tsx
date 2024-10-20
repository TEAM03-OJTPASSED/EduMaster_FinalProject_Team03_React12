import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Input } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";
// import { AuthRequest } from "../../services/apiAuthRequest";

// khi click vao link thi no se load de kiem tra con token co ton tai ko
// ton tai thi thong bao success va 5 giay sau se tro ve trang login
// ko ton tai thi no se thong bao fail va cho minh nut button de resend lai
const VerifySuccessToken = () => {
  // // token get tu tren link
  // const { token } = useParams();
  // const [isLoading, setIsLoading] = useState(false);
  const [isVerifySuccess, setVerifySuccess] = useState(true);
  setVerifySuccess(true)
  // const navigate = useNavigate();
  // // api verify email token
  // // useEffect(() => {
  // //   AuthRequest.verifyTokenViaEmail(
  // //     token as string,
  // //     setIsLoading,
  // //     setVerifySuccess,
  // //     navigate
  // //   );
  // // }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
  <div className="shadow-lg rounded-lg w-full max-w-lg p-6 bg-white">
    <div className="flex flex-col items-center">
      <Player
        src={
          isVerifySuccess
            ? `https://lottie.host/c44385c4-2fe6-4f31-ad79-360aa6a07cf8/LBhRQt2hpO.json`
            : `https://lottie.host/07813174-03b1-4bca-be3d-40a7d6c5ca14/houbQ26KG4.json`
        }
        loop
        autoplay
        className="h-60 w-full mb-6"
      />
      <h2 className="text-4xl font-medium my-5 text-center">
        Verify <span>{isVerifySuccess ? "Successfully" : "Failed"}</span>
      </h2>
      <div className="w-full px-6">
        {isVerifySuccess ? (
          <div className="text-blue-500 text-lg text-center">
            Your email has been verified. Please{" "}
            <NavLink to={"/login"}>
              <span className="underline hover:text-[#FF782D]">click here</span>
            </NavLink>{" "}
            to return to the login page.
          </div>
        ) : (
          <div className="text-red-500 text-lg text-center">
            Verification token has expired. Please input your email below to
            receive a new verification link.
          </div>
        )}

        <div className="mt-6">
          {isVerifySuccess ? (
            <div>{/* Auto-redirect after 5 seconds to login */}</div>
          ) : (
            <div className="flex gap-4">
              <Input
                placeholder="Enter your email"
                className="w-full"
                size="large"
              />
              <Button
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                color="primary"
                size="large"
              >
                Re-verify
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default VerifySuccessToken;
