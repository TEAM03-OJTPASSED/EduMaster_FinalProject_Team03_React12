import { useEffect, useState } from "react";
import { Button, Card, Table, Tag, Checkbox, Modal } from "antd";
import PurchaseService from "../../../services/purchase.service";
import { Purchase, PurchaseStatusEnum } from "../../../models/Purchase.model"; 
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";
import { statusFormatter } from "../../../utils/statusFormatter";
import { PlusCircleOutlined } from "@ant-design/icons";
import PayoutService from "../../../services/payout.service";
import { CreatePayout } from "../../../models/Payout.model";
import { handleNotify } from "../../../utils/handleNotify";




const InstructorSalesHistory = () => {
  const [salesHistory, setSalesHistory] = useState<Purchase[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Purchase | null>(null); // Thêm state cho đơn hàng được chọn

  useEffect(() => {
    const fetchSalesHistory = async () => {
      const response = await PurchaseService.getPurchasesInstructor(initialParams);
      setSalesHistory(response.data?.pageData || []);
    };

    fetchSalesHistory();
  }, []);


  const handleSelect = (key: React.Key) => {
    const newSelectedRowKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((k) => k !== key)
      : [...selectedRowKeys, key];
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleCreateOrder = async () => {

      const selectedOrders = salesHistory.filter(order =>
        selectedRowKeys.includes(order.purchase_no)
      );
  
      const transaction_ids = selectedOrders.map(order => ({
        purchase_id: order._id,
      }));
  
      const createPayout: CreatePayout = {
        instructor_id: selectedOrders[0].instructor_id,
        transactions: transaction_ids,  
      };

      console.log(createPayout)


      const response = await PayoutService.createPayout(createPayout);
      if (response.success) handleNotify("Payout created!", "Your payout was created successfully")
  };

  const handleAction = (order: Purchase) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const columns = [
      { 
        title: "Select",
        dataIndex: "select",
        key: "select",
        render: (_: any, record: any) => (
          <Checkbox
            checked={selectedRowKeys.includes(record.purchase_no)}
            onChange={() => handleSelect(record.purchase_no)}
          />
        ),
      },
    {
      title: "Purchase Number",
      dataIndex: "purchase_no",
      key: "purchaseNumber",
    },
    {
      title: "Cart No",
      dataIndex: "cart_no",
      key: "CartNo",
    },
    {
      title: "Course Name",
      dataIndex: "course_nam",
      key: "courseName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // filters: [
      //   { text: "Completed", value: "Completed" },
      //   { text: "Pending", value: "Pending" },
      //   { text: "Refunded", value: "Refunded" },
      // ],
      // onFilter: (value: any, record: any) =>
      //   record.status.trim() === value.trim(),
      render: (status: string) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "Pending"
              ? "orange"
              : "red" // Màu cho trạng thái khác (Refunded)
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "pricePaid",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "studentName",
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Button type="primary" onClick={() => handleAction(record)}>
          View Details
        </Button>
      ),
    },
  ];




  const initialParams = {
    searchCondition: {
      purchase_no: "",
      cart_no: "",
      course_id: "",
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
  };

  useEffect(() => {
    const fetchSalesHistory = async () => {
        const response = await PurchaseService.getPurchasesInstructor(initialParams);
        setSalesHistory(response.data?.pageData || []); 
    };

    fetchSalesHistory();
  }, []);


  


  return (
    <Card>
      <h3 className="text-2xl my-5">Orders</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
      <GlobalSearchUnit 
            placeholder="Search By Course Name"
            selectFields={[
              {
                name: "status",
                options:  Object.values(PurchaseStatusEnum).map((status) => ({label: statusFormatter(status), value: status})),
                placeholder: "Filter by Status"
              }
            ]}
            onSubmit={(values) => {
              
              console.log("Submitted values:", values);
            }}
        />

        <Button
          onClick={handleCreateOrder}
          icon={<PlusCircleOutlined />}
          shape="round"
          variant="solid"
          color="primary"
          disabled={selectedRowKeys.length === 0}
          className="items-center"
        >
          Create Payout
        </Button>
      </div>
      <Table
        dataSource={salesHistory}
        columns={columns}
        pagination={{ pageSize: 4 }}
        rowKey="purchase_no"
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
        {selectedOrder && (
          <div>
            <p><strong>Purchase No:</strong> {selectedOrder.purchase_no}</p>
            <p><strong>Course Name:</strong> {selectedOrder.course_name}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Price Paid:</strong> ${selectedOrder.price_paid.toFixed(2)}</p>
            <p><strong>Student Name:</strong> {selectedOrder.student_name}</p>
            {/* Add more details here as needed */}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default InstructorSalesHistory;