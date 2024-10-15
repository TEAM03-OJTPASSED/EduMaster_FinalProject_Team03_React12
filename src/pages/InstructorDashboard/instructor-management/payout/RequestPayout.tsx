import { Card, Input, Table, Tag, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  Payout,
  payouts,
  PayoutStatusEnum,
} from "../../../AdminDashboard/monitors/course/couseList";

import dayjs from "dayjs";

const RequestPayout = () => {
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
        switch (status) {
          case "Request Payout":
            return <Tag color="yellow">Request Payout</Tag>;
          case "Completed":
            return <Tag color="green">Completed Payout</Tag>;
        }
      },
    },

    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY")}</div>;
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
      dataIndex: "balance_paid",
      key: "balance_paid",
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balance_received",
      key: "balance_received",
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
        dataSource={payouts}
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
export default RequestPayout;
