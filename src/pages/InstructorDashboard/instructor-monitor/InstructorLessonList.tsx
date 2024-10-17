import { useState } from "react";
import { Table, Input, Card, Tag, TableProps, Button, Modal } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import LessonIOptions from "./create-courses/LessonIOptions";
import {
  Lesson,
  LessonTypeEnum,
  listLessons,
} from "../../AdminDashboard/monitors/course/courseList";

const InstructorLessonList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>({} as Lesson);

  const showModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalVisible(true);
  };

  const showCreateModal = () => {
    setIsModalCreateVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
  };

  const columns: TableProps<Lesson>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Session Name",
      dataIndex: "session_id",
      key: "session_id",
    },
    {
      title: "Instructor",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Type",
      dataIndex: "lesson_type",
      key: "lesson_type",
      render: (lesson_type: LessonTypeEnum) => {
        return <Tag color="gray">{lesson_type}</Tag>;
      },
    },
    {
      title: "Time",
      dataIndex: "full_time",
      key: "full_time",
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
      title: "Action",
      key: "action",
      render: (_, record: Lesson) => (
        // chi dc cho phep chinh sua neu nhu status la accept
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
    console.log("Delete lesson with id:", id);
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Lesson Management</h3>
      <div className="flex justify-between">
        <Input
          placeholder="Search By Lesson Name"
          prefix={<SearchOutlined />}
          style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        />
        <div className="flex">
          {/* lam sau: chi show khi co course session ton tai hoac course ton tai */}
          <Button
            onClick={showCreateModal}
            icon={<PlusCircleOutlined />}
            shape="round"
            variant="solid"
            color="primary"
            className="items-center"
          >
            Create Lesson
          </Button>
        </div>
      </div>
      <Table
        dataSource={listLessons}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />

      {/* update */}
      <Modal
        title="Lesson Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        forceRender
      >
        {selectedLesson && (
          <LessonIOptions
            onFinished={(values) => {
              console.log("Lesson update", {
                ...values,
                create_at: new Date(),
              });
            }}
            mode="update"
            initialValues={selectedLesson}
          />
        )}
      </Modal>

      {/* create */}
      <Modal
        title="Lesson Details"
        open={isModalCreateVisible}
        onCancel={handleCancel}
        footer={null}
        forceRender
      >
        <LessonIOptions
          onFinished={(values) => {
            console.log("Lesson create", {
              ...values,
              create_at: new Date(),
            });
          }}
          mode="create"
        />
      </Modal>
    </Card>
  );
};

export default InstructorLessonList;
