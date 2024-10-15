import React, {  useState } from "react";
import { Table, Button, Input, Space, Card, Select, Switch, Tabs } from "antd";
import {
  SearchOutlined,
  
} from "@ant-design/icons";
import EditUserModal from "../../components/Admin/AdminModals/EditUserModal";
import useSearch from "../../hooks/useSearch";

const { Option } = Select;
const { TabPane } = Tabs;

/*
GET /users - Lấy danh sách tất cả người dùng.
GET /users/unverified - Lấy danh sách tài khoản chưa xác minh.
GET /users/blocked - Lấy danh sách tài khoản bị khóa.
PUT /users/:id - Cập nhật thông tin người dùng.
DELETE /users/:id - Xóa người dùng.
*/

// interface User {
//   key: string;
//   name: string;
//   email: string;
//   phone: string;
//   username: string;
//   status: boolean;
//   role: string;
//   verified: boolean;
//   blocked: boolean;
//   createdAt: string;
// }

const UserManagement: React.FC = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "Nguyễn Văn A",
      email: "a@example.com",
      phone: "0123456789",
      username: "nguyenvana",
      status: true, // Tài khoản được kích hoạt
      role: "Admin",
      verified: true, // Đã xác minh
      blocked: false, // Không bị khóa
      createdAt: "2023-01-15",
    },
    {
      key: "2",
      name: "Trần Thị B",
      email: "b@example.com",
      phone: "0987654321",
      username: "tranthib",
      status: false, // Tài khoản không kích hoạt
      role: "Instructor",
      verified: false, // Chưa xác minh
      blocked: false, // Không bị khóa
      createdAt: "2023-02-20",
    },
    {
      key: "3",
      name: "Lê Văn C",
      email: "c@example.com",
      phone: "0912345678",
      username: "levanc",
      status: true, // Tài khoản kích hoạt
      role: "Student",
      verified: true, // Đã xác minh
      blocked: true, // Tài khoản bị khóa
      createdAt: "2023-03-05",
    },
  ]);

  const [editVisible, setEditVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { searchText, filteredData, handleSearchChange } = useSearch(
    dataSource,
    ["name", "email"]
  ); // useSearch hook

  const handleEdit = (record: any) => {
    setCurrentUser(record);
    setEditVisible(true);
  };

  const handleDelete = (record: any) => {
    console.log("Deleting user:", record);
    // Thực hiện logic xóa
  };

  const handleSave = (values: any) => {
    console.log("Saving user:", values);
    // Thực hiện logic lưu user
  };

  const handleStatusChange = (checked: any, key: any) => {
    // Update trạng thái tài khoản
    const updatedData = dataSource.map((user) =>
      user.key === key ? { ...user, status: checked } : user
    );
    setDataSource(updatedData);
  };

  const handleRoleChange = (value: any, key: any) => {
    // Update vai trò
    const updatedData = dataSource.map((user) =>
      user.key === key ? { ...user, role: value } : user
    );
    setDataSource(updatedData);
  };

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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text: any, record: any) => (
        <Switch
          checked={text}
          onChange={(checked) => handleStatusChange(checked, record.key)}
        />
      ),
    },
    {
      title: "Loại người dùng",
      dataIndex: "role",
      key: "role",
      render: (text: any, record: any) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(value) => handleRoleChange(value, record.key)}
        >
          <Option value="Admin">Admin</Option>
          <Option value="Instructor">Instructor</Option>
          <Option value="Student">Student</Option>
        </Select>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Chỉnh sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Các bộ lọc cho các tab
  // const allUsers = dataSource;
  const unverifiedAccounts = dataSource.filter((user) => !user.verified);
  const blockedAccounts = dataSource.filter((user) => user.blocked);

  return (
    <div>
      <Card>
        <h3 className="text-2xl mb-4">User Management</h3>
        <Input
          placeholder="Search by name or email"
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3 mb-2 md:mb-0"
          value={searchText} // Liên kết với searchText
          onChange={handleSearchChange} // Gọi hàm khi người dùng nhập
        />
        <Tabs defaultActiveKey="1">
          <TabPane tab="All Users" key="1">
            <Table
              // dataSource={allUsers}
              dataSource={filteredData} // Sử dụng filteredData cho bảng
              columns={columns}
              pagination={{ pageSize: 5 }}
              rowKey="key"
              bordered
              scroll={{ x: true }} // Thêm scroll cho bảng
            />
          </TabPane>
          <TabPane tab="Unverified Accounts" key="2">
            <Table
              dataSource={unverifiedAccounts}
              columns={columns}
              pagination={{ pageSize: 5 }}
              rowKey="key"
              bordered
              scroll={{ x: true }}
            />
          </TabPane>
          <TabPane tab="Blocked Accounts" key="3">
            <Table
              dataSource={blockedAccounts}
              columns={columns}
              pagination={{ pageSize: 5 }}
              rowKey="key"
              bordered
              scroll={{ x: true }}
            />
          </TabPane>
        </Tabs>
      </Card>
      {/* <EditUserModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        user={currentUser}
        onSave={handleSave}
      /> */}
    </div>
  );
};

export default UserManagement;
