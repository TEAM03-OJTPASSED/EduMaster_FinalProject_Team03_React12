import { Card, Input, Table, TableProps, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  Payout,
  payouts,
  PayoutStatusEnum,
} from "../../../AdminDashboard/monitors/course/courseList";
import { useLocation } from "react-router-dom";


const CompletedPayout = () => {
  const location = useLocation();

  const { status } = location.state || {};

  const filterdPayouts = payouts.filter((payout) => payout.status === status);

  const columns: TableProps<Payout>["columns"] = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: PayoutStatusEnum) => {
        if (status === "Completed") {
          return <Tag color="green">Completed</Tag>
        }
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Balance Origin",
      dataIndex: "balance_origin",
      key: "balance_origin",
    },
    {
      title: "Balance Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
    },
    
  ];

  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Payout Management</h3>
      </div>
      <Input
        placeholder="Search By Payout Number"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />
      <Table
        dataSource={filterdPayouts}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="name"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};
export default CompletedPayout;
