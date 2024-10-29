import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Card, Select, Switch } from "antd";
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
} from "../../services/userService";
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
  const [users, setUsers] = useState<User[]>([]);
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
        is_delete: false,
        is_verified: true,
        // is_verified: "",
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
    const promises: Promise<any>[] = [];

    // Check role change
    if (updatedUserData.role !== currentUser.role) {
      promises.push(changeRole(userId, updatedUserData.role));
    }

    // Check status change
    if (updatedUserData.status !== currentUser.status) {
      promises.push(changeStatus(userId, updatedUserData.status));
    }

    // Check for other updates
    const { role, status, ...otherUpdatedFields } = updatedUserData;
    const hasOtherUpdates = Object.keys(otherUpdatedFields).some(
      (key) =>
        otherUpdatedFields[key as keyof User] !== currentUser[key as keyof User]
    );

    if (hasOtherUpdates) {
      promises.push(updatedUser(userId, otherUpdatedFields));
    }

    try {
      await Promise.all(promises);
      setEditVisible(false);
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, ...updatedUserData } : user
      );
      setUsers(updatedUsers);
      fetchUsers(pageNum, pageSize, searchText); // Fetch users after save
    } catch (error) {
      console.error("Error updating user:", error);
    }
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

  useEffect(() => {
    fetchUsers(pageNum, pageSize, searchText);
  }, [pageNum, pageSize, searchText, statusFilter]);

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
            try {
              await changeStatus(record._id, checked);
              fetchUsers(pageNum, pageSize, searchText);
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
          value={text}
          style={{ width: 120 }}
          onChange={async (value) => {
            await changeRole(record._id, value);
            fetchUsers(pageNum, pageSize, searchText);
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
