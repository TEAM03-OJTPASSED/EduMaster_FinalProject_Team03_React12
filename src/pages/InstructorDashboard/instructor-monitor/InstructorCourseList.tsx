import React, { useState } from "react";
import { Table, Input, Card, Tag, Button, Modal, TableProps } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Course,
  CourseStatusEnum,
  listCourses,
} from "../../AdminDashboard/monitors/course/courseList";
import CourseOption from "./create-courses/CourseOption";

const InstructorCourseList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);

  // select course to send to admin
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const showModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const showModalCreate = () => {
    setIsModalCreateVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
  };

  const rowSelection: TableProps<Course>["rowSelection"] = {
    onChange: (_selectedRowKeys: React.Key[], selectedRows: Course[]) => {
      setSelectedCourses(selectedRows);
    },
  };
  // send course request to Admin
  const handleSendToAdmin = () => {
    // api send list courses to admin, dung message de gui
    console.log(selectedCourses);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category Name",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: CourseStatusEnum) => {
        const statusColors = {
          [CourseStatusEnum.NEW]: "green",
          [CourseStatusEnum.WAITING_APPROVE]: "red",
          [CourseStatusEnum.APPROVED]: "yellow",
          [CourseStatusEnum.REJECTED]: "yellow",
          [CourseStatusEnum.ACTIVE]: "yellow",
          [CourseStatusEnum.INACTIVE]: "yellow",
        };
        return <Tag color={statusColors[status] || "gray"}>{status}</Tag>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => (
        <div>
          <span className="text-red-500">{discount}%</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: Course) => (
        <div className="flex">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDelete(record.name)}
          />
        </div>
      ),
    },
  ];

  const handleDelete = (name: string) => {
    console.log(name);
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Course Management</h3>
      <div className="flex justify-between">
        <Input
          placeholder="Search By Course Name"
          prefix={<SearchOutlined />}
          style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        />
        <div className="flex gap-x-3">
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
          <Button
            onClick={handleSendToAdmin}
            disabled={selectedCourses.length < 1}
            shape="round"
            variant="solid"
          >
            Send request
          </Button>
        </div>
      </div>
      <Table
        dataSource={listCourses}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="name"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
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
        {selectedCourse && (
          <CourseOption
            initializeValue={selectedCourse}
            mode="update"
            onFinished={(values) => {
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
        <CourseOption
          mode="create"
          onFinished={(values) => {
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

export default InstructorCourseList;
