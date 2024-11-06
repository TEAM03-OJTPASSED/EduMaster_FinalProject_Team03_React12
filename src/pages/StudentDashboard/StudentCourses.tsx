import React, { useEffect, useState } from "react";
import { Table, Input, Card, Button, Tabs } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useCustomNavigate } from "../../hooks/customNavigate";
import {
  Cart,
  CartStatusEnum,
  SearchCartByStatus,
} from "../../models/Cart.model";
import CartService from "../../services/cart.service";
import GlobalSearchUnit from "../../components/GlobalSearchUnit";

const InstructorCourseList: React.FC = () => {
  const navigate = useCustomNavigate();
  const [carts, setCarts] = useState<Cart[]>([]);
  // const [cartStatus, setCartStatus] = useState<string>(CartStatusEnum.NEW);

  const initialCartSearchParams: SearchCartByStatus = {
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    searchCondition: {
      status: CartStatusEnum.COMPLETED,
      is_deleted: false,
    },
  };

  useEffect(() => {
    fetchCart();
  }, []);
  const fetchCart = async () => {
    const response = await CartService.getCartsByStatus(
      initialCartSearchParams
    );
    setCarts(response?.data?.pageData as Cart[]);
  };

  // Navigate to course details page
  const handleViewCourse = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  // Table columns with fixed width
  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      width: 200,
      render: (name: string, course: Cart) => (
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
      title: "Actions",
      key: "action",
      width: 150,
      render: (course: Cart) => (
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

      <div>
        <GlobalSearchUnit placeholder="Search by Course Name"/>

      </div>

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
