import React, { useState } from "react";
import { Table, Button, Input, Space, Card, Select, Switch, Tabs } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import useSearch from "../../hooks/useSearch";
import { users } from "./monitors/course/couseList";

const { Option } = Select;
// const { TabPane } = Tabs;

/*
GET /users - Lấy danh sách tất cả người dùng.
GET /users/unverified - Lấy danh sách tài khoản chưa xác minh.
GET /users/blocked - Lấy danh sách tài khoản bị khóa.
PUT /users/:id - Cập nhật thông tin người dùng.
DELETE /users/:id - Xóa người dùng.
*/

const UserManagement: React.FC = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // Các bộ lọc cho các tab
  // const allUsers = dataSource;
  const unverifiedAccounts = users.filter((user) => !user.verified);
  const blockedAccounts = users.filter((user) => user.blocked);

  // Sử dụng useSearch với users
  const { searchText, filteredData, handleSearchChange } = useSearch(users, [
    "name",
    "email",
  ]);

  const handleEdit = (record: any) => {
    setCurrentUser(record);
    setEditVisible(true);
  };

  const handleDelete = (record: any) => {
    console.log("Deleting user:", record);
    // Thực hiện logic xóa
  };

  // const handleSave = (values: any) => {
  //   console.log("Saving user:", values);
  //   // Thực hiện logic lưu user
  // };

  // const handleStatusChange = (checked: any, key: any) => {
  //   // Update trạng thái tài khoản
  //   const updatedData = dataSource.map((user) =>
  //     user.key === key ? { ...user, status: checked } : user
  //   );
  //   setDataSource(updatedData);
  // };

  // const handleRoleChange = (value: any, key: any) => {
  //   // Update vai trò
  //   const updatedData = dataSource.map((user) =>
  //     user.key === key ? { ...user, role: value } : user
  //   );
  //   setDataSource(updatedData);
  // };

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
      // render: (text: any, record: any) => (
      render: () => (
        <Switch
        // checked={text}
        // onChange={(checked) => handleStatusChange(checked, record.key)}
        />
      ),
    },
    {
      title: "Loại người dùng",
      dataIndex: "role",
      key: "role",
      render: (text: string) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          // onChange={(value) => handleRoleChange(value, record.key)}
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
      render: (record: string) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          ></Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          ></Button>
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "All Users",
      children: (
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          bordered
          scroll={{ x: true }}
        />
      ),
    },
    {
      key: "2",
      label: "Unverified Accounts",
      children: (
        <Table
          dataSource={unverifiedAccounts}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          bordered
          scroll={{ x: true }}
        />
      ),
    },
    {
      key: "3",
      label: "Blocked Accounts",
      children: (
        <Table
          dataSource={blockedAccounts}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          bordered
          scroll={{ x: true }}
        />
      ),
    },
  ];

  return (
    <div>
      {/* nho sua cai nay lai */}
      <div className="hidden">{editVisible}</div>
      <div className="hidden">{currentUser}</div>
      <Card>
        <h3 className="text-2xl mb-4">User Management</h3>
        <Input
          placeholder="Search by name or email"
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3 mb-2 md:mb-0"
          value={searchText}
          onChange={handleSearchChange}
        />
        <Tabs defaultActiveKey="1" items={items} />
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
