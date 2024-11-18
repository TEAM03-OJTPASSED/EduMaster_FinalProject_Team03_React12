import React, { useEffect, useState } from "react";
import { Table, Card, Tag, Button, Modal, Tooltip } from "antd";
import { Course, GetCourses, CourseStatusEnum } from "../../../../models/Course.model";
import CourseService from "../../../../services/course.service";

import dayjs from "dayjs";
import GlobalSearchUnit from "../../../../components/GlobalSearchUnit";
import { statusFormatter } from "../../../../utils/statusFormatter";
import CategoryService from "../../../../services/category.service";
import { Category, GetCategories } from "../../../../models/Category.model";
import { capitalizeFirstLetter } from "../../../../utils/capitalize";
import { EyeFilled } from "@ant-design/icons";

const CourseLogModal = React.lazy(() => import("../../../../components/CourseLogModal"));

const initialCoursesParams: GetCourses = {
  pageInfo: { pageNum: 1, pageSize: 10 },
  searchCondition: { keyword: "", is_deleted: false, category_id: "", status: "" },
};

const initialCategoriesParams: GetCategories = {
  pageInfo: { pageNum: 1, pageSize: 100 },
  searchCondition: { keyword: "", is_deleted: false },
};




const CourseLists: React.FC = () => {

  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenLog, setIsOpenLog] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course>({} as Course);
  const [searchParams, setSearchParams] = useState<GetCourses>(initialCoursesParams);


  
  const statuses = Object.values(CourseStatusEnum);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await CourseService.getCourses(searchParams);
      const responseData = response.data?.pageData || [];
      setCourses(responseData);
      setTotal(response.data?.pageInfo?.totalItems ?? 0);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await CategoryService.getCategories(initialCategoriesParams);
      setListCategories(response?.data?.pageData ?? []);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleViewLog = (item: Course) => {
    setIsOpenLog(true);
    setCurrentCourse(item);
  };

  const handleSearch = (values: Record<string, any>) => {
    setSearchParams((prev) => ({
      ...prev,
      searchCondition: {
        ...prev.searchCondition,
        category_id: values.category_id,
        keyword: values.keyword,
        status: values.status,
      },
    }));
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, [pageNum, pageSize, searchParams]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: CourseStatusEnum) => {
        const statusColors = {
          [CourseStatusEnum.NEW]: "green",
          [CourseStatusEnum.WAITING_APPROVE]: "red",
          [CourseStatusEnum.APPROVE]: "yellow",
          [CourseStatusEnum.REJECT]: "yellow",
          [CourseStatusEnum.ACTIVE]: "yellow",
          [CourseStatusEnum.INACTIVE]: "yellow",
        };
        return (
          <Tag color={statusColors[status] || "gray"}>
            {capitalizeFirstLetter(status)}
          </Tag>
        );
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
      render: (discount: number) => <span className="text-red-500">{discount}%</span>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt: string) => dayjs(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Course Log",
      key: "course_log",
      render: (record: Course) => (
        <Tooltip title="View Detail">
        <Button 
        className="text-red-600"
        icon={<EyeFilled />}
        type="text" 
        onClick={() => handleViewLog(record)}>
        </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">Course Management</h3>
        <GlobalSearchUnit 
          placeholder="Search By Course Name"
          selectFields={[
            {
              name: "status",
              options: statuses.map((status) => ({ label: statusFormatter(status), value: status })),
              placeholder: "Filter by Status",
            },
            {
              name: "category_id",
              options: listCategories.map((category) => ({ label: category.name, value: category._id })),
              placeholder: "Filter by Category",
            },
          ]}
          onSubmit={handleSearch}
        />
        
        <Table
          dataSource={courses}
          columns={columns}
          pagination={{ current: pageNum, pageSize, total, showSizeChanger: true }}
          onChange={handleTableChange}
          rowKey="_id"
          bordered
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal
        open={isOpenLog}
        width={1000}
        closable
        onCancel={() => setIsOpenLog(false)}
        footer={null}
      >
        <CourseLogModal course_id={currentCourse._id} />
      </Modal>
    </div>
  );
};

export default CourseLists;
