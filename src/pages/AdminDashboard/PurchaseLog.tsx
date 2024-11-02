import { ChangeEvent, useEffect, useState } from "react";
import { Card, Input, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import useDebounce from "../../hooks/useDebounce";
import { GetPurchases, Purchase } from "../../models/Purchase.model";
import PurchaseService from "../../services/purchase.service";
import { PageInfo } from "../../models/SearchInfo.model";

// Cột cho bảng Purchase Log
const columns = [
  {
    title: "Course Name",
    dataIndex: "course_name",
    key: "course_name",
  },
  {
    title: "Purchase Number",
    dataIndex: "purchase_no",
    key: "purchase_no",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag
        color={
          status === "new"
            ? "green"
            : status === "request_paid"
            ? "orange"
            : "red" // Màu cho trạng thái khác (Refunded)
        }
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "Price Paid",
    dataIndex: "price_paid",
    key: "price_paid",
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    render: (discount: number) => `${discount}%`,
  },
  {
    title: "Student Name",
    dataIndex: "student_name",
    key: "student_name",
  },
  {
    title: "Instructor Name",
    dataIndex: "instructor_name",
    key: "instructor_name",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
];

const Purchaselog = () => {
  const [searchText, setSearchText] = useState<string>("");
  const searchDebounce = useDebounce(searchText, 2000);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  //
  const [purchaseLogList, setPurchaseLogList] = useState<Purchase[]>([]);
  const [currentPurchase, setCurrentPurchase] = useState<PageInfo>(
    {} as PageInfo
  );
  const [purchaseLogSearchParam, setPurchaseLogSearchParam] =
    useState<GetPurchases>({
      searchCondition: {
        purchase_no: "",
        cart_no: "",
        course_id: "",
        status: "",
        is_delete: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
      },
    });
  useEffect(() => {
    setPurchaseLogSearchParam((prev) => ({
      ...prev,
      searchCondition: { ...prev.searchCondition, purchase_no: searchDebounce },
    }));
  }, [searchDebounce]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await PurchaseService.getPurchases(purchaseLogSearchParam);
      setPurchaseLogList(res?.data?.pageData as Purchase[]);
      setCurrentPurchase(res?.data?.pageInfo as PageInfo);
      console.log();
    };
    fetchData();
  }, [purchaseLogSearchParam]);

  return (
    <Card>
      <h3 className="text-2xl my-5">Purchase Log</h3>
      <Input
        placeholder="Search By Purchase Number"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        value={searchText}
        onChange={handleSearchChange}
      />
      <Table
        dataSource={purchaseLogList}
        columns={columns}
        pagination={{
          current: currentPurchase.pageNum,
          pageSize: currentPurchase.pageSize,
          total: currentPurchase.totalItems,
          onChange: (pageNum, pageSize) => {
            setPurchaseLogSearchParam((prev) => ({
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
  );
};

export default Purchaselog;
