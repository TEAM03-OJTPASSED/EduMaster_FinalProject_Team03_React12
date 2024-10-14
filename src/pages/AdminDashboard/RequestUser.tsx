import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Card,
  Typography,
  Select,
  Switch,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import EditUser from "../../components/Admin/AdminModals/EditUserModal";

const { Title } = Typography;
const { Option } = Select; // Destructure Option from Select

const RequestUser = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "Nguyễn Văn A",
      email: "a@example.com",
      phone: "0123456789",
      username: "nguyenvana",
      status: true, // Use boolean for status
      role: "Admin",
      createdAt: "2023-01-15",
    },
    {
      key: "2",
      name: "Trần Thị B",
      email: "b@example.com",
      phone: "0987654321",
      username: "tranthib",
      status: false, // Use boolean for status
      role: "Instructor",
      createdAt: "2023-02-20",
    },
    {
      key: "3",
      name: "Lê Văn C",
      email: "c@example.com",
      phone: "0912345678",
      username: "levanc",
      status: true, // Use boolean for status
      role: "Student",
      createdAt: "2023-03-05",
    },
  ]);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Descriptions",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button color="primary" variant="outlined">
            Approve
          </Button>
          <Button color="danger" variant="outlined">
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div className="flex">
          <h3 className="text-2xl my-5">Request Management</h3>
        </div>
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }} // Thêm scroll cho bảng
        />
      </Card>
    </div>
  );
};

export default RequestUser;
