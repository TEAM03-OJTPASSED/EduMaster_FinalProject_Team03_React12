import { useEffect, useState } from "react";
import { Button, Card, Table, Tag } from "antd";
import PurchaseService from "../../../services/purchase.service";
import { Purchase, PurchaseStatusEnum } from "../../../models/Purchase.model"; 
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";
import { statusFormatter } from "../../../utils/statusFormatter";
const columns = [
  
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

const InstructorSalesHistory = () => {
  const [salesHistory, setSalesHistory] = useState<Purchase[]>([]);



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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <GlobalSearchUnit 
            placeholder="Search By Course Name"
            selectFields={[
              {
                name: "status",
                options:  Object.values(PurchaseStatusEnum).map((status) => ({label: statusFormatter(status), value: status})),
                placeholder: "Filter by Status"
              }
            ]}
        />
      </div>
      <Table
        dataSource={salesHistory}
        columns={columns}
        pagination={{ pageSize: 4 }}
        rowKey="purchaseNumber"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default InstructorSalesHistory;

const handleAction = (record: any) => {
  console.log("Viewing details for:", record);
};