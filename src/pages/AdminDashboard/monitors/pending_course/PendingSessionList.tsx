import { Table, Input, Card, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { listSessions, Session } from "../course/courseList";

const PendingSessionList = () => {
  const columns: TableProps<Session>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "course_id",
      key: "course_id",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Position Order",
      dataIndex: "position_order",
      key: "position_order",
      render: (is_deleted) => {
        return <div className=" text-red-600">{is_deleted}</div>;
      },
    },
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">Session Management</h3>
      <div className="flex flex-wrap items-center mb-4">
      <Input
        placeholder="Search By Session Name"
        prefix={<SearchOutlined />}
        className="w-full md:w-1/3 mb-2 md:mb-0"
      />
      </div>
      <Table
        dataSource={listSessions}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default PendingSessionList;
