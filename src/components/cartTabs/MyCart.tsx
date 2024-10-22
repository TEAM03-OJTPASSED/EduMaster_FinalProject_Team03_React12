import { List, Checkbox, Button, Empty, Card, Space, Typography } from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
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

interface MyCartProps {
  courses: Course[];
  selectedCourses: number[];
  toggleSelectCourse: (courseId: number) => void;
  removeCourse: (courseId: number) => void;
  total: number;
  navigate: (path: string) => void;
}

const MyCart: React.FC<MyCartProps> = ({
  courses,
  selectedCourses,
  toggleSelectCourse,
  removeCourse,
  total,
  navigate,
}) => {
  const handleToggleSelect = useCallback(
    (courseId: number) => {
      toggleSelectCourse(courseId);
    },
    [toggleSelectCourse]
  );

  const handleRemoveCourse = useCallback(
    (courseId: number) => {
      removeCourse(courseId);
    },
    [removeCourse]
  );

  return (
    <>
      <h1 className="mb-2 pt-4 text-4xl font-semibold">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          {courses.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={courses}
              renderItem={(course) => (
                <List.Item
                  key={course.id}
                  actions={[
                    <>
                      <Text className={`font-jost px-8 text-base`}>
                        <span className={`${course.discount ? "line-through text-gray-400 text-sm pr-2" : "text-black text-right"}`}>đ{course.price.toFixed(0)} </span>
                        {course.discount > 0 &&  `đ${course.price * (100 - course.discount)/100}`
                        }
                      </Text>
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveCourse(course.id)}
                        aria-label={`Remove ${course.name} from cart`}
                      />
                    </>,
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
                      <Space className="flex flex-col items-start pt-0 mt-0 justify-end space-y-0">
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
              description={
                <Space direction="vertical" align="center">
                  <Text>Your cart is empty</Text>
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => navigate("/course")}
                    className="bg-orange-500 font-jost p-8 py-5 hover:bg-orange-600 view-button ant-btn-variant-solid"
                  >
                    Browse Courses
                  </Button>
                </Space>
              }
            />
          )}
        </div>
        <div className="w-full md:w-1/3">
          <Card title="Order Summary" className="sticky top-4">
            <Space direction="vertical" className="w-full">
              <div className="flex justify-between">
                <Text>Subtotal</Text>
                <Text>đ {total.toFixed(0)}</Text>
              </div>
              <div className="flex justify-between items-center">
                <Text strong>Total</Text>
                <Text strong className="text-4xl font-jost">
                  đ {total.toFixed(0)}
                </Text>
              </div>
              <Button
                type="primary"
                size="large"
                className="w-full mt-4 view-button ant-btn-variant-solid font-jost"
                onClick={() => navigate("/cart/checkout")}
                disabled={selectedCourses.length === 0}
              >
                Proceed to Checkout <ArrowRightOutlined />
              </Button>
            </Space>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MyCart;
