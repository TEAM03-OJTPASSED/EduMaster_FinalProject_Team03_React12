import { Button, Card, Modal, Table, TableProps, Tooltip } from "antd";
import PayoutService from "../../../services/payout.service";
import {
  GetPayoutRequest,
  Payout,
  PayoutStatusEnum,
} from "../../../models/Payout.model";
import { PageInfo } from "../../../models/SearchInfo.model";
import { useEffect, useState } from "react";
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";
import TransactionListModal from "../../../components/TransactionListModal";
import dayjs from "dayjs";
import { EyeFilled } from "@ant-design/icons";

const AdminCompletedPayout = () => {
  const columns: TableProps<Payout>["columns"] = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
      align: "center",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      align: "center",
    },

    {
      title: "Balance Origin",
      dataIndex: "balance_origin",
      key: "balance_origin",
      align: "center",
      render: (balance : number) =>{
        return <div>
          {`$${balance}`}
        </div>
      }
    },
    {
      title: "Balance Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      align: "center",
      render: (balance : number) =>{
        return <div>
          {`$${balance}`}
        </div>
      }
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      align: "center",
      render: (balance : number) =>{
        return <div>
          {`$${balance}`}
        </div>
      }
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY")}</div>;
      },
      align: "center",
    },
    {
      title: "View Transaction",
      dataIndex: "view_transaction",
      key: "view_transaction",
      align: "center",
      render: (_, record: Payout) => {
        return (
          <div>
            <Tooltip title="View Detail">
            <Button
              className="text-red-600"
              icon={<EyeFilled />}
              type="text"
              onClick={() => handleViewTransaction(record)}
            >
            </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const [isOpenTransaction, setIsOpenTransaction] = useState(false);
  const [currentRequestPayout, setCurrentRequestPayout] = useState<Payout>(
    {} as Payout
  );

  const [loading, setLoading] = useState(false);
  const [requestPayoutList, setRequestPayoutList] = useState<Payout[]>();
  const [currentRequestPayouts, setCurrentRequestPayouts] = useState<PageInfo>(
    {} as PageInfo
  );
  const [searchRequestPayoutParam, setSearchRequestPayoutParam] =
    useState<GetPayoutRequest>({
      searchCondition: {
        payout_no: "",
        instructor_id: "",
        status: PayoutStatusEnum.COMPLETED,
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
  const handleSearch = (values: Record<string, any>) => {
    console.log("request payout", values);

    setSearchRequestPayoutParam((prev) => ({
      ...prev,
      searchCondition: {
        ...prev.searchCondition,
        payout_no: values.keyword,
      },
    }));
  };
  const handleViewTransaction = (item: Payout) => {
    setIsOpenTransaction(true);
    setCurrentRequestPayout(item);
  };

  return (
    <>
      <Card>
        <div className="flex">
          <h3 className="text-2xl my-5">Payout Management</h3>
        </div>
        <GlobalSearchUnit
          placeholder="Search By Purchase Name"
          onSubmit={handleSearch}
        />
        <Table
          dataSource={requestPayoutList}
          columns={columns}
          pagination={{
            current: currentRequestPayouts.pageNum,
            pageSize: currentRequestPayouts.pageSize,
            total: currentRequestPayouts.totalItems,
            onChange: (pageNum, pageSize) => {
              setSearchRequestPayoutParam((prev) => ({
                ...prev,
                pageInfo: { pageNum, pageSize },
              }));
            },
          }}
          rowKey={(record) => record._id}
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }}
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
export default AdminCompletedPayout;
