import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Card,
  Tag,
  Button,
  Modal,
  TableProps,
  Select,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import CourseOption from "./create-courses/CourseOption";
import StatusFilter from "../../../components/StatusFilter";
import CourseService from "../../../services/course.service";
import { Course, CourseRequest, GetCourses } from "../../../models/Course.model";
import { CourseStatusEnum } from "../../AdminDashboard/monitors/course/courseList";
import { Category, GetCategories } from "../../../models/Category.model";
import CategoryService from "../../../services/category.service";
import { SearchCondition } from "../../../models/SearchInfo.model";
import { handleNotify } from "../../../utils/handleNotify";

const InstructorCourseList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>();
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);

  // select course to send to admin
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);


  const showModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const showModalCreate = () => {
    setIsModalCreateVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
  };

  const initialCoursesParams: GetCourses = {
    pageInfo: {
      pageNum: 1,
      pageSize: 6,
    },
    searchCondition: {
      keyword: "",
      is_deleted: false,
      category_id: "",
    }
  }

  const initialCategoriesParams: GetCategories = {
    pageInfo: {
      pageNum: 1,
      pageSize: 100,
    },
    searchCondition: {
      keyword: "",
      is_deleted: false,
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

  const fetchCategories = async () => {
    setLoading(true); 
    try {
      const response = await CategoryService.getCategories(initialCategoriesParams);
      setListCategories(response?.data?.pageData ?? []);
    } finally {
      setLoading(false); 
    }
  };

  const handleCreateCourse = async (values: CourseRequest) => {
    const { price, discount, video_url, ...otherValues } = values;
    const numericValues = {
      ...otherValues,
      price: price ? Number(price) : 0,
      discount: discount ? Number(discount) : 0,
      video_url: video_url || "",
    };
  
    setLoading(true);
    try {
      const response = await CourseService.createCourse(numericValues);
      if (response.success) {
        handleCancel(); // Close modal if successful
        handleNotify("Course Created Successfully", "The course has been created successfully.");
        await fetchCourses(); // Refresh the course list
      }
    } finally {
      setLoading(false); // Ensures loading is set to false regardless of success/failure
    }
  };

  const rowSelection: TableProps<Course>["rowSelection"] = {
    onChange: (_selectedRowKeys: React.Key[], selectedRows: Course[]) => {
      setSelectedCourses(selectedRows);
    },
  };

  useEffect(() => {
        fetchCourses(); // Call the async function
        fetchCategories(); // Call the async function
  },[]);


  // send course request to Admin
  const handleSendToAdmin = () => {
    // kiem tra xem nhung items da seleted coi co phai status la new/reject hay khong
    // check xem lesson va session cua cua course do co ton tai hay chua
    // api send list courses to admin, dung message de gui
    console.log(selectedCourses);
  };

  const handleSwitchChange = (id: string, value: CourseStatusEnum) => {
    console.log("Selected ID:", id);
    console.log("Selected Value:", value);
    // Call the API to update the course status
  };
  const columns = [
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
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "New", value: CourseStatusEnum.NEW },
        { text: "Waiting Approve", value: CourseStatusEnum.WAITING_APPROVE },
        { text: "Approved", value: CourseStatusEnum.APPROVED },
        { text: "Rejected", value: CourseStatusEnum.REJECTED },
        { text: "Active", value: CourseStatusEnum.ACTIVE },
        { text: "Inactive", value: CourseStatusEnum.INACTIVE },
      ],
      onFilter: (value: any, record: any) =>
        record.status.trim() === value.trim(),
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
      render: (discount: number) => (
        <div>
          <span className="text-red-500">{discount}%</span>
        </div>
      ),
    },
    {
      title: "Change Status",
      key: "change status",
      render: (record: Course) => (
        <div className="flex">
          <Select
            disabled={
              record.status === CourseStatusEnum.NEW ||
              record.status === CourseStatusEnum.WAITING_APPROVE ||
              record.status === CourseStatusEnum.REJECTED
            }
            style={{ width: 100 }}
            onChange={(value) => handleSwitchChange(record._id, value)}
            options={[
              {
                label: CourseStatusEnum.ACTIVE,
                value: CourseStatusEnum.ACTIVE,
              },
              {
                label: CourseStatusEnum.INACTIVE,
                value: CourseStatusEnum.INACTIVE,
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: Course) => (
        <div className="flex">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDelete(record.name)}
          />
        </div>
      ),
    },
  ];

  const handleDelete = (name: string) => {
    console.log(name);
  };

  const statuses = [CourseStatusEnum.ACTIVE, CourseStatusEnum.APPROVED, CourseStatusEnum.INACTIVE, CourseStatusEnum.NEW, CourseStatusEnum.REJECTED, CourseStatusEnum.WAITING_APPROVE];
  const handleStatusChange = (value: string | undefined) => {
    setStatusFilter(value);
  };


  return (
    <Card>
      <h3 className="text-2xl my-5">Course Management</h3>
      <div className="flex justify-between">
        <div className="flex gap-4 mb-5">
            <Input
              placeholder="Search By Course Name"
              prefix={<SearchOutlined />}
              style={{ width: "80%", borderRadius: "4px" }}
              
            />
            <StatusFilter
              statuses={statuses}
              selectedStatus={statusFilter}
              onStatusChange={handleStatusChange}
            />
          </div>
        <div className="flex gap-x-3">
          <Button
            onClick={showModalCreate}
            icon={<PlusCircleOutlined />}
            shape="round"
            variant="solid"
            color="primary"
            className="items-center"
          >
            Create Course
          </Button>
          <Button
            onClick={handleSendToAdmin}
            disabled={selectedCourses.length < 1}
            shape="round"
            variant="solid"
          >
            Send request
          </Button>
        </div>
      </div>
      <Table
        dataSource={listCourses}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="name"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
        loading={loading}
        
      />

      {/* update */}
      <Modal
        title="Change Course"
        onCancel={handleCancel}
        open={isModalVisible}
        footer={null}
        width={1000}
        forceRender
      >
        {selectedCourse && (
          <CourseOption
            categories={listCategories}
            initializeValue={selectedCourse}
            mode="update"
            isLoading={loading}
            onFinished={(values) => {
              console.log("submitted course update", {
                ...values,
                created_at: new Date(),
              });
            }}
          />
        )}
      </Modal>

      {/* Create */}
      <Modal
        title="Create Course"
        onCancel={handleCancel}
        open={isModalCreateVisible}
        footer={null}
        width={1000}
        forceRender
      >
        <CourseOption
          mode="create"
          onFinished={handleCreateCourse}
          isLoading={loading}
          categories = {listCategories}
        />
      </Modal>
    </Card>
  );
};

export default InstructorCourseList;
