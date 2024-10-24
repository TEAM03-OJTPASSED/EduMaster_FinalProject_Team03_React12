import { useState } from "react";
import { Table, Input, Card, TableProps, Tag, Button, Modal } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import { listSessions, Session } from "../../AdminDashboard/monitors/course/courseList";


const InstructorSessionList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const showModal = (session: Session) => {
    setSelectedSession(session);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      title: "Status",
      dataIndex: "is_deleted",
      key: "is_deleted",
      render: (is_deleted) => {
        return (
          <div className="text-center">
            {is_deleted ? (
              <Tag color="green">Enable</Tag>
            ) : (
              <Tag color="red">Disable</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: Session) => (
        <>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDelete(record.id)}
          />
          <Button
            type="text"
            icon={<EyeOutlined style={{ color: "blue" }} />}
            onClick={() => showModal(record)}
          />
        </>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    console.log("Delete session with id:", id);
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Session Management</h3>
      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />
      <Table
        dataSource={listSessions}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="name"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />

      <Modal
        title="Session Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedSession && (
          <div>
            <p><strong>Name:</strong> {selectedSession.name}</p>
            <p><strong>Course ID:</strong> {selectedSession.course_id}</p>
            <p><strong>Created At:</strong> {dayjs(selectedSession.created_at).format("DD/MM/YYYY")}</p>
            <p><strong>Status:</strong> {selectedSession.is_deleted ? "Enabled" : "Disabled"}</p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default InstructorSessionList;
