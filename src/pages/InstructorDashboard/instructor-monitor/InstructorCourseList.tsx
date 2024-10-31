import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Card,
  Tag,
  Button,
  Modal,
  Select,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";

import CourseOption from "./create-courses/CourseOption";
import StatusFilter from "../../../components/StatusFilter";
import CourseService from "../../../services/course.service";
import { Course, CourseRequest, CourseStatusEnum, GetCourses } from "../../../models/Course.model";
import { Category, GetCategories } from "../../../models/Category.model";
import CategoryService from "../../../services/category.service";
import { handleNotify } from "../../../utils/handleNotify";
import { capitalizeFirstLetter } from "../../../utils/capitalize";

const InstructorCourseList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>();
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const showModal = async (course: Course) => {
    const response = await CourseService.getCourse(course._id);
    if (response.data != undefined ) setSelectedCourse(response.data);
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
    const { price, discount, video_url, image_url, ...otherValues } = values;
    const numericValues = {
      ...otherValues,
      price: price ? Number(price) : 0,
      discount: discount ? Number(discount) : 0,
      video_url: video_url || "",
      image_url: image_url || "",
    };
  
    setLoading(true);
    try {
      const response = await CourseService.createCourse(numericValues);
      if (response.success) {
        handleCancel();
        handleNotify("Course Created Successfully", "The course has been created successfully.");
        await fetchCourses();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    setLoading(true);
    try {
      const response = await CourseService.deleteCourse(courseId);
      if (response.success) {
        handleNotify("Course Deleted Successfully", "The course has been deleted successfully.");
        await fetchCourses();
      }
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateCourse = async (updatedCourse: CourseRequest) => {
    setLoading(true);
    try {
      if (selectedCourse) {
        const response = await CourseService.updateCourse(selectedCourse._id, updatedCourse);
        if (response.success) {
          handleNotify("Course Updated Successfully", "The course has been updated successfully.");
          await fetchCourses();
        }
      }
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  },[]);

  const handleSendToAdmin = async (course: Course) => {   
    console.log("Sending course to admin:", course);
    
      const response = await CourseService.updateCourseStatus({course_id: course._id,
        new_status: CourseStatusEnum.WAITING_APPROVE,
        comment: "Please approve my course"});
      if (response.success) {
        handleNotify("Request sent to admin", "The course will be awaiting approval. Please be alert in the next few days.");
        await fetchCourses();
      } 
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
      dataIndex: "category_name",
      key: "category_name",
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
        { text: "Approved", value: CourseStatusEnum.APPROVE },
        { text: "Rejected", value: CourseStatusEnum.REJECT },
        { text: "Active", value: CourseStatusEnum.ACTIVE },
        { text: "Inactive", value: CourseStatusEnum.INACTIVE },
      ],
      onFilter: (value: any, record: Course) =>
        record.status.trim() === value.trim(),
      render: (status: CourseStatusEnum) => {
        const statusColors = {
          [CourseStatusEnum.NEW]: "green",
          [CourseStatusEnum.WAITING_APPROVE]: "red",
          [CourseStatusEnum.APPROVE]: "yellow",
          [CourseStatusEnum.REJECT]: "yellow",
          [CourseStatusEnum.ACTIVE]: "yellow",
          [CourseStatusEnum.INACTIVE]: "yellow",
        };
        return <Tag color={statusColors[status] || "gray"}>{capitalizeFirstLetter(status)}</Tag>;
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
              record.status === CourseStatusEnum.REJECT
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
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDeleteCourse(record._id)}
          />
          <Button
            type="text"
            icon={<SendOutlined style={{ color: "blue" }} />}
            onClick={() => handleSendToAdmin(record)}
            disabled={
              record.status !== CourseStatusEnum.NEW &&
              record.status !== CourseStatusEnum.REJECT
            }
            title={
              record.status !== CourseStatusEnum.NEW &&
              record.status !== CourseStatusEnum.REJECT
                ? "Can only send NEW or REJECT courses"
                : "Send to admin for approval"
            }
          />
        </div>
      ),
    },
  ];

  const statuses = [CourseStatusEnum.ACTIVE, CourseStatusEnum.APPROVE, CourseStatusEnum.INACTIVE, CourseStatusEnum.NEW, CourseStatusEnum.REJECT, CourseStatusEnum.WAITING_APPROVE];
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
        <div>
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
        </div>
      </div>
      <Table
        dataSource={listCourses}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="name"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
        loading={loading}
      />

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
            onFinished={handleUpdateCourse}
          />
        )}
      </Modal>

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
          categories={listCategories}
        />
      </Modal>
    </Card>
  );
};

export default InstructorCourseList;