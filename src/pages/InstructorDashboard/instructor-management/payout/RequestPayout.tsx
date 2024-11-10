import { Card, Input, Table, Tag, TableProps, Checkbox, Button, Modal } from "antd";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import PayoutService from "../../../../services/payout.service";
import { GetPayoutRequest, Payout, PayoutStatusEnum, Transaction } from "../../../../models/Payout.model";
import { handleNotify } from "../../../../utils/handleNotify";

const RequestPayout = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [payouts, setPayouts] = useState<Payout[]>([]);

  const initialParams: GetPayoutRequest = {
    searchCondition: {
      payout_no: "",
      instructor_id: "",
      is_instructor: true,
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
    setPayouts(payouts);
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  const handleSelect = (key: React.Key) => {
    const newSelectedRowKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((k) => k !== key)
      : [...selectedRowKeys, key];
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleUpdate = async () => {
    console.log("Update payouts:", selectedRowKeys);
  };

  const handleSendToAdmin = async (payout: Payout) => {
    const params = {
      status: PayoutStatusEnum.REQUEST_PAYOUT,
      comment: "Request payout by instructor", 
    };
      await PayoutService.updatePayoutStatus(payout._id, params);
      handleNotify("Payout Sent For Request", "Payout request has been sent to admin.");
      fetchPayouts(); 
  };
  

  const columns: TableProps<Payout>["columns"] = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.payout_no)}
          onChange={() => handleSelect(record.payout_no)}
        />
      ),
    },
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
        { text: PayoutStatusEnum.NEW, value: PayoutStatusEnum.NEW },
        { text: PayoutStatusEnum.REQUEST_PAYOUT, value: PayoutStatusEnum.REQUEST_PAYOUT },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: PayoutStatusEnum) => {
        const statusColors = {
          [PayoutStatusEnum.NEW]: "blue",
          [PayoutStatusEnum.REQUEST_PAYOUT]: "yellow",
          [PayoutStatusEnum.COMPLETED]: "green",
          [PayoutStatusEnum.REJECTED]: "red",
        };
        return <Tag color={statusColors[status] || "gray"}>{status}</Tag>;
      },
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => dayjs(created_at).format("DD/MM/YYYY"),
    },
    {
      title: "Transaction ID",
      dataIndex: "transactions",
      key: "transactions",
      render: (transactions: Transaction[]) =>
        transactions.map((transaction, index) => (
          <span key={index}>{transaction.purchase_id},</span>
        )),
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
      title: "Action",
      key: "action",
      render: (record: Payout) => (
        <Button
          type="text"
          icon={<SendOutlined style={{ color: "blue" }} />}
          onClick={() => handleSendToAdmin(record)}
          title="Send to admin for approval"
        />
      ),
    },
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">Payout Management</h3>
      <Input
        placeholder="Search By Payout Number"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />
      <Button type="default" onClick={handleUpdate} disabled={selectedRowKeys.length === 0}>
        Update Selected
      </Button>
      <Table
        dataSource={payouts}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="payout_no"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
      <Modal
        title="Create Payout"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Form to create a payout will go here.</p>
      </Modal>
    </Card>
  );
};

export default RequestPayout;
