import React from "react";
import { Breadcrumb } from "antd"; // Sử dụng Ant Design cho breadcrumb
import { useLocation, Link } from "react-router-dom";

const DynamicBreadcrumb: React.FC = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment); // Tách đường dẫn thành các phần

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link to="/">Home</Link> {/* Trang chính */}
      </Breadcrumb.Item>
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`; // Tạo đường dẫn cho từng phần
        return (
          <Breadcrumb.Item key={path}>
            <Link to={path}>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}{" "}
              {/* Chỉnh sửa chữ cái đầu */}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
