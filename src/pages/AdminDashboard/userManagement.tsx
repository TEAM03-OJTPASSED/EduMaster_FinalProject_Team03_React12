import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Card, Select, Switch } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import useSearch from "../../hooks/useSearch";
import EditUser from "../../components/Admin/AdminModals/EditUserModal";
import CreateUser from "../../components/Admin/AdminModals/CreateUserModal";
import { UserSearchParams } from "../../models/SearchInfo.model";
import { User } from "../../models/UserModel";
import { UserService } from "../../services/user.service";

const { Option } = Select;

const UserManagement: React.FC = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
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
    const searchParams: UserSearchParams = {
      searchCondition: {
        keyword,
        role: "",
        status: statusFilter !== null ? Boolean(statusFilter) : undefined,
        is_delete: false,
        is_verified: true,
        // is_verified: "", // Nếu is_verified cũng là boolean
      },
      pageInfo: { pageNum, pageSize },
    };

    try {
      const response = await UserService.getUsers(searchParams);
      const responseData = response.data?.pageData;
      const flattenedUsers: User[] = Array.isArray(responseData)
        ? responseData.flat()
        : [];
      const totalItems = response.data?.pageInfo?.totalItems ?? 0;
      setUsers(flattenedUsers);
      setTotal(totalItems);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setCreateVisible(true);
  };

  const handleEdit = (record: User) => {
    setCurrentUser(record);
    setEditVisible(true);
  };

  const handleCloseModal = () => {
    setEditVisible(false);
    setCreateVisible(false);
    setCurrentUser(null);
  };

  const handleSave = async (updatedUserData: any) => {
    if (!currentUser) {
      console.error("No user selected for editing.");
      return;
    }
    const userId = currentUser._id;
    try {
      await UserService.updateUser(userId, updatedUserData);
      setEditVisible(false);
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, ...updatedUserData } : user
      );
      setUsers(updatedUsers);
      fetchUsers(pageNum, pageSize, searchText);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (record: User) => {
    const userId = record._id;
    await UserService.deleteUser(userId);
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
            await UserService.changeStatus({
              user_id: record._id,
              status: checked,
            });
            fetchUsers(pageNum, pageSize, searchText);
          }}
        />
      ),
    },
    {
      title: "User Role",
      dataIndex: "role",
      key: "role",
      render: (text: string, record: User) => (
        <Select
          value={text}
          style={{ width: 120 }}
          onChange={async (value) => {
            await UserService.changeRole({ user_id: record._id, role: value });
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
      title: "Actions",
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
        <h1 className="text-2xl my-2">User Management</h1>
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-full md:w-1/3"
            value={searchText}
            onChange={handleSearchChange}
          />
          <Button
            type="primary"
            onClick={handleAddUser}
            icon={<PlusOutlined />}
          >
            Add user
          </Button>
        </div>
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{
            current: pageNum,
            pageSize,
            total,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
          rowKey="_id"
          bordered
          scroll={{ x: "max-content" }}
        />
      </Card>
      <EditUser
        key={currentUser?._id}
        onClose={handleCloseModal}
        visible={editVisible}
        user={currentUser}
        onSave={handleSave}
      />
      <CreateUser
        visible={createVisible}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserManagement;
