import { useState } from "react";
import { Table, Input, Card, TableProps, Tag, Button, Modal } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import {
  listSessions,
  Session,
} from "../../AdminDashboard/monitors/course/courseList";
import SessionOptions from "./create-courses/SessionOptions";

const InstructorSessionList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false)

  const showModal = (session: Session) => {
    setSelectedSession(session);
    setIsModalVisible(true);
  };

  const showModalCreate = () => {
    setIsModalCreateVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalCreateVisible(false)
  };

  //get all course id
  

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
            icon={<EditOutlined style={{ color: "blue" }} />}
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
      <div className="flex justify-between">
        <Input
          placeholder="Search By Course Name"
          prefix={<SearchOutlined />}
          style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        />
        <div className="flex">
          <Button
            onClick={showModalCreate}
            icon={<PlusCircleOutlined />}
            shape="round"
            variant="solid"
            color="primary"
            className="items-center"
          >
            Create Session
          </Button>
        </div>
      </div>
      <Table
        dataSource={listSessions}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="name"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />

      {/* update */}
      <Modal
        title="Change Session"
        onCancel={handleCancel}
        open={isModalVisible}
        footer={null}
        forceRender
      >
        {selectedSession && (
          <SessionOptions
            initialState={selectedSession}
            mode="update"
            onFinish={(values) => {
              console.log("submitted session update", {
                ...values,
                created_at: new Date(),
              });
            }}
          />
        )}
      </Modal>

      {/* Create */}
      <Modal
        title="Create Session"
        onCancel={handleCancel}
        open={isModalCreateVisible}
        footer={null}
        forceRender
      >
        <SessionOptions
          mode="create"
          onFinish={(values) => {
            console.log("submitted session create", {
              ...values,
              created_at: new Date(),
            });
          }}
        />
      </Modal>
    </Card>
  );
};

export default InstructorSessionList;
