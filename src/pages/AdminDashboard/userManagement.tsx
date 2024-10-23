import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Card, Select, Switch, Tabs } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import useSearch from "../../hooks/useSearch";
import { getUsers, updatedUser } from "../../services/userService"; // Đảm bảo có import hàm updateUserService
import EditUser from "../../components/Admin/AdminModals/EditUserModal";

const { Option } = Select;

interface User {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  status: boolean;
  role: string;
}

const UserManagement: React.FC = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { searchText, filteredData, handleSearchChange } = useSearch(users, [
    "name",
    "email",
  ]);

  const fetchUsers = async (
    pageNum: number,
    pageSize: number,
    keyword: string
  ) => {
    const searchParams = {
      searchCondition: {
        keyword: keyword,
        role: "",
        status: true,
        is_verified: "",
        is_delete: false,
      },
      pageInfo: {
        pageNum,
        pageSize,
      },
    };

    try {
      const response = await getUsers(searchParams);
      setUsers(response.pageData);
      setTotal(response.pageInfo.totalItems);
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  const handleEdit = (record: any) => {
    console.log(record._id);
    setCurrentUser(record);
    setEditVisible(true);
  };

  const handleSave = async (updatedUserData: any) => {
    if (!currentUser) {
      console.error("No user selected for editing.");
      return; // Nếu currentUser là null, không tiếp tục
    }
    const userId = currentUser._id; // Lấy userId từ currentUser
    try {
      console.log(
        "Thông tin người dùng đang được lưu:",
        userId,
        updatedUserData
      );
      await updatedUser(userId, updatedUserData); // Gọi hàm cập nhật
      setEditVisible(false); // Đóng modal
      fetchUsers(pageNum, pageSize, searchText); // Tải lại danh sách người dùng
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUsers(pageNum, pageSize, searchText);
  }, [pageNum, pageSize, searchText]);

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text: any) => <Switch checked={text} />,
    },
    {
      title: "Loại người dùng",
      dataIndex: "role",
      key: "role",
      render: (text: string) => (
        <Select defaultValue={text} style={{ width: 120 }}>
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
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => console.log("Deleting user:", record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">User Management</h3>
        <Input
          placeholder="Search by name or email"
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3 mb-2 md:mb-0"
          value={searchText}
          onChange={handleSearchChange}
        />
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{
            current: pageNum,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
          rowKey="_id"
          bordered
          scroll={{ x: true }}
        />
      </Card>
      <EditUser
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        user={currentUser}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserManagement;
