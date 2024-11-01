import { useEffect, useState } from "react";
import { Card, Input, Table, Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CartService from "../../services/cart.service";
import {
  Cart,
  CartStatusEnum,
  SearchCartByStatus,
} from "../../models/Cart.model";

// Define columns for the Purchase Log table
const StudentOrderHistory = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [cartStatus, setCartStatus] = useState<string>(CartStatusEnum.NEW);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);

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

  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  const showDetails = (cart: Cart) => {
    setSelectedCart(cart);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCart(null);
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Cart No",
      dataIndex: "cart_no",
      key: "cart_no",
    },
    {
      title: "Price Paid",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
    },
    {
      title: "Instructor Name",
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
      title: "View Details",
      key: "action",
      render: (_: any, record: Cart) => (
        <Button type="primary" onClick={() => showDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];
  useEffect(() => {
    fetchCart();
  }, [cartStatus]);

  return (
    <Card>
      <h3 className="text-2xl my-5">Orders History</h3>
      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        value={searchText}
        onChange={handleSearch}
      />
      <Table
        dataSource={carts}
        columns={columns}
        pagination={{ pageSize: 4 }}
        rowKey="cart_no"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
      {/* Modal for showing detailed information */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedCart && (
          <div>
            <p>
              <strong>Course Name:</strong> {selectedCart.course_name}
            </p>
            <p>
              <strong>Cart No:</strong> {selectedCart.cart_no}
            </p>
            <p>
              <strong>Price Paid:</strong> ${selectedCart.price.toFixed(2)}
            </p>
            <p>
              <strong>Discount:</strong> {selectedCart.discount}%
            </p>
            <p>
              <strong>Instructor Name:</strong> {selectedCart.instructor_name}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedCart.created_at).toLocaleDateString()}
            </p>
            <p>
              <strong>Image:</strong>
              <br />
              <img
                src={selectedCart.course_image}
                alt="Course"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default StudentOrderHistory;
