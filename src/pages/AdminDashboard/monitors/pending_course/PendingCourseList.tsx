import React from "react";
import { Table, Input, Card, Tag, TableProps, Button, Space } from "antd";
import { CheckOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Course, CourseStatusEnum, listCourses } from "../course/courseList";

const PendingCourseList: React.FC = () => {
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
      filters: [
        { text: "Active", value: CourseStatusEnum.ACTIVE },
        { text: "New", value: CourseStatusEnum.NEW },
        { text: "Approve", value: CourseStatusEnum.APPROVED },
        { text: "Waiting Approve", value: CourseStatusEnum.WAITING_APPROVE },
        { text: "Reject", value: CourseStatusEnum.REJECTED },
        { text: "Inactive", value: CourseStatusEnum.INACTIVE },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: CourseStatusEnum) => {
        switch (status) {
          case CourseStatusEnum.NEW:
            return <Tag color="green">New</Tag>;
          case CourseStatusEnum.WAITING_APPROVE:
            return <Tag color="orange">Waiting Approve</Tag>;
          case CourseStatusEnum.APPROVED:
            return <Tag color="yellow">Approve</Tag>;
          case CourseStatusEnum.REJECTED:
            return <Tag color="red">Reject</Tag>;
          case CourseStatusEnum.ACTIVE:
            return <Tag color="yellow">Active</Tag>;
          case CourseStatusEnum.INACTIVE:
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
      render: (discount: number) => (
        <div>
          <span className="text-red-500"> {discount}%</span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record: Course) => (
        <Space size="middle">
          <Button
            type="text"
            className="text-green-600"
            icon={<CheckOutlined />}
            onClick={() =>
              handleUpdateStatus(record.id, CourseStatusEnum.APPROVED)
            }
          >
          </Button>
          <Button
            className="text-red-600"
            type="text"
            icon={<CloseOutlined />}
            onClick={() =>
              handleUpdateStatus(record.id, CourseStatusEnum.REJECTED)
            }
          >
          </Button>
        </Space>
      ),
    },
  ];

  const handleUpdateStatus = (id: number, status: string) => {
    // tao 1 api update by id chung
    console.log("update", { id, status });
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Approve Courses</h3>
      <div className="flex flex-wrap items-center mb-4">
      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        className="w-full md:w-1/3 mb-2 md:mb-0"
      />
      </div>
      <Table
        dataSource={listCourses}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="name"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default PendingCourseList;
