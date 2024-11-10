import { Card, Table, TableProps, Button, Space, Modal, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import RejectPayoutModal from "./RejectPayoutModal";
import {
  GetPayoutRequest,
  Payout,
  PayoutStatusEnum,
} from "../../../models/Payout.model";
import PayoutService from "../../../services/payout.service";
import { PageInfo } from "../../../models/SearchInfo.model";
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";
const TransactionListModal =  React.lazy(()=> import ("../../../components/TransactionListModal"))

const AdminRequestPayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenTransaction, setIsOpenTransaction] = useState(false);
  const [currentRequestPayout, setCurrentRequestPayout] = useState<Payout>(
    {} as Payout
  );
  
  const [loading, setLoading] = useState(false);
  const [requestPayoutList, setRequestPayoutList] = useState<Payout[]>();
  const [currentRequestPayouts, setCurrentRequestPayouts] = useState<PageInfo>(
    {} as PageInfo
  );
  const [searchRequestPayoutParam, setRequestPayoutParam] =
    useState<GetPayoutRequest>({
      searchCondition: {
        payout_no: "",
        instructor_id: "",
        status: PayoutStatusEnum.REQUEST_PAYOUT,
        is_instructor: false,
        is_delete: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
      },
    });

  // fetch request payout
  const fetchDataRequestPayout = async () => {
    setLoading(true);
    try {
      const res = await PayoutService.getPayout(searchRequestPayoutParam);
      setRequestPayoutList(res?.data?.pageData as Payout[]);
      setCurrentRequestPayouts(res?.data?.pageInfo as PageInfo);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataRequestPayout();
  }, [searchRequestPayoutParam]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleViewTransaction = (item: Payout) => {
    setIsOpenTransaction(true);
    setCurrentRequestPayout(item);
  };

  const columns: TableProps<Payout>["columns"] = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
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
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "View Transaction",
      dataIndex: "view_transaction",
      key: "view_transaction",
    
      render: (_, record: Payout) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => handleViewTransaction(record)}
            >
              View 
            </Button>
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record: Payout) => (
        <Space size="middle">
          <Tooltip title="Accept">
            <Button
              type="text"
              className="text-green-600"
              icon={<CheckOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title="Reject">
            <Button
              className="text-red-600"
              type="text"
              icon={<CloseOutlined />}
              onClick={showModal}
            ></Button>
          </Tooltip>
          <RejectPayoutModal
            isOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </Space>
      ),
    },
  ];

  const handleSearch = (values: Record<string, any>) => {
    console.log("request payout", values);

    setRequestPayoutParam((prev) => ({
      ...prev,
      searchCondition: {
        ...prev.searchCondition,
        payout_no: values.keyword,
      },
    }));
  };

  return (
    <>
      <Card>
        <div className="flex">
          <h3 className="text-2xl my-5">Payout Management</h3>
        </div>
        <div>
          <GlobalSearchUnit
            placeholder="Search By Purchase Name"
            onSubmit={handleSearch}
          />
        </div>
        <Table
          dataSource={requestPayoutList}
          columns={columns}
          pagination={{
            current: currentRequestPayouts.pageNum,
            pageSize: currentRequestPayouts.pageSize,
            total: currentRequestPayouts.totalItems,
            onChange: (pageNum, pageSize) => {
              setRequestPayoutParam((prev) => ({
                ...prev,
                pageInfo: { pageNum, pageSize },
              }));
            },
          }}
          rowKey={(record) => record._id}
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }}
          loading={loading}
        />
      </Card>
      <Modal
        open={isOpenTransaction}
        width={1000}
        closable
        onCancel={() => setIsOpenTransaction(false)}
        footer={null}
      >
        <TransactionListModal item={currentRequestPayout} />
      </Modal>
    </>
  );
};

export default AdminRequestPayout;
