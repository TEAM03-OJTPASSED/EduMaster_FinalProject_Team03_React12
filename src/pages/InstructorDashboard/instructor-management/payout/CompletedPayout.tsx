import React, { useEffect, useState } from "react";
import { Card, Input, Table, TableProps, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PayoutService from "../../../../services/payout.service";
import { Payout, PayoutStatusEnum } from "../../../../models/Payout.model";

const CompletedPayout: React.FC = () => {
 
  const [filteredPayouts, setFilteredPayouts] = useState<Payout[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const initialParams = {
    searchCondition: {
      payout_no: "",
      instructor_id: "",
      status: PayoutStatusEnum.COMPLETED,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
  };
  

  


  const fetchPayouts = async () => {
    const response = await PayoutService.getPayout(initialParams); 
    const payouts = response.data?.pageData || [];
    setFilteredPayouts(payouts);
  };


  useEffect(() => {
    
    fetchPayouts();
  }, []);

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
        <Tag color="green">{status}</Tag>
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
      />
    </Card>
  );
};

export default CompletedPayout;
