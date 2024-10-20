import React, { ChangeEvent, useState } from "react";
import { Table, Input, Card, Tag, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Course, CourseStatusEnum, listCourses } from "./courseList";
import useDebounce from "../../../../hooks/useDebounce";

// mot de o utils sau

const CourseLists: React.FC = () => {
  const [inputSearch, setInputSearch] = useState("");
  const inputSearchDebouce = useDebounce(inputSearch, 500);

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    console.log(inputSearchDebouce);
    
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
      render: (discount: number) => {
        return (
          <div>
            <span className="text-red-500"> {discount}%</span>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">Course Management</h3>
      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        onChange={handleInputSearch}
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

export default CourseLists;
