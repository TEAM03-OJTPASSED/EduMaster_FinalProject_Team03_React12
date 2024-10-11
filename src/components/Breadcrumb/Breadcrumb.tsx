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

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link to="/">Home</Link> {/* Trang chính */}
      </Breadcrumb.Item>
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        return (
          <Breadcrumb.Item key={path}>
            <Link to={path}>
              {formatSegment(segment)}{" "}
              {/* Gọi hàm formatSegment để định dạng */}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
