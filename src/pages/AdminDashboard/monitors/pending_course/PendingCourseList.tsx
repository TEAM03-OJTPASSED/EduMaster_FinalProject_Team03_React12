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
  Select,
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
import { Category, GetCategories } from "../../../../models/Category.model";
import CategoryService from "../../../../services/category.service";


const PendingCourseList: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const searchDebounce = useDebounce(searchText, 2000);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Status and category filters
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
    };
    fetchData();
  }, [courseSearchParam]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categorySearchParam: GetCategories = {
        searchCondition: {
          keyword: "",
          is_deleted: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      };
      const res = await CategoryService.getCategories(categorySearchParam);
      setCategoryFilter(res?.data?.pageData as Category[]);
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (value: string) => {
    setCourseSearchParam((prev) => ({
      ...prev,
      searchCondition: { ...prev.searchCondition, category_id: value },
    }));
  };

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
      render: (_, record: Course) => (
        <Space size="middle">
          <Button
            type="text"
            onClick={() => handleUpdateStatus(CourseStatusEnum.APPROVE, record)}
          >
            Approve
          </Button>
          <Button
            className="text-red-600"
            type="text"
            onClick={() => handleShowReason(record)}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const handleShowReason = (record: Course) => {
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
    message.success("Status updated successfully");
    setReasonVisible(false);
  };

  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">Approve Courses</h3>
        <div>
          <Input
            placeholder="Search By Course Name"
            prefix={<SearchOutlined />}
            style={{ marginBottom: "20px", borderRadius: "4px" }}
            className="w-full md:w-1/4"
            onChange={handleSearchChange}
          />
          <Select
            onChange={handleCategoryChange}
            placeholder="Select a category"
            className="w-full md:w-1/4 ml-0 md:ml-3 mb-2 md:mb-0"
            options={categoryFilter.map((item: Category) => ({
              label: item.name,
              value: item._id,  
            }))}
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
