import { Card, Input, Table, Tag, TableProps } from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";
import {
  Payout,
  payouts,
  PayoutStatusEnum,
} from "../../../AdminDashboard/monitors/course/courseList";

import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

const RequestPayout = () => {
  const location = useLocation();

  const { status } = location.state || {};

  const filterdPayouts = payouts.filter((payout) =>
    Array.isArray(status)
      ? status.includes(payout.status)
      : payout.status === status
  );

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
      filters: [
        { text: PayoutStatusEnum.new, value: PayoutStatusEnum.new },
        {
          text: PayoutStatusEnum.request_payout,
          value: PayoutStatusEnum.request_payout,
        },
      ],
      onFilter: (value: any, record: any) => record.status === value, // Đảm bảo value là string
      render: (status: PayoutStatusEnum) => {
        switch (status) {
          case PayoutStatusEnum.new:
            return <Tag color="blue">{PayoutStatusEnum.new}</Tag>;
          case PayoutStatusEnum.request_payout:
            return <Tag color="yellow">{PayoutStatusEnum.request_payout}</Tag>;
          case PayoutStatusEnum.completed:
            return <Tag color="green">{PayoutStatusEnum.completed}</Tag>;
          case PayoutStatusEnum.rejected:
            return <Tag color="red">{PayoutStatusEnum.rejected}</Tag>;
          default:
            return <Tag color="gray">Unknown</Tag>; // Mặc định cho trạng thái khác
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
export default RequestPayout;
