import { useEffect, useState } from "react";
import CustomLoading from "./Loading";

// Component LoadingWrapper nhận children để trì hoãn việc hiển thị
const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tạo một timeout để trì hoãn 2 giây trước khi hiển thị trang nội dung
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 giây

    // Cleanup timer nếu component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Nếu vẫn đang loading, hiển thị Loading component
  if (loading) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  // Sau 2 giây, hiển thị nội dung thực tế (children)
  return <>{children}</>;
};

export default LoadingWrapper;
