import React from "react";
import { Breadcrumb } from "antd"; // Sử dụng Ant Design cho breadcrumb
import { useLocation, Link } from "react-router-dom";

const DynamicBreadcrumb: React.FC = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment); // Tách đường dẫn thành các phần

  // Hàm xử lý các đoạn segment để chuyển đổi 'Request-management' thành 'Request Management'
  const formatSegment = (segment: string) => {
    return segment
      .split("-") // Tách chuỗi bằng dấu "-"
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu
      .join(" "); // Nối lại thành chuỗi với dấu cách
  };

  // Tạo danh sách items cho Breadcrumb
  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>, // Trang chính
    },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return {
        title: <Link to={path}>{formatSegment(segment)}</Link>,
      };
    }),
  ];

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />;
};

export default DynamicBreadcrumb;
