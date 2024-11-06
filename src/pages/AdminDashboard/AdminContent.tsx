import { Col, Divider, Row, Card, Table, Typography } from "antd";
import {
  WalletOutlined,
  DashboardOutlined,
  UserOutlined,
  TagsOutlined,
  SnippetsOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  GetPayoutRequest,
  Payout,
  PayoutStatusEnum,
} from "../../models/Payout.model";
import PayoutService from "../../services/payout.service";
import dayjs from "dayjs";

const cardStyle = {
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  margin: "8px 0",
};

const AdminContent = () => {
  const [setPayout] = useState<Payout[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchPayout = async () => {
    const searchParams: GetPayoutRequest = {
      searchCondition: {
        payout_no: "",
        instructor_id: "",
        status: PayoutStatusEnum.COMPLETED && PayoutStatusEnum.NEW,
        is_delete: false,
      },
      pageInfo: { pageNum, pageSize },
    };

    try {
      const response = await PayoutService.getPayout(searchParams);
      const responseData = response.data?.pageData;

      if (Array.isArray(responseData)) {
        // Kết hợp thông tin transactions và instructor_name
        const transactionsWithInstructorInfo = responseData.flatMap(
          (payout) =>
            payout.transactions?.map((transaction) => ({
              ...transaction,
              instructor_name: payout.instructor_name, // Gắn instructor_name từ payout
              payout_no: payout.payout_no, // Gắn instructor_name từ payout
              // price: payout.price, // Gắn giá từ payout nếu cần
            })) || []
        );

        setTransactions(transactionsWithInstructorInfo);
      }

      const flattenedUsers: Payout[] = Array.isArray(responseData)
        ? responseData.flat()
        : [];
      setPayout(flattenedUsers);
      setTotal(response.data?.pageInfo?.totalItems ?? 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  useEffect(() => {
    fetchPayout();
    // }, [pageNum, pageSize, searchText, activeTabKey]);
  }, [pageNum, pageSize]);

  const columns = [
    {
      title: "Payout Number",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
      render: (amount: number) => (
        <Typography.Text style={{ color: "#16DBAA", fontWeight: 500 }}>
          ${amount}
        </Typography.Text>
      ),
    },
    {
      title: "Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      render: (instructorName: string) => (
        <Typography.Text style={{ color: "#4a5568" }}>
          {instructorName}
        </Typography.Text>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt: string) => {
        return dayjs(createdAt).format("DD-MM-YYYY");
      },
    },
  ];

  return (
    <div>
      <Divider orientation="left">
        <span style={{ marginRight: "8px", fontSize: "18px" }}>
          <DashboardOutlined />
        </span>
        <span style={{ fontSize: "18px" }}>Admin Dashboard</span>
      </Divider>
      <Row gutter={16}>
        <Col className="gutter-row" xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              ...cardStyle,
              background: "linear-gradient(to bottom, #c6f6d5, #f0fff4)",
              borderBottom: "4px solid #38a169",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "16px" }}>
                <div
                  style={{
                    backgroundColor: "#38a169",
                    borderRadius: "50%",
                    padding: "20px",
                    display: "inline-block",
                  }}
                >
                  <WalletOutlined style={{ fontSize: "24px", color: "#fff" }} />
                </div>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <h2
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#4a5568",
                  }}
                >
                  Total Balance
                </h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
                  3249
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              ...cardStyle,
              background: "linear-gradient(to bottom, #fed7d7, #fff5f5)",
              borderBottom: "4px solid #f56565",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "16px" }}>
                <div
                  style={{
                    backgroundColor: "#e53e3e",
                    borderRadius: "50%",
                    padding: "20px",
                    display: "inline-block",
                  }}
                >
                  <TagsOutlined style={{ fontSize: "24px", color: "#fff" }} />
                </div>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <h2
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#4a5568",
                  }}
                >
                  Total Categories
                </h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
                  3
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              ...cardStyle,
              background: "linear-gradient(to bottom, #bee3f8, #ebf8ff)",
              borderBottom: "4px solid #4299e1",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "16px" }}>
                <div
                  style={{
                    backgroundColor: "#4299e1",
                    borderRadius: "50%",
                    padding: "20px",
                    display: "inline-block",
                  }}
                >
                  <SnippetsOutlined
                    style={{ fontSize: "24px", color: "#fff" }}
                  />
                </div>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <h2
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#4a5568",
                  }}
                >
                  Total Courses
                </h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
                  249
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              ...cardStyle,
              background: "linear-gradient(to bottom, #fed7e2, #fff5f7)",
              borderBottom: "4px solid #d53f8c",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "16px" }}>
                <div
                  style={{
                    backgroundColor: "#d53f8c",
                    borderRadius: "50%",
                    padding: "20px",
                    display: "inline-block",
                  }}
                >
                  <UserOutlined style={{ fontSize: "24px", color: "#fff" }} />
                </div>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <h2
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#4a5568",
                  }}
                >
                  Total Users
                </h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
                  249
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              ...cardStyle,
              background: "linear-gradient(to bottom, #fff99e, #fef9c3)",
              borderBottom: "4px solid #d69e2e",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "16px" }}>
                <div
                  style={{
                    backgroundColor: "#d69e2e",
                    borderRadius: "50%",
                    padding: "20px",
                    display: "inline-block",
                  }}
                >
                  <CommentOutlined
                    style={{ fontSize: "24px", color: "#fff" }}
                  />
                </div>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <h2
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#4a5568",
                  }}
                >
                  Total Blogs
                </h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
                  249
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Divider orientation="left">
        <span style={{ fontSize: "18px" }}>Latest Transactions</span>
      </Divider>
      <Table
        dataSource={transactions}
        columns={columns}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        rowKey="_id"
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default AdminContent;
