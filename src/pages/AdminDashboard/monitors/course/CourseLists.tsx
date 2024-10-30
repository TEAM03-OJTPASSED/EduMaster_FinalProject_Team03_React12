import React, { ChangeEvent, useEffect, useState } from "react";
import { Table, Input, Card, Tag, TableProps } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import useDebounce from "../../../../hooks/useDebounce";
import StatusFilter from "../../../../components/StatusFilter";
import { Course, GetCourses } from "../../../../models/Course.model";
import CourseService from "../../../../services/course.service";
import { CourseStatusEnum } from "./courseList";

// utils function to filter courses by status
const getStatusFilterText = (status: CourseStatusEnum) => {
  switch (status) {
    case CourseStatusEnum.NEW:
      return "New";
    case CourseStatusEnum.WAITING_APPROVE:
      return "Waiting Approve";
    case CourseStatusEnum.APPROVED:
      return "Approved";
    case CourseStatusEnum.REJECTED:
      return "Rejected";
    case CourseStatusEnum.ACTIVE:
      return "Active";
    case CourseStatusEnum.INACTIVE:
      return "Inactive";
    default:
      return "Unknown";
  }
};

const CourseLists: React.FC = () => {
  const [inputSearch, setInputSearch] = useState("");
  const inputSearchDebouce = useDebounce(inputSearch, 500);
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>();

  const initialCoursesParams: GetCourses = {
    pageInfo: {
      pageNum: 1,
      pageSize: 6,
    },
    searchCondition: {
      keyword: "",
      is_deleted: false,
      category_id: "",
    },
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
  useEffect(() => {
    fetchCourses(); // Fetch courses on component mount
  }, []);
  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    console.log(inputSearchDebouce);
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
      key: "category_id",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: Object.values(CourseStatusEnum).map((status) => ({
        text: getStatusFilterText(status),
        value: status,
      })),
      onFilter: (value, record) => record.status === value,
      filterIcon: (filtered) => (
        <FilterOutlined
          style={{ fontSize: "18px", color: filtered ? "#1890ff" : undefined }}
        />
      ), // Tăng kích thước và thay đổi màu của biểu tượng filter
      render: (status: CourseStatusEnum) => {
        const statusColors = {
          [CourseStatusEnum.NEW]: "green",
          [CourseStatusEnum.WAITING_APPROVE]: "red",
          [CourseStatusEnum.APPROVED]: "yellow",
          [CourseStatusEnum.REJECTED]: "yellow",
          [CourseStatusEnum.ACTIVE]: "yellow",
          [CourseStatusEnum.INACTIVE]: "yellow",
        };
        return <Tag color={statusColors[status] || "gray"}>{status}</Tag>;
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
      render: (discount: number) => {
        return (
          <div>
            <span className="text-red-500"> {discount}%</span>
          </div>
        );
      },
    },
  ];

  const statuses = [
    CourseStatusEnum.ACTIVE,
    CourseStatusEnum.APPROVED,
    CourseStatusEnum.INACTIVE,
    CourseStatusEnum.NEW,
    CourseStatusEnum.REJECTED,
    CourseStatusEnum.WAITING_APPROVE,
  ];
  const handleStatusChange = (value: string | undefined) => {
    setStatusFilter(value);
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Course Management</h3>

      <div className="flex gap-4 mb-5">
        <Input
          placeholder="Search By Course Name"
          prefix={<SearchOutlined />}
          style={{ width: "80%", borderRadius: "4px" }}
          onChange={(e) => handleInputSearch(e)}
        />
        <StatusFilter
          statuses={statuses}
          selectedStatus={statusFilter}
          onStatusChange={handleStatusChange}
        />
      </div>
      <Table
        dataSource={listCourses}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        bordered
        loading={loading}
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default CourseLists;
