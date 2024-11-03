import { Card, Input, Table, Tag, TableProps, Checkbox, Button, Modal, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Payout, PayoutStatusEnum } from "../../../AdminDashboard/monitors/course/courseList";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getPayout } from "../../../../services/payout.service"; 

const RequestPayout = () => {
  const location = useLocation();
  const { status } = location.state || {};
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [payouts, setPayouts] = useState<Payout[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        setLoading(true);
        const response = await getPayout();
        setPayouts(response.data);
      } catch (err) {
        setError("Failed to fetch payouts");
        message.error("Failed to fetch payouts"); 
      } finally {
        setLoading(false);
      }
    };

    fetchPayouts();
  }, []);

  const filterdPayouts = payouts.filter((payout) =>
    Array.isArray(status) ? status.includes(payout.status) : payout.status === status
  );

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
        { text: PayoutStatusEnum.new, value: PayoutStatusEnum.new },
        { text: PayoutStatusEnum.request_payout, value: PayoutStatusEnum.request_payout },
      ],
      onFilter: (value: any, record: any) => record.status === value,
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
            return <Tag color="gray">Unknown</Tag>;
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

  const handleSelect = (key: React.Key) => {
    const newSelectedRowKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((k) => k !== key)
      : [...selectedRowKeys, key];
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleCreate = async () => {
    
    console.log("Create new payout");
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    
    console.log("Update payouts:", selectedRowKeys);
    
  };

  if (loading) {
    return <Spin size="large" />; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

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
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: "20px", marginRight: "10px" }}
      >
        Create Payout
      </Button>
      <Button
        type="default"
        onClick={handleUpdate}
        disabled={selectedRowKeys.length === 0}
      >
        Update Selected
      </Button>
      <Table
        dataSource={filterdPayouts}
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
