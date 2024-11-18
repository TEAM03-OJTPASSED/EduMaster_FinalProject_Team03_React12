import React, { useEffect, useState } from "react";
import { Table, Button, Card, Select, Switch, Tabs } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import EditUser from "../../components/Admin/AdminModals/EditUserModal";
import CreateUser from "../../components/Admin/AdminModals/CreateUserModal";
import DeleteUserModal from "../../components/Admin/AdminModals/DeleteUserModal";
import { UserSearchParams } from "../../models/SearchInfo.model";
import { User, UserStatusEnum } from "../../models/UserModel";
import { UserService } from "../../services/user.service";
import GlobalSearchUnit from "../../components/GlobalSearchUnit";
import { statusFormatter } from "../../utils/statusFormatter";

const { Option } = Select;

const initialUsersParams: UserSearchParams = {
  searchCondition: {
    keyword: "",
    role: "",
    status: true,
    is_delete: false,
    is_verified: true,
  },
  pageInfo: { pageNum: 1, pageSize: 10 },
};

const UserManagement: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState("active");
  const [pageInfo, setPageInfo] = useState(initialUsersParams.pageInfo);
  const [searchParams, setSearchParams] =
    useState<UserSearchParams>(initialUsersParams);
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    const searchParams: UserSearchParams = {
      searchCondition: {
        keyword: "",
        role: "",
        status: activeTabKey === "active",
        is_delete: false,
        is_verified: true,
      },
      pageInfo,
    };
    try {
      const response = await UserService.getUsers(searchParams);
      const responseData = response.data?.pageData;
      const flattenedUsers: User[] = Array.isArray(responseData)
        ? responseData.flat()
        : [];
      setUsers(flattenedUsers);
      setTotal(response.data?.pageInfo?.totalItems ?? 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSearchSubmit = (values: Record<string, any>) => {
    setSearchParams({
      pageInfo: searchParams.pageInfo,
      searchCondition: {
        ...searchParams.searchCondition,
        keyword: values.keyword,
        role: values.role,
      },
    });
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

  const handleEdit = (record: User) => {
    setCurrentUser(record);
    setEditVisible(true);
  };

  const handleDeleteConfirm = async (userId: string) => {
    await UserService.deleteUser(userId);
    fetchUsers();
    setDeleteUserModalVisible(false);
  };

  const handleTableChange = (pagination: any) => {
    setPageInfo({ pageNum: pagination.current, pageSize: pagination.pageSize });
  };

  useEffect(() => {
    fetchUsers();
  }, [pageInfo, activeTabKey, searchParams]);

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
        <>
          <Button 
            type="text" 
            icon={<EditOutlined style={{ color: "blue" }} />} 
            onClick={() => handleEdit(record)} />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => {
              setCurrentUser(record);
              setDeleteUserModalVisible(true);
            }}
          />
        </>
      ),
    },
  ];

  const role = [
    UserStatusEnum.ADMIN,
    UserStatusEnum.INSTRUCTOR,
    UserStatusEnum.STUDENT,
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
                        options: role.map((status) => ({
                          label: statusFormatter(status),
                          value: status,
                        })),
                        placeholder: "Filter by roles",
                      },
                    ]}
                    onSubmit={handleSearchSubmit}
                  />
                  <Button
                    type="primary"
                    onClick={() => setCreateVisible(true)}
                    style={{borderRadius: "15px"}}
                    icon={<PlusCircleOutlined />}
                  >
                    Add new user
                  </Button>
                </div>
                <Table
                  dataSource={users}
                  columns={columns}
                  pagination={{
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
