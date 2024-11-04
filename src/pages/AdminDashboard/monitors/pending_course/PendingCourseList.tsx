import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Table,
  Input,
  Card,
  Tag,
  TableProps,
  Button,
  Modal,
  message,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  Course,
  CourseStatusEnum,
  CourseStatusUpdate,
  GetCourses,
} from "../../../../models/Course.model";
import CourseService from "../../../../services/course.service";
import { PageInfo } from "../../../../models/SearchInfo.model";
import useDebounce from "../../../../hooks/useDebounce";

const PendingCourseList: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const searchDebounce = useDebounce(searchText, 2000);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  // Reject Courses
  const [reasonReject, setReasonReject] = useState<string>("");
  const [reasonVisible, setReasonVisible] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<Course>({} as Course);
  //
  const [coursePendingList, setCoursePendingList] = useState<Course[]>([]);
  const [currentCourses, setCurrentCourses] = useState<PageInfo>(
    {} as PageInfo
  );
  const [courseSearchParam, setCourseSearchParam] = useState<GetCourses>({
    searchCondition: {
      keyword: "",
      category_id: "",
      status: "waiting_approve",
      is_deleted: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 5,
    },
  });
  useEffect(() => {
    setCourseSearchParam((prev) => ({
      ...prev,
      searchCondition: { ...prev.searchCondition, keyword: searchDebounce },
    }));
  }, [searchDebounce]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await CourseService.getCourses(courseSearchParam);
      setCoursePendingList(res?.data?.pageData as Course[]);
      setCurrentCourses(res?.data?.pageInfo as PageInfo);
      console.log();
    };
    fetchData();
  }, [courseSearchParam]);

  const columns: TableProps<Course>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Instructor",
      dataIndex: "user_name",
      key: "user_name",
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
            return <Tag color="orange">Waiting Approve</Tag>;
          case CourseStatusEnum.APPROVE:
            return <Tag color="yellow">Approve</Tag>;
          case CourseStatusEnum.REJECT:
            return <Tag color="red">Reject</Tag>;
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
      render: (discount: number) => (
        <div>
          <span className="text-red-500"> {discount}%</span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record: Course) => (
        <Space size="middle">
          <Button
            type="text"
            color="primary"
            variant="solid"
            onClick={() => handleUpdateStatus(CourseStatusEnum.APPROVE, record)}
          ></Button>
          <Button
            className="text-red-600"
            type="text"
            color="danger"
            variant="outlined"
            onClick={() => handleShowReason(record)}
          ></Button>
        </Space>
      ),
    },
  ];

  const handleShowReason = (record: any) => {
    setCurrentCourse(record);
    setReasonVisible(true);
  };
  const handleUpdateStatus = async (
    status: CourseStatusEnum,
    course: Course
  ) => {
    const formAction: CourseStatusUpdate = {
      course_id: course._id,
      new_status: status,
      comment: reasonReject,
    };
    await CourseService.updateCourseStatus(formAction);
    message.success("Submit preview successfully");
    setReasonVisible(false);
  };

  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">Approve Courses</h3>
        <Input
          placeholder="Search By Course Name"
          prefix={<SearchOutlined />}
          style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
          onChange={handleSearchChange}
        />
        <Table
          dataSource={coursePendingList}
          columns={columns}
          pagination={{
            current: currentCourses.pageNum,
            pageSize: currentCourses.pageSize,
            total: currentCourses.totalItems,
            onChange: (pageNum, pageSize) => {
              setCourseSearchParam((prev) => ({
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
      <Modal
        title="Reject Reason"
        open={reasonVisible}
        onCancel={() => setReasonVisible(false)}
        footer={[
          <Button
            color="primary"
            key="submit"
            variant="solid"
            htmlType="submit"
            onClick={() =>
              handleUpdateStatus(CourseStatusEnum.REJECT, currentCourse)
            }
          >
            {/* {loading ? <Spin /> : <span>Submit</span>} */}
            Submit
          </Button>,
        ]}
      >
        <Input.TextArea
          value={reasonReject}
          onChange={(e) => setReasonReject(e.target.value)}
          style={{ height: "100px" }}
          placeholder="Comment here..."
        />
      </Modal>
    </div>
  );
};

export default PendingCourseList;
