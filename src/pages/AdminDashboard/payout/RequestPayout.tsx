import { Card, Input, Table, Tag, TableProps, Button, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import {
  Payout,
  payouts,
  PayoutStatusEnum,
} from "../monitors/course/courseList";
import { useState } from "react";
import RejectPayoutModal from "./RejectPayoutModal";

const AdminRequestPayout = () => {
  const location = useLocation();

  const { status } = location.state || {};

  const filterdPayouts = payouts.filter((payout) =>
    Array.isArray(status)
      ? status.includes(payout.status)
      : payout.status === status
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      onFilter: (value: any, record: Payout) => record.status === value,
      render: (status: PayoutStatusEnum) => {
        if (status === "New") {
          return <Tag color="blue">New</Tag>;
        } else if (status === "Request Payout") {
          return <Tag color="yellow">Request Payout</Tag>;
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
    {
      title: "Actions",
      key: "action",
      render: (_, record: Payout) => (
        <Space size="middle">
          <Button
            type="text"
            className="text-green-600"
            icon={<CheckOutlined />}
            disabled={
              record.status !== PayoutStatusEnum.request_payout &&
              record.status !== PayoutStatusEnum.new
            }
          >
          </Button>
          <Button
            className="text-red-600"
            type="text"
            icon={<CloseOutlined />}
            disabled={
              record.status !== PayoutStatusEnum.request_payout &&
              record.status !== PayoutStatusEnum.new
            }
            onClick={showModal}
          >
          </Button>
          <RejectPayoutModal
            isOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Payout Management</h3>
      </div>
      <div className="flex flex-wrap items-center mb-4">
      <Input
        placeholder="Search By Payout Number"
        prefix={<SearchOutlined />}
        className="w-full md:w-1/3 mb-2 md:mb-0"
      />
      </div>
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
export default AdminRequestPayout;
