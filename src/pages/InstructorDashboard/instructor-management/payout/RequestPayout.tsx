import { Card, Input, Table, Tag, TableProps, Checkbox, Button, Modal} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import PayoutService from "../../../../services/payout.service";
import { GetPayoutRequest, Payout, PayoutStatusEnum } from "../../../../models/Payout.model";

const RequestPayout = () => {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [payouts, setPayouts] = useState<Payout[]>([]); 


  const initialParams: GetPayoutRequest = {
    searchCondition: {
      payout_no: "",
      instructor_id: "",
      status: PayoutStatusEnum.NEW,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
  };
  
  


  useEffect(() => {
    const fetchPayouts = async () => {
        const response = await PayoutService.getPayout(initialParams);
        const payouts = response.data?.pageData || [];
        setPayouts(payouts)
    };

    fetchPayouts();
  }, []);



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
        { text: PayoutStatusEnum.REQUEST_PAYOUT, value: PayoutStatusEnum.REQUEST_PAYOUT},
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: PayoutStatusEnum) => {
        switch (status) {
          case PayoutStatusEnum.NEW:
            return <Tag color="blue">{PayoutStatusEnum.NEW}</Tag>;
          case PayoutStatusEnum.REQUEST_PAYOUT:
            return <Tag color="yellow">{PayoutStatusEnum.REQUEST_PAYOUT}</Tag>;
          case PayoutStatusEnum.COMPLETED:
            return <Tag color="green">{PayoutStatusEnum.COMPLETED}</Tag>;
          case PayoutStatusEnum.REJECTED:
            return <Tag color="red">{PayoutStatusEnum.REJECTED}</Tag>;
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
