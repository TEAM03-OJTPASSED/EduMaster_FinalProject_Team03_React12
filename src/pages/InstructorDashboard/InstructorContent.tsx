import { Col, Divider, Row, Card, Table, Typography } from "antd";
import {
  WalletOutlined,
  DashboardOutlined,
  UserOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import CourseService from "../../services/course.service";
import PayoutService from "../../services/payout.service";
import { Payout, PayoutStatusEnum } from "../../models/Payout.model";
import dayjs from "dayjs";

const cardStyle = {
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  margin: "8px 0",
};

const InstructorContent = () => {
  const [_payout, setPayout] = useState<Payout[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalBalanceInstructorReceived, setTotalBalanceInstructorReceived] =
    useState(0); // State để lưu tổng số tiền

  const [counts, setCounts] = useState({
    courses: 0,
    // subcribers: 0,
  });

  const defaultPayload = {
    searchCondition: {
      keyword: "",
      role: "",
      status: true,
      is_verified: true,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
  };

  const fetchCounts = async () => {
    try {
      const [coursesRes] = await Promise.all([
        CourseService.getCourses({
          ...defaultPayload,
          searchCondition: {
            ...defaultPayload.searchCondition,
            is_deleted: false,
            status: "",
            category_id: "",
          },
        }),
      ]);

      // Tính tổng số học viên (enrolled) của tất cả khóa học
      // const totalEnrolled =
      //   coursesRes.data?.pageData?.reduce(
      //     (sum, course) => sum + (course.enrolled || 0),
      //     0
      //   ) || 0;

      setCounts({
        courses: coursesRes.data?.pageInfo?.totalItems || 0,
        // subcribers: totalEnrolled,
      });
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const fetchPayout = async () => {
    const statuses = [PayoutStatusEnum.NEW, PayoutStatusEnum.COMPLETED];
    const searchParams = {
      searchCondition: {
        payout_no: "",
        instructor_id: "",
        is_instructor: false,
        is_delete: false,
      },
      pageInfo: { pageNum, pageSize },
    };

    try {
      const responses = await Promise.all(
        statuses.map((status) =>
          PayoutService.getPayout({
            ...searchParams,
            searchCondition: { ...searchParams.searchCondition, status },
          })
        )
      );

      const responseData = responses.flatMap(
        (response) => response.data?.pageData || []
      );
      setTransactions(
        responseData.flatMap(
          (payout) =>
            payout.transactions?.map((transaction) => ({
              ...transaction,
              instructor_name: payout.instructor_name,
              payout_no: payout.payout_no,
            })) || []
        )
      );
      setTotalBalanceInstructorReceived(
        responseData.reduce(
          (sum, payout) => sum + (payout.balance_instructor_received || 0),
          0
        )
      );

      setPayout(responseData);
      setTotal(
        responses.reduce(
          (sum, response) => sum + (response.data?.pageInfo?.totalItems || 0),
          0
        )
      );
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchCounts();
    fetchPayout();
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
        <span style={{ fontSize: "18px" }}>Instructor Dashboard</span>
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
                    fontSize: "15px",
                    color: "#4a5568",
                  }}
                >
                  Total Balance
                </h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
                  {totalBalanceInstructorReceived.toFixed(2)}$
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
                    fontSize: "15px",
                    color: "#4a5568",
                  }}
                >
                  Total Courses
                </h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
                  {counts.courses}
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
                    fontSize: "15px",
                    color: "#4a5568",
                  }}
                >
                  Total Subscribers
                </h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
                  249{" "}
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
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }} // Thêm scroll cho bảng
      />
    </div>
  );
};

export default InstructorContent;
