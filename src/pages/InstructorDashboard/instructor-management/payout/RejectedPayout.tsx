import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Descriptions, Input, Modal, Table, TableProps, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PayoutService from "../../../../services/payout.service"; 
import { GetPayoutRequest, Payout, PayoutStatusEnum } from "../../../../models/Payout.model"; 
import { moneyFormatter } from "../../../../utils/moneyFormatter";

const RejectedPayout: React.FC = () => {
  
  const [filteredPayouts, setFilteredPayouts] = useState<Payout[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null); // Thêm state cho đơn hàng được chọn
  const initialParams :GetPayoutRequest= {
    searchCondition: {
      payout_no: "",
      instructor_id: "",
      status: PayoutStatusEnum.REJECTED,
      is_instructor:true,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
  };

  const handleAction = (payout: Payout) => {
    setSelectedPayout(payout);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedPayout(null);
  };

  useEffect(() => {
    const fetchPayouts = async () => {
        const response = await PayoutService.getPayout(initialParams); 
        const payouts = response.data?.pageData || [];
        setFilteredPayouts(payouts);
      }


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
        <Tag color="red">{status}</Tag>
      ),
    },
    // {
    //   title: "Transaction ID",
    //   dataIndex: "transactions",
    //   key: "transactions",
    //   render: (transactions: Transaction[]) =>
    //     transactions.map((transaction) => (
    //       <span key={transaction.purchase_id}>{transaction.purchase_id},</span>
    //     )),
    // },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "balance_instructor_received",
      ellipsis: true,
      render: (date: string) => new Date(date).toLocaleString(),

    },
    {
      title: "Balance Origin",
      dataIndex: "balance_origin",
      key: "balance_origin",
      ellipsis: true,
      align: 'right' as const,
      render: (money: number) => moneyFormatter(money),
    },
    {
      title: "Balance Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      ellipsis: true,
      align: 'right' as const,
      render: (money: number) => moneyFormatter(money),
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      ellipsis: true,
      align: 'right' as const,
      render: (money: number) => moneyFormatter(money),
    },
    {
      title: "Action",
      key: "action",
      fixed: 'right' as const,
      render: (record: any) => (
        <Button type="primary" onClick={() => handleAction(record)}>
          View Details
        </Button>
      ),
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
        className="min-w-full"
        dataSource={filteredPayouts.filter((payout) => payout.payout_no.includes(searchKeyword))}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="payout_no"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />

      {/* Modal for showing detailed information */}
      <Modal
      title={`Payout Details - ${selectedPayout?.payout_no}`}
      visible={isModalVisible}
      onCancel={handleCloseModal}
      footer={null}
    > 
    { selectedPayout && 
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Payout Number">
          {selectedPayout.payout_no}
        </Descriptions.Item>
        
        <Descriptions.Item label="Status">
          <Badge
            status={
              selectedPayout.status === PayoutStatusEnum.COMPLETED
                ? 'success'
                : selectedPayout.status === PayoutStatusEnum.REQUEST_PAYOUT
                ? 'warning'
                : 'error'
            }
            text={selectedPayout.status}
          />
        </Descriptions.Item>

        <Descriptions.Item label="Balance Origin">
          {`${moneyFormatter(selectedPayout.balance_origin)}`}
        </Descriptions.Item>

        <Descriptions.Item label="Paid to Instructor">
          {`${moneyFormatter(selectedPayout.balance_instructor_paid)}`}
        </Descriptions.Item>

        <Descriptions.Item label="Received by Instructor">
          {`${moneyFormatter(selectedPayout.balance_instructor_received)}`}
        </Descriptions.Item>

        <Descriptions.Item label="Created At">
          {new Date(selectedPayout.created_at).toLocaleDateString()} - {new Date(selectedPayout.created_at).toLocaleTimeString()}
        </Descriptions.Item>

        <Descriptions.Item label="Last Updated">
          {new Date(selectedPayout.updated_at).toLocaleDateString()} - {new Date(selectedPayout.updated_at).toLocaleTimeString()}
        </Descriptions.Item>

        <Descriptions.Item label="Transaction ID">
          {selectedPayout.transactions.map((transaction) => (
        <span key={transaction.purchase_id}>{transaction.purchase_id}</span>))}
        </Descriptions.Item>

      </Descriptions>
    }
    </Modal>
    </Card>
  );
};

export default RejectedPayout;

