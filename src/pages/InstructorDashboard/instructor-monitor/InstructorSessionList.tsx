import { useState, useEffect } from "react";
import { Table, Card, Button, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";

import SessionOptions from "./create-courses/SessionOptions";
import { GetSessions, Session, SessionRequest } from "../../../models/Session.model";
import { Course, GetCourses } from "../../../models/Course.model";
import SessionService from "../../../services/session.service";
import CourseService from "../../../services/course.service";
import { handleNotify } from "../../../utils/handleNotify";
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";

const InstructorSessionList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [listSessions, setListSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);

  const showModal = (session: Session) => {
    setSelectedSession(null); // Reset the selected session first
    setSelectedSession(session);
    setIsModalVisible(true);
  };

  const showModalCreate = () => {
    setIsModalCreateVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
    setSelectedSession(null); // Reset selected session when closing
  };

 


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
  }

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
  }

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

  const handleCreateSession = async (values: SessionRequest) => {
    const { position_order, ...otherValues } = values;
    const numericValues = {
      ...otherValues,
      position_order: position_order ? Number(position_order) : 0,
    };
  
    setLoading(true);
    try {
      const response = await SessionService.createSession(numericValues);
      if (response.success) {
        handleCancel(); // Close modal if successful
        handleNotify("Session Created Successfully", "The session has been created successfully.");
        await fetchSessions(); // Refresh the course list
      }
    } finally {
      setLoading(false); // Ensures loading is set to false regardless of success/failure
    }
  };


  const handleUpdateSession = async (updatedSession: SessionRequest) => {
    setLoading(true);
    try {
      if (selectedSession) {
        const response = await SessionService.updateSession(selectedSession._id, updatedSession);
        if (response.success) {
          handleNotify("Session Updated Successfully", "The session has been updated successfully.");
          await fetchSessions(); // Refresh the course list
        }
      }
    } finally {
      setLoading(false); 
    }
  }

  const handleDeleteSession = async (sessionId: string) => {
    setLoading(true);
    try {
      const response = await SessionService.deleteSession(sessionId);
      if (response.success) {
        handleNotify("Session Deleted Successfully", "The Session has been deleted successfully.");
        await fetchSessions(); // Refresh the course list
      }
    } finally {
      setLoading(false); // Ensures loading is set to false regardless of success/failure
    }
  }


  useEffect(() => {
        fetchCourses(); // Call the async function
        fetchSessions(); // Call the async function
  },[]);

  // filter sessions usefx
  // useEffect(() => {
  //   let filtered = [...listSessions];

  //   if (selectedCourse) {
  //     filtered = filtered.filter(
  //       session => String(session.course_id) === String(selectedCourse)
  //     );
  //   }

  //   if (searchText) {
  //     filtered = filtered.filter(session =>
  //       session.name.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //   }

  //   setFilteredSessions(filtered);
  // }, [selectedCourse, searchText]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (record: Session) => {
        return <div>{dayjs(record._id).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: Session) => (
        <>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDeleteSession(record._id)}
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

  

  return (
    <Card>
      <h3 className="text-2xl my-5">Session Management</h3>
      <div className="flex justify-between overflow-hidden">
          <GlobalSearchUnit 
          placeholder="Search By Session Name"
          selectFields={[
            {
              name: "course_id",
              options: listCourses.map((course) => ({label: course.name, value: course._id})),
              placeholder: "Filter by Course"
            }
          ]}
          />
        {/* <Input
          placeholder="Search By Session Name"
          prefix={<SearchOutlined />}
          style={{ width: "80%", marginBottom: "20px", borderRadius: "4px" }}
          // onChange={(e) => setSearchText(e.target.value)}
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
        </Select> */}
        <div className="flex">
          <Button
            onClick={showModalCreate}
            icon={<PlusCircleOutlined />}
            shape="round"
            type="primary"
            className="items-center"
          >
            Create Session
          </Button>
        </div>
      </div>
      <Table
        dataSource={listSessions}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="name"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
        loading={loading}
      />

      {/* update */}
      <Modal
        title="Change Session"
        onCancel={handleCancel}
        open={isModalVisible}
        footer={null}
        forceRender
        width={1000}
        destroyOnClose={true}
      >
        {selectedSession && (
          <SessionOptions
            key={selectedSession._id}
            isLoading={loading}
            listCourses={listCourses}
            initialState={selectedSession}
            mode="update"
            onFinish={handleUpdateSession}
          />
        )}
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Create Session"
        onCancel={handleCancel}
        open={isModalCreateVisible}
        footer={null}
        forceRender
        width={1000}
        destroyOnClose={true} 
      >
        <SessionOptions
          key={isModalCreateVisible ? 'create-new' : 'create'} 
          listCourses={listCourses}
          mode="create"
          onFinish={handleCreateSession}
          isLoading={loading}
        />
      </Modal>
    </Card>
  );
};

export default InstructorSessionList;