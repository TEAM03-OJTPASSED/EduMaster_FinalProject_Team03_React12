import { useState, useEffect } from "react";
import { Table, Input, Card, TableProps, Button, Modal, Select } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import {
  listCourses,
  listSessions,
  Session,
} from "../../AdminDashboard/monitors/course/courseList";
import SessionOptions from "./create-courses/SessionOptions";

const InstructorSessionList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>();
  const [searchText, setSearchText] = useState("");
  const [filteredSessions, setFilteredSessions] = useState<Session[]>(listSessions);

  const showModal = (session: Session) => {
    setSelectedSession(session);
    setIsModalVisible(true);
  };

  const showModalCreate = () => {
    setIsModalCreateVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
  };

  const handleCourseChange = (courseId: string | undefined) => {
    setSelectedCourse(courseId);
  };

  // filter sessions usefx
  useEffect(() => {
    let filtered = [...listSessions];

    if (selectedCourse) {
      filtered = filtered.filter(
        session => String(session.course_id) === String(selectedCourse)
      );
    }

    if (searchText) {
      filtered = filtered.filter(session =>
        session.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredSessions(filtered);
  }, [selectedCourse, searchText]);

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
        <div className=" gap-4 flex">
        <Input
          placeholder="Search By Session Name"
          prefix={<SearchOutlined />}
          style={{ width: "80%", marginBottom: "20px", borderRadius: "4px" }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          allowClear
          placeholder="Filter By Course"
          className="w-48"
          onChange={handleCourseChange}
          value={selectedCourse}
        >
          {listCourses.map(course => (
            <Select.Option key={course.id} value={String(course.id)}>
              {course.name}
            </Select.Option>
          ))}
        </Select>
        </div>
        <div className="flex">
          <Button
            onClick={showModalCreate}
            icon={<PlusCircleOutlined />}
            shape="round"
            type="primary"
            className="items-center"
          >
            Create Session
          </Button>
        </div>
      </div>
      <Table
        dataSource={filteredSessions}
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
        width={1000}
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
        width={1000}
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