import React, { useState } from "react";
import { Table, Input, Card, Tag, TableProps, Button, Modal } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Course, CourseStatusEnum, listCourses } from "./courseList";
const CourseList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const showModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: TableProps<Course>["columns"] = [
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
        switch (status) {
          case CourseStatusEnum.new:
            return <Tag color="green">New</Tag>;
          case CourseStatusEnum.waiting_approve:
            return <Tag color="red">Waiting Approve</Tag>;
          case CourseStatusEnum.approve:
            return <Tag color="yellow">Approve</Tag>;
          case CourseStatusEnum.reject:
            return <Tag color="yellow">Reject</Tag>;
          case CourseStatusEnum.active:
            return <Tag color="yellow">Active</Tag>;
          case CourseStatusEnum.inactive:
            return <Tag color="yellow">Inactive</Tag>;
          default:
            return <Tag color="gray">Unknown</Tag>;
        }
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
      render: (discount: number) => {
        return (
          <div>
            <span className="text-red-500"> {discount}%</span>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: Course) => (
        <>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDelete(record.name)}
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

  const handleDelete = (name: string) => {
    console.log(name);
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Course Management</h3>
      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />
      <Table
        dataSource={listCourses}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="name"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />

      <Modal
        title="Course Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedCourse && (
          <div>
            <p><strong>Name:</strong> {selectedCourse.name}</p>
            <p><strong>Category:</strong> {selectedCourse.category_id}</p>
            <p><strong>Content:</strong> {selectedCourse.content}</p>
            <p><strong>Price:</strong> {selectedCourse.price}</p>
            <p><strong>Discount:</strong> {selectedCourse.discount}%</p>
            <p><strong>Status:</strong> {selectedCourse.status}</p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default CourseList;
