import { useEffect, useState } from "react";
import { Card, Input, Table, Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { GetPurchases, Purchase } from "../../models/Purchase.model";
import { PageInfo } from "../../models/SearchInfo.model";
import PurchaseService from "../../services/purchase.service";
import useDebounce from "../../hooks/useDebounce";

// Define columns for the Purchase Log table
const StudentOrderHistory = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCart, setSelectedCart] = useState<Purchase | null>(null);
  const searchDebounce = useDebounce(searchText, 2000);
  const [purchaseLogList, setPurchaseLogList] = useState<Purchase[]>([]);
  const [currentPurchase, setCurrentPurchase] = useState<PageInfo>(
    {} as PageInfo
  );

  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  const showDetails = (cart: Purchase) => {
    setSelectedCart(cart);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCart(null);
  };
  const [purchaseLogSearchParam, setPurchaseLogSearchParam] =
    useState<GetPurchases>({
      searchCondition: {
        purchase_no: "",
        cart_no: "",
        course_id: "",
        status: "",
        is_delete: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
      },
    });
  useEffect(() => {
    setPurchaseLogSearchParam((prev) => ({
      ...prev,
      searchCondition: {
        ...prev.searchCondition,
        purchase_no: searchDebounce,
        course_name: searchDebounce,
      },
    }));
  }, [searchDebounce]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await PurchaseService.getPurchasesStudent(
        purchaseLogSearchParam
      );
      setPurchaseLogList(res?.data?.pageData as Purchase[]);
      setCurrentPurchase(res?.data?.pageInfo as PageInfo);
    };
    fetchData();
  }, [purchaseLogSearchParam]);

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Purchase No",
      dataIndex: "purchase_no",
      key: "purchase_no",
    },
    {
      title: "Cart No",
      dataIndex: "cart_no",
      key: "cart_no",
    },
    {
      title: "Learner Name",
      dataIndex: "student_name",
      key: "student_name",
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
      title: "View Details",
      key: "action",
      render: (_: any, record: Purchase) => (
        <Button type="primary" onClick={() => showDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];
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
        dataSource={purchaseLogList}
        columns={columns}
        pagination={{
          current: currentPurchase.pageNum,
          pageSize: currentPurchase.pageSize,
          total: currentPurchase.totalItems,
          onChange: (pageNum, pageSize) => {
            setPurchaseLogSearchParam((prev) => ({
              ...prev,
              pageInfo: { pageNum, pageSize },
            }));
          },
        }}
        rowKey={(record) => record._id}
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
              <strong>Purchase No:</strong> {selectedCart.purchase_no}
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
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default StudentOrderHistory;
