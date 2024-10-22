import { Table, Button, Input, Space, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useSearch from "../../hooks/useSearch";
import { users } from "./monitors/course/courseList";

const RequestUser = () => {
  const { searchText, filteredData, handleSearchChange } = useSearch(users, [
    "name",
    "email",
  ]);

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
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành động",
      key: "action",
      render: () => (
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
          <h3 className="text-2xl my-5">Request Instructor Management</h3>
        </div>
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
          value={searchText}
          onChange={handleSearchChange}
        />
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default RequestUser;
