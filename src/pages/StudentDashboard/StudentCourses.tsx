import React, { useState } from "react";
import { Table, Input, Card, Tag, Button, Tabs } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Course } from "../../components/UserAuthTest";
import {
  CourseStatusEnum,
  listCourses,
} from "../AdminDashboard/monitors/course/courseList";
import { useCustomNavigate } from "../../hooks/customNavigate";

const InstructorCourseList: React.FC = () => {
  const navigate = useCustomNavigate();
  const [activeTab, setActiveTab] = useState<string>("in-progress");

  // Navigate to course details page
  const handleViewCourse = (courseId: number) => {
    navigate(`/course-detail/${courseId}`);
  };

  // Table columns with fixed width
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (name: string, course: Course) => (
        <Button type="link" onClick={() => handleViewCourse(course.id)}>
          {name}
        </Button>
      ),
    },
    {
      title: "Author",
      dataIndex: "author_id",
      key: "author_id",
      width: 250,
      ellipsis: true,
      render: () => <p>University Of Michigan</p>,
    },
    {
      title: "Category",
      dataIndex: "category_id",
      key: "category_id",
      width: 150,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: 300,
      ellipsis: true, // Adding ellipsis for long content
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      width: 120,
      render: () => <Tag>80%</Tag>,
    },
    {
      title: "Actions",
      key: "action",
      width: 150,
      render: (course: Course) => (
        <div>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewCourse(course.id)}
            style={{ marginRight: 8 }}
          >
            View
          </Button>
          <Button type="link" icon={<DeleteOutlined />} danger>
            Unenroll
          </Button>
        </div>
      ),
    },
  ];

  // Filter courses based on the active tab
  const filteredCourses = listCourses.filter((course) => {
    if (activeTab === "in-progress") {
      return course.status === CourseStatusEnum.ACTIVE;//just for mock purposes
    }
    if (activeTab === "completed") {
      return course.status === CourseStatusEnum.WAITING_APPROVE; //just for mock purposes
    }
    return true;
  });

  return (
    <Card>
      <h3 className="text-2xl my-5">My Learning</h3>

      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />

      <Tabs defaultActiveKey="in-progress" onChange={setActiveTab}>
        <Tabs.TabPane tab="In Progress" key="in-progress">
          <Table
            dataSource={filteredCourses}
            columns={columns}
            pagination={{ pageSize: 5 }}
            rowKey="id"
            bordered
            scroll={{ x: true }} // Enables horizontal scrolling if columns overflow
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Completed" key="completed">
          <Table
            dataSource={filteredCourses}
            columns={columns}
            pagination={{ pageSize: 5 }}
            rowKey="id"
            bordered
            scroll={{ x: true }}
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default InstructorCourseList;
