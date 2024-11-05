import { Table, Input, Card, Tag, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LessonTypeEnum } from "../course/courseList";
import { GetLessons, Lesson } from "../../../../models/Lesson.model";
import { PageInfo } from "../../../../models/SearchInfo.model";
import { ChangeEvent, useEffect, useState } from "react";
import LessonService from "../../../../services/lesson.service";
import useDebounce from "../../../../hooks/useDebounce";

const PendingLessonList = () => {
  const [searchText, setSearchText] = useState<string>("");
  const searchDebounce = useDebounce(searchText, 2000);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const [lessonPendingList, setLessonPendingList] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<PageInfo>({} as PageInfo);
  const [lessonSearchParam, setLessonSearchParam] = useState<GetLessons>({
    searchCondition: {
      keyword: "",
      course_id: "",
      session_id: "",
      is_position_order: false,
      is_deleted: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 5,
    },
  });

  useEffect(() => {
    setLessonSearchParam((prev) => ({
      ...prev,
      searchCondition: { ...prev.searchCondition, keyword: searchDebounce },
    }));
  }, [searchDebounce]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await LessonService.getLessons(lessonSearchParam);
      setLessonPendingList(res?.data?.pageData as Lesson[]);
      setCurrentLesson(res?.data?.pageInfo as PageInfo);
      console.log();
    };
    fetchData();
  }, [lessonSearchParam]);
  const columns: TableProps<Lesson>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Session Name",
      dataIndex: "session_name",
      key: "session_name",
    },
    {
      title: "Instructor",
      dataIndex: "user_name",
      key: "user_name",
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
          style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
          onChange={handleSearchChange}
        />
      </div>
      <Table
        dataSource={lessonPendingList}
        columns={columns}
        pagination={{
          pageSize: currentLesson.pageSize,
          total: currentLesson.totalItems,
          current: currentLesson.pageNum,
          onChange: (pageNum, pageSize) => {
            setLessonSearchParam((prev) => ({
              ...prev,
              pageInfo: { pageNum, pageSize },
            }));
          },
        }}
        rowKey={(record) => record._id}
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default PendingLessonList;
