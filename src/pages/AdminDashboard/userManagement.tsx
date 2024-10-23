import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Card, Select, Switch, Tabs } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import useSearch from "../../hooks/useSearch";
import { getUsers } from "../../services/userService";

const { Option } = Select;

const UserManagement: React.FC = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
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

  // Fetch users when component mounts or when pageNum/pageSize changes
  useEffect(() => {
    fetchUsers(pageNum, pageSize, searchText);
  }, [pageNum, pageSize, searchText]);

  const handleEdit = (record: any) => {
    setCurrentUser(record);
    setEditVisible(true);
  };

  const handleDelete = (record: any) => {
    console.log("Deleting user:", record);
    // Implement delete logic
  };

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleStatusChange = (checked: any, key: any) => {
    console.log(checked, key);
    // Update account status logic here
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
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value: any, record: any) => record.status === value,
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
      render: (record: string) => (
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

  const items = [
    {
      key: "1",
      label: "All Users",
      children: (
        <Table
          dataSource={filteredData} // Use filteredData directly
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
      ),
    },
    {
      key: "2",
      label: "Unverified Accounts",
      children: (
        <Table
          // dataSource={unverifiedAccounts}
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
          // dataSource={blockedAccounts}
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
      <div className="hidden">{editVisible}</div>
      <div className="hidden">{currentUser}</div>
      <Card>
        <h3 className="text-2xl my-5">User Management</h3>
        <Input
          placeholder="Search by name or email"
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3 mb-2 md:mb-0"
          value={searchText}
          onChange={handleSearchChange}
        />
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </div>
  );
};

export default UserManagement;
