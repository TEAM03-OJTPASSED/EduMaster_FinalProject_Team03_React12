import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Card,
  Tag,
  Button,
  Modal,
  message,
  Space,
  Tooltip,
} from "antd";
import {
  Course,
  CourseStatusEnum,
  CourseStatusUpdate,
  GetCourses,
} from "../../../../models/Course.model";
import CourseService from "../../../../services/course.service";
import { PageInfo } from "../../../../models/SearchInfo.model";
import { Category, GetCategories } from "../../../../models/Category.model";
import CategoryService from "../../../../services/category.service";
import GlobalSearchUnit from "../../../../components/GlobalSearchUnit";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ellipsisText } from "../../../../utils/ellipsisText";

const PendingCourseList: React.FC = () => {
  // State variables
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<Category[]>([]);
  const [reasonReject, setReasonReject] = useState<string>("");
  const [reasonVisible, setReasonVisible] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<Course>({} as Course);
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

  // Fetch data functions
  const fetchDataCourse = async () => {
    setLoading(true);
    try {
      const res = await CourseService.getCourses(courseSearchParam);
      setCoursePendingList(res?.data?.pageData as Course[]);
      setCurrentCourses(res?.data?.pageInfo as PageInfo);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const categorySearchParam: GetCategories = {
        searchCondition: {
          keyword: "",
          is_deleted: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 100,
        },
      };
      const res = await CategoryService.getCategories(categorySearchParam);
      setCategoryFilter(res?.data?.pageData as Category[]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial load and when courseSearchParam changes
  useEffect(() => {
    fetchDataCourse();
    fetchCategories();
  }, [courseSearchParam]);

  // Table columns definition
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (course_name: string) => {
        return (
          <div>
            <Tooltip title={course_name}>
              {ellipsisText(course_name, 50)}
            </Tooltip>
          </div>
        );
      },
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
        const colorMap = {
          [CourseStatusEnum.NEW]: "green",
          [CourseStatusEnum.WAITING_APPROVE]: "orange",
          [CourseStatusEnum.APPROVE]: "yellow",
          [CourseStatusEnum.REJECT]: "red",
          [CourseStatusEnum.ACTIVE]: "blue",
          [CourseStatusEnum.INACTIVE]: "gray",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
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
        <span className="text-red-500">{discount}%</span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (record: Course) => (
        <Space size="middle">
          <Tooltip title="Accept">
            <Button
              type="text"
              icon={<CheckOutlined />}
              onClick={() =>
                handleUpdateStatus(CourseStatusEnum.APPROVE, record)
              }
            />
          </Tooltip>
          <Tooltip title="Reject">
            <Button
              className="text-red-600"
              icon={<CloseOutlined />}
              type="text"
              onClick={() => handleShowReason(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Handle modal display
  const handleShowReason = (record: Course) => {
    setCurrentCourse(record);
    setReasonVisible(true);
  };

  // Handle search filter submission
  const handleSearch = (values: Record<string, any>) => {
    setCourseSearchParam((prev) => ({
      ...prev,
      searchCondition: {
        ...prev.searchCondition,
        category_id: values.category_id,
        keyword: values.keyword,
        status: "waiting_approve",
      },
    }));
  };

  // Handle course status update
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
    message.success("Status updated successfully");
    setCoursePendingList((pendingCourses) => pendingCourses.filter((item)=> item._id !== course._id))
    setReasonVisible(false);
    setReasonReject(""); // Reset the reason when the modal closes
  };

  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">Approve Courses</h3>
        <div>
          <GlobalSearchUnit
            placeholder="Search By Course Name"
            selectFields={[
              {
                name: "category_id",
                options: categoryFilter.map((category) => ({
                  label: category.name,
                  value: category._id,
                })),
                placeholder: "Filter by Category",
              },
            ]}
            onSubmit={handleSearch}
          />
        </div>
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
          loading={loading}
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
            onClick={() =>
              handleUpdateStatus(CourseStatusEnum.REJECT, currentCourse)
            }
          >
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
