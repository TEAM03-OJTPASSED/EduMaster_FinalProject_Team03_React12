import { useEffect, useState } from "react";
import CustomLoading from "./Loading";

// Component LoadingWrapper nhận children để trì hoãn việc hiển thị
const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup timer nếu component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
