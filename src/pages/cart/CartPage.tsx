import React, { useState } from 'react';
import { Button, Card, List, Typography, Space, Empty } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useCustomNavigate } from '../../hooks/customNavigate';

const { Text } = Typography;

interface Course {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const navigate = useCustomNavigate();
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Advanced Web Development", price: 2400000, image: "https://picsum.photos/400", quantity: 1 },
    { id: 2, name: "Data Science Fundamentals", price: 2400000, image: "https://picsum.photos/400", quantity: 1 },
    { id: 3, name: "Digital Marketing Mastery", price: 2400000, image: "https://picsum.photos/400", quantity: 1 },
  ]);

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  // const updateQuantity = (id: number, quantity: number) => {
  //   setCourses(courses.map(course => 
  //     course.id === id ? { ...course, quantity: quantity } : course
  //   ));
  // };

  const total = courses.reduce((sum, course) => sum + course.price * course.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 font-jost">
      <h1 className="mb-8 text-4xl font-semibold">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          {courses.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={courses}
              renderItem={(course) => (
                <List.Item
                  key={course.id}
                  actions={[<>
                    <Text type="secondary" className='font-jost px-8'>đ{course.price.toFixed(0)}</Text>
                    <Button 
                      type="text" 
                      icon={<DeleteOutlined />} 
                      onClick={() => removeCourse(course.id)}
                      aria-label={`Remove ${course.name} from cart`}
                    />
                  </>]}
                >
                  <List.Item.Meta
                    avatar={<img src={course.image} alt={course.name} className="w-24 h-16 object-cover rounded" />}
                    title={<Text strong className=' font-jost'>{course.name}</Text>}
                    description={
                      <Space className='flex flex-col items-start pt-0 mt-0 justify-end space-y-0'>
                        <Text>By Author Name</Text>
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
                    className="bg-orange-500 font-jost p-8 py-5 hover:bg-orange-600 view-button ant-btn-variant-solid "
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
                <Text>${total.toFixed(0)}</Text>
              </div>
              <div className="flex justify-between items-center">
                <Text strong>Total</Text>
                <Text strong className='text-4xl font-jost '>đ {total.toFixed(0)}</Text>
              </div>
              <Button 
                type="primary" 
                size="large" 
                className="w-full mt-4 view-button ant-btn-variant-solid font-jost"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout <ArrowRightOutlined />
              </Button>
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;