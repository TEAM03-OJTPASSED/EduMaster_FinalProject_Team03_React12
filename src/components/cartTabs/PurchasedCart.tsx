import { List, Button, Empty, Space, Typography } from "antd";
import {
  ShoppingCartOutlined,

  CheckCircleOutlined,
  ArrowRightOutlined,

} from "@ant-design/icons";
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
  isLoading = false

}) => {
  return (
    <>
      <h1 className="mb-2 pt-4 text-4xl font-semibold">Purchased Courses</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          {carts.length > 0 && (
            <List
              itemLayout="horizontal"
              dataSource={carts}
              renderItem={(cart) => (
                <List.Item
                  key={cart._id}
                  actions={[
                    <div key={cart._id}>
                      <Text className={`font-jost px-8 text-base`}>
                        <span className={`${cart.discount ? "line-through text-gray-400 text-sm pr-2" : "text-black text-right"}`}>{moneyFormatter(cart.price)} </span>
                        {cart.discount > 0 &&  `${moneyFormatter(cart.price_paid)}`
                        }
                      </Text>
                      <Text type="success">
                          <CheckCircleOutlined /> Purchase Complete
                      </Text>
                    </div>,
                    <Button
                      key={cart._id}
                      type="primary"
                      size="large"
                      className="w-full mt-4 view-button ant-btn-variant-solid font-jost"
                      onClick={() => navigate(`/course/${cart.course_id}`)}
                    >
                      Learn <ArrowRightOutlined />
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        src={cart.course_image}
                        alt={cart.course_name}
                        className="w-24 h-16 object-cover rounded"
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
                    onClick={() => navigate("/cart")}
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