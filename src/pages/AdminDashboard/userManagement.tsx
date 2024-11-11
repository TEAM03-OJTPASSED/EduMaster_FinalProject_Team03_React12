import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Card, Select, Switch, Tabs } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import EditUser from "../../components/Admin/AdminModals/EditUserModal";
import CreateUser from "../../components/Admin/AdminModals/CreateUserModal";
import DeleteUserModal from "../../components/Admin/AdminModals/DeleteUserModal";
import { UserSearchParams } from "../../models/SearchInfo.model";
import { User } from "../../models/UserModel";
import { UserService } from "../../services/user.service";
import GlobalSearchUnit from "../../components/GlobalSearchUnit";

const { Option } = Select;

const UserManagement: React.FC = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("active");
  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState<string | undefined>(undefined);

  const fetchUsers = async () => {
    const searchParams: UserSearchParams = {
      searchCondition: {
        keyword: searchText,
        role: role,
        status: activeTabKey === "active",
        is_delete: false,
        is_verified: true,
      },
      pageInfo: { pageNum, pageSize },
    };

    try {
      const response = await UserService.getUsers(searchParams);
      const responseData = response.data?.pageData;
      const flattenedUsers: User[] = Array.isArray(responseData)
        ? responseData.flat() // Dùng flat() để chuyển thành User[]
        : [];
      setUsers(flattenedUsers);
      setTotal(response.data?.pageInfo?.totalItems ?? 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSearchSubmit = (values: Record<string, unknown>) => {
    setSearchText(values.keyword as string);
    setRole(values.role as string);
    fetchUsers();
  };

  const handleEdit = (record: User) => {
    console.log(record._id);
    setCurrentUser(record);
    setEditVisible(true);
  };

  const handleSave = async (updatedUserData: any) => {
    if (!currentUser) return;
    try {
      await UserService.updateUser(currentUser._id, updatedUserData);
      setEditVisible(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteConfirm = async (userId: string) => {
    await UserService.deleteUser(userId);
    fetchUsers();
    setDeleteUserModalVisible(false);
  };

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  useEffect(() => {
    fetchUsers();
    // }, [pageNum, pageSize, searchText, activeTabKey]);
  }, [pageNum, pageSize, activeTabKey, role]);

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
      render: (status: boolean, record: User) => (
        <Switch
          checked={status}
          onChange={async (checked) => {
            await UserService.changeStatus({
              user_id: record._id,
              status: checked,
            });
            fetchUsers();
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
            fetchUsers();
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
      render: (record: User) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setCurrentUser(record);
              setDeleteUserModalVisible(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "instructor", label: "Instructor" },
    { value: "student", label: "Student" },
  ];

  return (
    <div>
      <Card>
        <h1 className="text-2xl my-5">User Management</h1>
        <Tabs
          activeKey={activeTabKey}
          onChange={setActiveTabKey}
          items={["active", "inactive"].map((key) => ({
            key,
            label: `${key.charAt(0).toUpperCase() + key.slice(1)} Users`,
            children: (
              <>
                <div className="flex items-center justify-between mb-4">
                  <GlobalSearchUnit
                    placeholder="Search By Course Name"
                    selectFields={[
                      {
                        name: "role",
                        options: roles,
                        placeholder: "Filter by Role",
                      },
                    ]}
                    onSubmit={handleSearchSubmit}
                  />
                  {/* <Input
                    placeholder="Search By User Name"
                    prefix={<SearchOutlined />}
                    className="w-full md:w-1/3"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} // Update searchText on input change
                  /> */}
                  <Button
                    type="primary"
                    onClick={() => setCreateVisible(true)}
                    icon={<PlusCircleOutlined />}
                  >
                    Add new user
                  </Button>
                </div>
                <Table
                  dataSource={users}
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
              </>
            ),
          }))}
        />
      </Card>

      <EditUser
        key={currentUser?._id}
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        user={currentUser ?? ({} as User)}
        onSave={handleSave}
      />
      <CreateUser
        visible={createVisible}
        onClose={() => setCreateVisible(false)}
        onSave={fetchUsers}
      />
      <DeleteUserModal
        visible={deleteUserModalVisible}
        onCancel={() => setDeleteUserModalVisible(false)}
        onDelete={() => handleDeleteConfirm(currentUser?._id!)}
        userName={currentUser?.name || "Undefined User"}
      />
    </div>
  );
};

export default UserManagement;
