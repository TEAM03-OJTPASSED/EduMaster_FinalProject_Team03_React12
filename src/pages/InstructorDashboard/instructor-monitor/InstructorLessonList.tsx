import { useEffect, useState } from "react";
import { Table, Card, Tag, TableProps, Button, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import LessonIOptions from "./create-courses/LessonIOptions";
import { GetLessons, Lesson, LessonRequest } from "../../../models/Lesson.model";
import CourseService from "../../../services/course.service";
import SessionService from "../../../services/session.service";
import { Course, GetCourses } from "../../../models/Course.model";
import { GetSessions, Session } from "../../../models/Session.model";
import LessonService from "../../../services/lesson.service";
import { handleNotify } from "../../../utils/handleNotify";
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";


const initialCoursesParams: GetCourses = {
  pageInfo: {
    pageNum: 1,
    pageSize: 100,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    category_id: "",
  }
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
  }
};

const initialLessonsParams: GetLessons = {
  pageInfo: {
    pageNum: 1,
    pageSize: 10,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    course_id: "",
    is_position_order: false
  }
};

const InstructorLessonList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>({} as Lesson);
  // const [selectedCourse, setSelectedCourse] = useState<string>();
  // const [selectedSession, setSelectedSession] = useState<string>();
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [listSessions, setListSessions] = useState<Session[]>([]);
  const [listLessons, setListLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<GetLessons>(initialLessonsParams)

  const showModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalVisible(true);
  };

  const showCreateModal = () => {
    setIsModalCreateVisible(true);
  };

  const resetModalState = () => {
    setSelectedLesson({} as Lesson);
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
  };

  const handleCancel = () => {
    resetModalState();
  };



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


  const fetchLessons = async () => {
    setLoading(true); 
    try {
      const response = await LessonService.getLessons(searchParams);
      setListLessons(response?.data?.pageData ?? []);
    } finally {
      setLoading(false); 
    }
  };

  

  const handleCreateLesson = async (values: LessonRequest) => {
    const { position_order, full_time, image_url, video_url, assignment, ...otherValues } = values;
    const numericValues = {
      ...otherValues,
      position_order: position_order ? Number(position_order) : 0,
      full_time: full_time ? Number(full_time) : 0,
      video_url: video_url || "",
      image_url: image_url || "",
      assignment: assignment || "",
    };
  
    setLoading(true);
    try {
      const response = await LessonService.createLesson(numericValues);
      if (response.success) {
        resetModalState();
        handleNotify("Lesson Created Successfully", "The lesson has been created successfully.");
        await fetchLessons();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLesson = async (updatedLesson: LessonRequest) => {
    setLoading(true);
    try {
      if (selectedLesson) {
        const response = await LessonService.updateLesson(selectedLesson._id, updatedLesson);
        if (response.success) {
          resetModalState();
          handleNotify("Lesson Updated Successfully", "The lesson has been updated successfully.");
          await fetchLessons();
        }
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    setLoading(true);
    try {
      const response = await LessonService.deleteLesson(lessonId);
      if (response.success) {
        handleNotify("Lesson Deleted Successfully", "The lesson has been deleted successfully.");
        await fetchLessons();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchSessions();
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [searchParams]);

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
      title: "Media",
      dataIndex: "lesson_type",
      key: "lesson_type",
      render: (lesson_type: "video" | "image") => {
        return <Tag color="gray">{lesson_type}</Tag>;
      },
    },
    {
      title: "Time",
      dataIndex: "full_time",
      key: "full_time",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: Lesson) => (
        <>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDeleteLesson(record._id)}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "blue" }} />}
            onClick={() => showModal(record)}
          />
        </>
      ),
    },
  ];

  const handleSearch = (values: Record<string, any>) => {
    setSearchParams({
      pageInfo: searchParams.pageInfo,
      searchCondition: {
        ...searchParams.searchCondition, // Spread existing searchCondition fields
        course_id: values.course_id,
        session_id: values.session_id,
        keyword: values.keyword,

      }
    });
  };


  // const handleCourseChange = (courseId: string) => {
  //   setSelectedCourse(courseId);
  //   setSelectedSession(undefined);
  // };

  // const handleSessionChange = (sessionId: string) => {
  //   setSelectedSession(sessionId);
  // };

  return (
    <Card>
      <h3 className="text-2xl my-5">Lesson Management</h3>
      <div className="flex justify-between">
        <div className="flex justify-between gap-4 mb-5 overflow-hidden">
          <GlobalSearchUnit 
            onSubmit={handleSearch}
            placeholder="Search by Lesson Name"
            isDependentSelect={true}
            selectFields={[
              {
                name: "course_id",
                placeholder:"Filter by Course",
                options: listCourses.map(course => ({
                  value: course._id,
                  label: course.name,
                }))
              },
              {
                name: "session_id",
                placeholder:"Filter by Session",
                options: listSessions.map(session => ({
                  value: session._id,
                  label: session.name,
                  dependence: session.course_id,
                })),
                dependenceName: "course_id",

              },

            ]}
          />



          {/* <Input
            placeholder="Search By Lesson Name"
            prefix={<SearchOutlined className="w-4 h-4" />}
            className="w-64"
          />
          <Select
            allowClear
            placeholder="Filter By Course"
            className="w-48"
            onChange={handleCourseChange}
            value={selectedCourse}
          >
            {listCourses.map(course => (
              <Select.Option key={course._id} value={String(course._id)}>
                {course.name}
              </Select.Option>
            ))}
          </Select>

          <Select
            allowClear
            placeholder="Filter By Session"
            className="w-48"
            onChange={handleSessionChange}
            value={selectedSession}
            disabled={!selectedCourse}
          >
            {selectedCourse && listSessions
              .filter(session => String(session.course_id) === String(selectedCourse))
              .map(session => (
                <Select.Option key={session._id} value={String(session._id)}>
                  {session.name}
                </Select.Option>
              ))}
          </Select> */}
        </div>

        <div className="flex">
          <Button
            onClick={showCreateModal}
            icon={<PlusCircleOutlined />}
            shape="round"
            type="primary"
            className="items-center"
          >
            Create Lesson
          </Button>
        </div>
      </div>
      <Table
        dataSource={listLessons}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
        loading={loading}
      />

      <Modal
        title="Lesson Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        forceRender
        width={1000}
        destroyOnClose={true}
      >
        {selectedLesson && (
          <LessonIOptions
            listCourses={listCourses}
            listSessions={listSessions}
            isLoading={loading}
            onFinished={handleUpdateLesson}
            mode="update"
            initialValues={selectedLesson}
          />
        )}
      </Modal>

      <Modal
        title={<h1 className="text-lg">Lesson Details</h1>}
        
        open={isModalCreateVisible}
        onCancel={handleCancel}
        footer={null}
        forceRender
        width={1200}
        className="min-h-800"
        destroyOnClose={true}

        
      >
        <LessonIOptions
          onFinished={handleCreateLesson}
          mode="create"
          isLoading={loading}
          listCourses={listCourses}
          listSessions={listSessions}
        />
      </Modal>
    </Card>
  );
};

export default InstructorLessonList;