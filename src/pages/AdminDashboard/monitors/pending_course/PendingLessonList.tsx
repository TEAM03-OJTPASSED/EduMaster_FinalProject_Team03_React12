import { Table, Input, Card, Tag, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Lesson, LessonTypeEnum, listLessons } from "../course/courseList";

const PendingLessonList = () => {
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
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (image_url, record) => {
        return (
          <div>
            <img src={image_url} alt={record.name} />
          </div>
        );
      },
    },
    {
      title: "Media",
      dataIndex: "video_url",
      key: "video_url",
      render: (video_url) => {
        return (
          <div className="h-full">
            <video className="h-[150px] w-[200px]" src={video_url} controls>
              Your browser does not support the video tag.
            </video>
          </div>
        );
      },
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
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">Lesson Management</h3>
      <div className="flex flex-wrap items-center mb-4">
      <Input
        placeholder="Search By Lesson Name"
        prefix={<SearchOutlined />}
        className="w-full md:w-1/3 mb-2 md:mb-0"
      />
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
    </Card>
  );
};

export default PendingLessonList;
