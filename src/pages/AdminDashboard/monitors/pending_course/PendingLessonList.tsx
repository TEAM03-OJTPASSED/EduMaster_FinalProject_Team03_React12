import { Table, Card, Tag, TableProps } from "antd";
import { LessonTypeEnum } from "../course/courseList";
import { GetLessons, Lesson } from "../../../../models/Lesson.model";
import { PageInfo } from "../../../../models/SearchInfo.model";
import { useEffect, useState } from "react";
import LessonService from "../../../../services/lesson.service";
import GlobalSearchUnit from "../../../../components/GlobalSearchUnit";
import { GetSessions, Session } from "../../../../models/Session.model";
import { Course, GetCourses } from "../../../../models/Course.model";
import CourseService from "../../../../services/course.service";
import SessionService from "../../../../services/session.service";


const initialCoursesParams: GetCourses = {
  pageInfo: {
    pageNum: 1,
    pageSize: 100,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    category_id: "",
  },
};

const initialSessionsParams: GetSessions = {
  pageInfo: {
    pageNum: 1,
    pageSize: 10,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    is_position_order: true,
    course_id: "",
  },
};


const PendingLessonList = () => {
  const [loading, setLoading] = useState(false);
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [listSessions, setListSessions] = useState<Session[]>([]);
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

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await CourseService.getCourses(initialCoursesParams);
      setListCourses(response?.data?.pageData ?? []);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await SessionService.getSessions(initialSessionsParams);
      setListSessions(response?.data?.pageData ?? []);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataLesson = async () => {
    setLoading(true);
    try {
      const res = await LessonService.getLessons(lessonSearchParam);
      setLessonPendingList(res?.data?.pageData as Lesson[]);
      setCurrentLesson(res?.data?.pageInfo as PageInfo);
    } catch (error) {
      console.error("Failed to fetch lessons", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchSessions();
  }, []);

  useEffect(() => {
    fetchDataLesson();
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
      render: (image_url, record) => (
        <div>
          <img src={image_url} alt={record.name} style={{ maxWidth: "100px", maxHeight: "100px" }} />
        </div>
      ),
    },
    {
      title: "Media",
      dataIndex: "video_url",
      key: "video_url",
      render: (video_url) => (
        <div className="h-full w-full md:w-[200px]">
          <video className="w-[200px] 2h-auto" src={video_url} controls>
            Your browser does not support the video tag.
          </video>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "lesson_type",
      key: "lesson_type",
      render: (lesson_type: LessonTypeEnum) => <Tag color="gray">{lesson_type}</Tag>,
    },
    {
      title: "Time",
      dataIndex: "full_time",
      key: "full_time",
    },
  ];

  const handleSearch = (values: Record<string, any>) => {
    setLessonSearchParam({
      ...lessonSearchParam,
      searchCondition: {
        ...lessonSearchParam.searchCondition,
        keyword: values.keyword,
        course_id: values.course_id,
        session_id: values.session_id,
      },
    });
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Lesson Management</h3>
      <div className="flex justify-between">
        <div className="flex justify-between gap-4 mb-5 overflow-hidden">
          <GlobalSearchUnit
            onSubmit={handleSearch}
            placeholder="Search by Lesson Name"
            isDependentSelect
            selectFields={[
              {
                name: "course_id",
                placeholder: "Filter by Course",
                options: listCourses.map((course) => ({
                  value: course._id,
                  label: course.name,
                })),
              },
              {
                name: "session_id",
                placeholder: "Filter by Session",
                options: listSessions.map((session) => ({
                  value: session._id,
                  label: session.name,
                  dependence: session.course_id,
                })),
                dependenceName: "course_id",
              },
            ]}
          />
        </div>
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
        loading={loading}
      />
    </Card>
  );
};

export default PendingLessonList;
