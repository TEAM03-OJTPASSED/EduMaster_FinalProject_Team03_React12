import { useEffect, useState } from "react";
import { Card, Input, Table, Tag, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import {
  Course,
  CourseLog,
  CourseStatusEnum,
  GetCourseLogs,
} from "../../models/Course.model";
import { CoursesSearchParams, PageInfo } from "../../models/SearchInfo.model";
import CourseService from "../../services/course.service";

const columns = [
  {
    title: "Course Name",
    dataIndex: "course_name",
    key: "course_name",
  },
  {
    title: "Old Status",
    dataIndex: "old_status",
    key: "old_status",
    render: (old_status: CourseStatusEnum) => (
      <Tag
        color={
          old_status === CourseStatusEnum.ACTIVE
            ? "green"
            : old_status === CourseStatusEnum.APPROVE
            ? "blue"
            : old_status === CourseStatusEnum.REJECT
            ? "red"
            : "orange"
        }
      >
        {old_status}
      </Tag>
    ),
  },
  {
    title: "New Status",
    dataIndex: "new_status",
    key: "new_status",
    render: (new_status: CourseStatusEnum) => (
      <Tag
        color={
          new_status === CourseStatusEnum.ACTIVE
            ? "green"
            : new_status === CourseStatusEnum.APPROVE
            ? "blue"
            : new_status === CourseStatusEnum.REJECT
            ? "red"
            : "orange"
        }
      >
        {new_status}
      </Tag>
    ),
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
  },
];

const CourseLogPage = () => {
  const [searchText, setSearchText] = useState("");
  const [courseLogList, setCourseLogList] = useState<CourseLog[]>([]);
  const [currentLog, setCurrentLog] = useState<PageInfo>({
    pageNum: 1,
    pageSize: 10,
    totalItems: 0,
  });
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const courseSearchParam: CoursesSearchParams = {
      searchCondition: {
        keyword: "",
        category_id: "",
        status: "",
        is_deleted: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
    };

    const fetchCourseLog = async (pageNum: number) => {
      try {
        const resCourses = await CourseService.getCourses({
          ...courseSearchParam,
          pageInfo: { ...courseSearchParam.pageInfo, pageNum },
        });

        if (resCourses.success) {
          const list = resCourses.data?.pageData as Course[];

          // Tạo mảng các promise để fetch logs cho từng course
          const logPromises = list.map((item) => {
            const searchParam: GetCourseLogs = {
              searchCondition: {
                course_id: item._id,
                keyword: "",
                old_status: "",
                new_status: "",
                is_deleted: false,
              },
              pageInfo: {
                pageNum,
                pageSize: 10,
              },
            };
            return CourseService.getCourseLogs(searchParam);
          });

          // Chờ tất cả các promise hoàn thành
          const logResponses = await Promise.all(logPromises);

          // Lấy tất cả dữ liệu logs và gộp vào mảng duy nhất
          const allLogs = logResponses.flatMap(
            (response) => response.data?.pageData || []
          );

          setCourseLogList(allLogs);
          setCurrentLog({
            pageNum,
            pageSize: 10,
            totalItems: resCourses.data?.pageInfo?.totalItems,
          });
        }
      } catch (error) {
        message.error("Failed to fetch course logs");
      }
    };

    fetchCourseLog(pageNum);
  }, [pageNum]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handlePageChange = (newPage: number) => {
    setPageNum(newPage);
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Course Log</h3>
      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        value={searchText}
        onChange={handleSearch}
      />
      <Table
        dataSource={courseLogList}
        columns={columns}
        pagination={{
          current: pageNum,
          pageSize: currentLog.pageSize,
          total: currentLog.totalItems,
          onChange: handlePageChange,
        }}
        rowKey={(record) => record._id}
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default CourseLogPage;
