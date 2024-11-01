import React, { useEffect, useState } from "react";
import { Table, Input, Card, Tag, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import StatusFilter from "../../../../components/StatusFilter";
import { Course, GetCourses, CourseStatusEnum } from "../../../../models/Course.model";
import CourseService from "../../../../services/course.service";
import { useDebouncedSearch } from "../../../../hooks/useSearch";
import dayjs from "dayjs";

// utils function to filter courses by status
const getStatusFilterText = (status: CourseStatusEnum) => {
  switch (status) {
    case CourseStatusEnum.NEW:
      return "New";
    case CourseStatusEnum.WAITING_APPROVE:
      return "Waiting Approve";
    case CourseStatusEnum.APPROVE:
      return "Approved";
    case CourseStatusEnum.REJECT:
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
  // const [statusFilter, setStatusFilter] = useState<string>();
  const [searchText, setSearchText] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const filteredData = useDebouncedSearch(courses, searchText, 300, ["name", "category_id"]);

  const fetchCourses = async () => {
    const searchParams: GetCourses = {
      searchCondition: {
        keyword: searchText,
        is_deleted: false,
      },
      pageInfo: { pageNum, pageSize },
    };

    try {
      const response = await CourseService.getCourses(searchParams);
      const responseData = response.data?.pageData;
      const flattenedUsers: Course[] = Array.isArray(responseData)
        ? responseData.flat() // Dùng flat() để chuyển thành User[]
        : [];
      setCourses(flattenedUsers);
      setTotal(response.data?.pageInfo?.totalItems ?? 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  useEffect(() => {
    fetchCourses();
  }, [pageNum, pageSize]);


  const columns: TableProps<Course>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category Name",
      dataIndex: "category_id",
      key: "category_id",
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
      render: (status: CourseStatusEnum) => {
        switch (status) {
          case CourseStatusEnum.NEW:
            return <Tag color="green">New</Tag>;
          case CourseStatusEnum.WAITING_APPROVE:
            return <Tag color="red">Waiting Approve</Tag>;
          case CourseStatusEnum.APPROVE:
            return <Tag color="yellow">Approved</Tag>;
          case CourseStatusEnum.REJECT:
            return <Tag color="orange">Rejected</Tag>;
          case CourseStatusEnum.ACTIVE:
            return <Tag color="blue">Active</Tag>;
          case CourseStatusEnum.INACTIVE:
            return <Tag color="gray">Inactive</Tag>;
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
      render: (discount: number) => {
        return (
          <div>
            <span className="text-red-500"> {discount}%</span>
          </div>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt: string) => {
        return dayjs(createdAt).format("DD-MM-YYYY");
      },
    },
  ];

  // const statuses = [
  //   CourseStatusEnum.ACTIVE,
  //   CourseStatusEnum.APPROVE,
  //   CourseStatusEnum.INACTIVE,
  //   CourseStatusEnum.NEW,
  //   CourseStatusEnum.REJECT,
  //   CourseStatusEnum.WAITING_APPROVE,
  // ];


  // const handleStatusChange = (value: string | undefined) => {
  //   setStatusFilter(value);
  // };

  return (
    <Card>
      <h3 className="text-2xl my-5">Course Management</h3>
      <div className="flex flex-wrap items-center mb-4">
        <Input
          placeholder="Search By Course Name"
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3 mb-2 md:mb-0"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        {/* <StatusFilter
          statuses={statuses}
          selectedStatus={statusFilter}
          onStatusChange={handleStatusChange}
        /> */}
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        rowKey="_id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: "max-content" }}
      />
    </Card>
  );
};

export default CourseLists;
