import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Card, Select, Switch, Tabs } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import useSearch from "../../hooks/useSearch";
import {
  changeRole,
  changeStatus,
  deleteUser,
  getUsers,
  updatedUser,
} from "../../services/userService"; // Đảm bảo có import hàm updateUserService
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
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const fetchUsers = async (
    pageNum: number,
    pageSize: number,
    keyword: string
  ) => {
    const searchParams = {
      searchCondition: {
        keyword: keyword,
        role: "",
        status: statusFilter !== null ? statusFilter : undefined,
        // status: false, // Thay đổi ở đây
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

  const handleEdit = (record: User) => {
    console.log(record._id);
    setCurrentUser(record);
    setEditVisible(true);
  };

  const handleCloseModal = () => {
    setEditVisible(false);
    setCurrentUser(null);
  };

  const handleSave = async (updatedUserData: any) => {
    if (!currentUser) {
      console.error("No user selected for editing.");
      return;
    }

    const userId = currentUser._id;
    // console.log("Current User ID:", userId);
    // console.log("Updated User Data:", updatedUserData);

    const promises = []; // Mảng để chứa các promise

    // Kiểm tra thay đổi vai trò
    if (updatedUserData.role !== currentUser.role) {
      promises.push(changeRole(userId, updatedUserData.role));
      console.log("Role updated to:", updatedUserData.role);
    }

    // Kiểm tra thay đổi trạng thái
    if (updatedUserData.status !== currentUser.status) {
      promises.push(changeStatus(userId, updatedUserData.status));
      console.log("Status updated to:", updatedUserData.status);
    }

    // Kiểm tra các thay đổi khác ngoài role và status
    const { role, status, ...otherUpdatedFields } = updatedUserData;
    const hasOtherUpdates = (
      Object.keys(otherUpdatedFields) as Array<keyof User>
    ).some((key) => otherUpdatedFields[key] !== currentUser[key]);

    if (hasOtherUpdates) {
      promises.push(updatedUser(userId, otherUpdatedFields));
    } else {
      console.log("No other updates found for user.");
    }
    // Chờ cho tất cả các promise hoàn thành
    try {
      await Promise.all(promises);
      setEditVisible(false); // Đóng modal
      fetchUsers(pageNum, pageSize, searchText);
    } catch (error) {
      console.error("Error updating user:", error);
    }
    // fetchUsers(pageNum, pageSize, searchText);
  };

  const handleDelete = async (record: User) => {
    try {
      const userId = record._id;
      const response = await deleteUser(userId);
      if (response) {
        console.log("User deleted successfully");
        fetchUsers(pageNum, pageSize, searchText); // Refresh the user list
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers(pageNum, pageSize, searchText);
  }, [pageNum, pageSize, searchText, statusFilter]);

  const handleTableChange = (pagination: any, filters: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
    setStatusFilter(filters.status ? filters.status[0] : null);
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value: any, record: User) => record.status === value,
      render: (status: boolean, record: User) => (
        <Switch
          checked={status}
          onChange={async (checked) => {
            console.log("Current User ID:", record._id); // Kiểm tra ID người dùng
            console.log("New Status:", checked); // Kiểm tra trạng thái mới
            try {
              await changeStatus(record._id, checked);
              console.log(changeStatus);
              fetchUsers(pageNum, pageSize, searchText); // Tải lại người dùng
            } catch (error) {
              console.error("Error updating status:", error);
            }
          }}
        />
      ),
    },
    {
      title: "Loại người dùng",
      dataIndex: "role",
      key: "role",
      render: (text: string, record: User) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={async (value) => {
            console.log("Current User ID:", record._id); // Kiểm tra ID người dùng
            console.log("New Role:", value); // Kiểm tra vai trò mới
            try {
              await changeRole(record._id, value); // Gọi API để thay đổi vai trò
              fetchUsers(pageNum, pageSize, searchText); // Tải lại người dùng
            } catch (error) {
              console.error("Error updating role:", error);
            }
          }}
        >
          <Option value="admin">Admin</Option>
          <Option value="instructor">Instructor</Option>
          <Option value="student">Student</Option>
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
            onClick={() => handleDelete(record)}
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
        key={currentUser?._id}
        onClose={handleCloseModal}
        visible={editVisible}
        user={currentUser}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserManagement;
