import { List, Button, Empty, Space, Typography } from "antd";
import {
  ShoppingCartOutlined,

  CheckCircleOutlined,
  ArrowRightOutlined,

} from "@ant-design/icons";

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
}


// Purchased Orders Component
const PurchasedOrders: React.FC<OrderProps> = ({
  courses,
  navigate,

}) => {
  return (
    <>
      <h1 className="mb-2 pt-4 text-4xl font-semibold">Purchased Courses</h1>
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
                      <Text type="success">
                          <CheckCircleOutlined /> Purchase Complete
                      </Text>
                    </div>,
                    <Button
                      key={course.id}
                      type="primary"
                      size="large"
                      className="w-full mt-4 view-button ant-btn-variant-solid font-jost"
                      onClick={() => navigate(`/course-detail/${course.id}`)}
                    >
                      Learn <ArrowRightOutlined />
                    </Button>,
                  ]}
                >
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
              description={
                <Space direction="vertical" align="center">
                  <Text>You haven't purchased any courses yet</Text>
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
        
      </div>
    </>
  );
};


export default PurchasedOrders