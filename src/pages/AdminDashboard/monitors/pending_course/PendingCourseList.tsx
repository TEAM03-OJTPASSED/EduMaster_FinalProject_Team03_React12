import React from "react";
import { Table, Input, Card, Tag, TableProps, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
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
      render: (status: CourseStatusEnum) => {
        switch (status) {
          case CourseStatusEnum.NEW:
            return <Tag color="green">New</Tag>;
          case CourseStatusEnum.WAITING_APPROVE:
            return <Tag color="red">Waiting Approve</Tag>;
          case CourseStatusEnum.APPROVED:
            return <Tag color="yellow">Approve</Tag>;
          case CourseStatusEnum.REJECTED:
            return <Tag color="yellow">Reject</Tag>;
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
      title: "Action",
      key: "action",
      render: (_, record: Course) => (
        <div className="flex gap-2">
          <Button
            type="text"
            color="primary"
            variant="solid"
            onClick={() =>
              handleUpdateStatus(record.id, CourseStatusEnum.APPROVED)
            }
          >
            Approve
          </Button>
          <Button
            type="text"
            color="danger"
            variant="outlined"
            onClick={() =>
              handleUpdateStatus(record.id, CourseStatusEnum.REJECTED)
            }
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const handleUpdateStatus = (id: number, status: string) => {
    // tao 1 api update by id chung
    console.log("update", { id, status });
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


    </Card>
  );
};

export default PendingCourseList;
