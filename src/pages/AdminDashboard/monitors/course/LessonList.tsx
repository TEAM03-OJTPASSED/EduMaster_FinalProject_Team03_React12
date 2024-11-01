import { Table, Input, Card, Tag, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { GetLessons, Lesson, LessonTypeEnum } from "../../../../models/Lesson.model";
import { useEffect, useState } from "react";
import LessonService from "../../../../services/lesson.service";
import { useDebouncedSearch } from "../../../../hooks/useSearch";

const LessonList = () => {
  const [searchText, setSearchText] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [courses, setCourses] = useState<Lesson[]>([]);
  const filteredData = useDebouncedSearch(courses, searchText, 300, ["name", "category_id"]);

  const fetchLessons = async () => {
    const searchParams: GetLessons = {
      searchCondition: {
        keyword: searchText,
        course_id: "",
        is_position_order: true,
        is_deleted: false,
      },
      pageInfo: { pageNum, pageSize },
    };

    try {
      const response = await LessonService.getLessons(searchParams);
      const responseData = response.data?.pageData;
      const flattenedUsers: Lesson[] = Array.isArray(responseData)
        ? responseData.flat() // Dùng flat() để chuyển thành User[]
        : [];
      setCourses(flattenedUsers);
      setTotal(response.data?.pageInfo?.totalItems ?? 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  useEffect(() => {
    fetchLessons();
  }, [pageNum, pageSize]);

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
    // {
    //   title: "Image",
    //   dataIndex: "image_url",
    //   key: "image_url",
    //   render: (image_url, record) => {
    //     return (
    //       <div>
    //         <img src={image_url} alt={record.name} />
    //       </div>
    //     );
    //   },
    // },
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
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        rowKey="id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default LessonList;
