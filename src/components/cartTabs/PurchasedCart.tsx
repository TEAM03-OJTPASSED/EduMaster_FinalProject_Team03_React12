import { List, Button, Empty, Space, Typography } from "antd";
import { ArrowRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Cart } from "../../models/Cart.model";
import { moneyFormatter } from "../../utils/moneyFormatter";

const { Text } = Typography;

interface OrderProps {
  carts: Cart[];
  total: number;
  navigate: (path: string) => void;
  orderDate?: string;
  orderNumber?: string;
  paymentStatus?: string;
  isLoading?: boolean;
}

// Purchased Orders Component
const PurchasedOrders: React.FC<OrderProps> = ({
  carts,
  navigate,
  isLoading = false,
}) => {
  return (
    <>
      <h1 className="mb-2 pt-4 text-4xl font-semibold">Purchased Courses</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          {carts.length > 0 && (
            <List
              itemLayout="horizontal" // Change layout for more vertical space
              dataSource={carts}
              renderItem={(cart) => (
                <List.Item key={cart._id} className="relative">
                  <List.Item.Meta
                    avatar={
                      <img
                        src={cart.course_image}
                        alt={cart.course_name}
                        className="w-36 h-28 object-cover rounded"
                      />
                    }
                    title={
                      <Text strong className="font-jost">
                        {cart.course_name}
                      </Text>
                    }
                    description={
                      <Space className="flex flex-col items-start">
                        <Text>By {cart.instructor_name}</Text>
                      </Space>
                    }
                  />
                  {/* Responsive price and button */}
                  <div className="flex flex-row absolute items-center mb-4 justify-between  bottom-0 w-full mt-4">
                    <Text className={`font-jost text-base ml-40`}>
                      <span
                        className={`${
                          cart.discount
                            ? "line-through text-gray-400 text-sm pr-2"
                            : "text-black text-right"
                        }`}
                      >
                        {moneyFormatter(cart.price)}
                      </span>
                      {cart.discount > 0 && `${moneyFormatter(cart.price_paid)}`}
                    </Text>
                    <Button
                      type="primary"
                      size="large"
                      className="  lg:mt-0 p-2 view-button text-base ant-btn-variant-solid rounded-full font-jost"
                      onClick={() => navigate(`/course/${cart.course_id}`)}
                    >
                      Learn <ArrowRightOutlined/>
                    </Button>
                  </div>
                  
                </List.Item>
              )}
            />
          )}
          {carts.length === 0 && isLoading === false && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical" align="center">
                  <Text>You haven't purchased any carts yet</Text>
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

export default PurchasedOrders;
