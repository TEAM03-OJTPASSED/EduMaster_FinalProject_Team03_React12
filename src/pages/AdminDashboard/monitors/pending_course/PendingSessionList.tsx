import { Table, Card, TableProps } from "antd";
import dayjs from "dayjs";
import { PageInfo } from "../../../../models/SearchInfo.model";
import {  useEffect, useState } from "react";
import { GetSessions, Session } from "../../../../models/Session.model";
import SessionService from "../../../../services/session.service";
import { Course, GetCourses } from "../../../../models/Course.model";
import CourseService from "../../../../services/course.service";
import GlobalSearchUnit from "../../../../components/GlobalSearchUnit";

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

const PendingSessionList = () => {


  const [sessionPendingList, setSessionPendingList] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [currentSession, setCurrentSession] = useState<PageInfo>(
    {} as PageInfo
  );
  const [sessionSearchParam, setSessionSearchParam] = useState<GetSessions>({
    searchCondition: {
      keyword: "",
      course_id: "",
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
      setListCourses(response.data?.pageData as Course[]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const res = await SessionService.getSessions(sessionSearchParam);
      setSessionPendingList(res?.data?.pageData as Session[]);
      setCurrentSession(res?.data?.pageInfo as PageInfo);
    };
    fetchData();
    fetchCourses()
  }, [sessionSearchParam]);


  const handleSearch = (values: Record<string, any>) => {
    setSessionSearchParam({
      ...sessionSearchParam,
      searchCondition: {
        ...sessionSearchParam.searchCondition,
        course_id: values.course_id || "",
        keyword: values.keyword || "",
      }
    });
  };


  const columns: TableProps<Session>["columns"] = [
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
      render: (created_at) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Position Order",
      dataIndex: "position_order",
      key: "position_order",
      render: (is_deleted) => {
        return <div className="text-red-600">{is_deleted}</div>;
      },
    },
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">Session Management</h3>
      <div className="flex justify-between overflow-hidden">
        <GlobalSearchUnit
          onSubmit={handleSearch}
          placeholder="Search By Session Name"
          selectFields={[
            {
              name: "course_id",
              options: listCourses.map((course) => ({ label: course.name, value: course._id })),
              placeholder: "Filter by Course",
            }
          ]}
        />
      </div>
      <Table
        dataSource={sessionPendingList}
        columns={columns}
        pagination={{
          current: currentSession.pageNum,
          pageSize: currentSession.pageSize,
          total: currentSession.totalItems,
          onChange: (pageNum, pageSize) => {
            setSessionSearchParam((prev) => ({
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

export default PendingSessionList;
