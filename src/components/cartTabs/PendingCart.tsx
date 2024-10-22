import { List, Button, Empty, Space, Typography, Checkbox } from "antd";
import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useCallback } from "react";

const { Text } = Typography;

interface Course {
  id: number;
  name: string;
  price: number;
  image: string;
  author: string;
  discount: number;

}

interface OrderProps {
  courses: Course[];
  total: number;
  navigate: (path: string) => void;
  orderDate?: string;
  orderNumber?: string;
  paymentStatus?: string;
  selectedCourses: number[];
  toggleSelectCourse: (courseId: number) => void;
}

// Unpaid Orders Component
const UnpaidOrders: React.FC<OrderProps> = ({
  courses,
  selectedCourses,
  navigate,
  toggleSelectCourse,
}) => {
  const handleToggleSelect = useCallback(
    (courseId: number) => {
      toggleSelectCourse(courseId);
    },
    [toggleSelectCourse]
  );
  return (
    <>
      <h1 className="mb-2 pt-4 text-4xl font-semibold">Unpaid Orders</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          {courses.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={courses}
              renderItem={(course) => (
                <List.Item
                  key={course.id}
                  actions={[
                    <div key={course.id}>
                      <Text className={`font-jost px-8 text-base`}>
                        <span className={`${course.discount ? "line-through text-gray-400 text-sm pr-2" : "text-black text-right"}`}>đ{course.price.toFixed(0)} </span>
                        {course.discount > 0 &&  `đ${course.price * (100 - course.discount)/100}`
                        }
                      </Text>
                      <Text type="warning">
                        <ClockCircleOutlined /> Awaiting Payment
                      </Text>
                    </div>,
                    <Button
                      key={course.id}
                      type="primary"
                      size="large"
                      className="w-full mt-4 view-button ant-btn-variant-solid font-jost"
                      onClick={() => navigate("/cart/checkout")}
                      disabled={selectedCourses.length === 0}
                    >
                      Pay Now <ArrowRightOutlined />
                    </Button>,
                  ]}
                  onClick={() => handleToggleSelect(course.id)}
                  className="cursor-pointer"
                >
                  <Checkbox
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => handleToggleSelect(course.id)}
                    className="mr-4 custom-checkbox"
                  />
                  <List.Item.Meta
                    avatar={
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-24 h-16 object-cover rounded"
                      />
                    }
                    title={
                      <Text strong className="font-jost">
                        {course.name}
                      </Text>
                    }
                    description={
                      <Space className="flex flex-col items-start">
                        <Text>By {course.author}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No unpaid orders"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UnpaidOrders;
