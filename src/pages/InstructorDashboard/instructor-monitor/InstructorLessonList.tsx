import { useState } from "react";
import { Table, Input, Card, Tag, TableProps, Button, Modal } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Lesson, LessonTypeEnum, listLessons } from "../../AdminDashboard/monitors/course/courseList";


const InstructorLessonList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const showModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      title: "Action",
      key: "action",
      render: (_, record: Lesson) => (
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
    console.log("Delete lesson with id:", id);
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Lesson Management</h3>
      <Input
        placeholder="Search By Lesson Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />
      <Table
        dataSource={listLessons}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />

      <Modal
        title="Lesson Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedLesson && (
          <div>
            <p><strong>Name:</strong> {selectedLesson.name}</p>
            <p><strong>Session ID:</strong> {selectedLesson.session_id}</p>
            <p><strong>Instructor ID:</strong> {selectedLesson.user_id}</p>
            <p><strong>Type:</strong> {selectedLesson.lesson_type}</p>
            <p><strong>Time:</strong> {selectedLesson.full_time} minutes</p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default InstructorLessonList;
