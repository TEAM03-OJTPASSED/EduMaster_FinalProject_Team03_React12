import React, { useEffect, useState } from "react";
import { Table, Input, Card, Button, Tabs } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Course } from "../../components/UserAuthTest";
import { useCustomNavigate } from "../../hooks/customNavigate";
import { CartStatusEnum, SearchCartByStatus } from "../../models/Cart.model";
import CartService from "../../services/cart.service";

const InstructorCourseList: React.FC = () => {
  const navigate = useCustomNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [cartStatus, setCartStatus] = useState<string>(CartStatusEnum.NEW);

  const initialCartSearchParams = (
    cartStatus: CartStatusEnum
  ): SearchCartByStatus => ({
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    searchCondition: {
      status: "completed",
      is_deleted: false,
    },
  });

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const status = cartStatus as CartStatusEnum;
      const response = await CartService.getCartsByStatus(
        initialCartSearchParams(status)
      );
      setCarts(response.data?.pageData || []);
    } finally {
      // Handle error
      setIsLoading(false);
    }
  };

  // Navigate to course details page
  const handleViewCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  useEffect(() => {
    fetchCart();
  }, [cartStatus]);

  // Table columns with fixed width
  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      width: 200,
      render: (name: string, course: Course) => (
        <Button type="link" onClick={() => handleViewCourse(course.course_id)}>
          {name}
        </Button>
      ),
    },
    {
      title: "Author",
      dataIndex: "instructor_name",
      key: "instructor_name",
    },

    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Image",
      dataIndex: "course_image",
      key: "course_image",
      render: (imageUrl: string) => (
        <img
          src={imageUrl}
          alt="Course"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Video",
      dataIndex: "course_video",
      key: "course_video",
      render: (imageUrl: string) => (
        <img
          src={imageUrl}
          alt="Course"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "action",
      width: 150,
      render: (course: Course) => (
        <div>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewCourse(course.course_id)}
            style={{ marginRight: 8 }}
          >
            View
          </Button>
          <Button type="link" icon={<DeleteOutlined />} danger>
            Unenroll
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">My Learning</h3>

      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />

      <Tabs>
        <Tabs.TabPane>
          <Table
            dataSource={carts}
            columns={columns}
            pagination={{ pageSize: 5 }}
            rowKey="id"
            bordered
            scroll={{ x: true }} // Enables horizontal scrolling if columns overflow
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default InstructorCourseList;
