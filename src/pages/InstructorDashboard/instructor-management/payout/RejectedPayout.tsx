import React, { useEffect, useState } from "react";
import { Card, Input, Table, TableProps, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import PayoutService from "../../../../services/payout.service"; 
import { Payout, PayoutStatusEnum } from "../../../../models/Payout.model"; 

const RejectedPayout: React.FC = () => {
  const location = useLocation();
  const { status } = location.state || {};
  const [filteredPayouts, setFilteredPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    const fetchPayouts = async () => {
      setLoading(true);
      try {
        const response = await PayoutService.getPayouts(); 
        const payouts = response.data || [];
        const rejectedPayouts = payouts.filter((payout: Payout) => payout.status === status);
        setFilteredPayouts(rejectedPayouts);
      } finally {
        setLoading(false);
      }
    };

    fetchPayouts();
  }, [status]);

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
      render: (status: PayoutStatusEnum) => (
        <Tag color="red">{status}</Tag>
      ),
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
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Table
        dataSource={filteredPayouts.filter((payout) => payout.payout_no.includes(searchKeyword))}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="payout_no"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
        loading={loading}
      />
    </Card>
  );
};

export default RejectedPayout;
