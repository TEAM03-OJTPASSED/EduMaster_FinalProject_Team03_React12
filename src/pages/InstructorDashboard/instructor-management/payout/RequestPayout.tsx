import { Card, Table, Tag, TableProps, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import PayoutService from "../../../../services/payout.service";
import { GetPayoutRequest, Payout, PayoutStatusEnum } from "../../../../models/Payout.model";
import { handleNotify } from "../../../../utils/handleNotify";
import EmptyData from "../../../../components/Empty Data/EmptyData";
import { moneyFormatter } from "../../../../utils/moneyFormatter";

const RequestPayout = () => {
  const [newPayouts, setNewPayouts] = useState<Payout[]>([]);

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


  const fetchRequestPayouts = async () => {
    const requestParams: GetPayoutRequest = {
      ...initialParams,
      searchCondition: {
        ...initialParams.searchCondition,
        status: PayoutStatusEnum.NEW,
      },
    };
    const response = await PayoutService.getPayout(requestParams);
    const payouts = response.data?.pageData || [];
    setNewPayouts(payouts);
  };

  useEffect(() => {
    fetchRequestPayouts();
  }, []);



  const handleSendToAdmin = async (payout: Payout) => {
    const params = {
      status: PayoutStatusEnum.REQUEST_PAYOUT,
      comment: "Request payout by instructor",
    };
    await PayoutService.updatePayoutStatus(payout._id, params);
    handleNotify("Payout Sent For Request", "Payout request has been sent to admin.");
    fetchRequestPayouts();
  };

  const baseColumns = [
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
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      ellipsis: true,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    // {
    //   title: "Transaction ID",
    //   dataIndex: "transactions",
    //   key: "transactions",
    //   render: (transactions: Transaction[]) =>
    //     transactions.map((transaction, index) => (
    //       <span key={index}>{transaction.purchase_id},</span>
    //     )),
    // },
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
  ];

  const newPayoutsLocale = {
    emptyText: <EmptyData description="New payouts will appear here when they're ready for processing" message="No new payouts to process"/>
  };

  

  const newPayoutsColumns: TableProps<Payout>["columns"] = [
    ...baseColumns,
    {
      title: "Action",
      key: "action",
      fixed: 'right' as const,
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
      <h3 className="text-2xl my-5">Request Payout</h3>
      <Table
        dataSource={newPayouts}
        columns={newPayoutsColumns}
        pagination={{ pageSize: 10 }}
        tableLayout="fixed"
        rowKey="payout_no"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
        locale={newPayoutsLocale}
      />
      
    </Card>
  );
};

export default RequestPayout;




