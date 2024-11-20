import { Col, Divider, Row, Card, Table } from "antd";
import {
  WalletOutlined,
  DashboardOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { UserService } from "../../services/user.service";
import { User } from "../../models/UserModel";
import { CartStatusEnum, SearchCartByStatus } from "../../models/Cart.model";
import CartService from "../../services/cart.service";

const cardStyle = {
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  margin: "8px 0",
};

const StudentContent = () => {
  const [dataSource] = useState([
    {
      key: "1",
      number: "Nguyễn Văn A",
      amount: "a@example.com",
      date: "2023-01-15",
    },
    {
      key: "2",
      number: "Nguyễn Văn A",
      amount: "a@example.com",
      date: "2023-01-15",
    },
    {
      key: "3",
      number: "Nguyễn Văn A",
      amount: "a@example.com",
      date: "2023-01-15",
    },
  ]);
  const columns = [
    {
      title: "Payout Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "	Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const [totalCourse, setTotalCourse] = useState<number>(0);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const initialCourseSearchParams: SearchCartByStatus = {
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    searchCondition: {
      status: CartStatusEnum.COMPLETED,
      is_deleted: false,
    },
  };

  const fetchTotal = async () => {
    try {
      const userResponse = await UserService.getUser(currentUser._id);
      const courseResponse = await CartService.getCartsByStatus(
        initialCourseSearchParams
      );
      const user = userResponse?.data as User;
      setTotalBalance(user?.balance_total || 0);
      setTotalCourse(courseResponse.data?.pageInfo?.totalItems || 0);
    } catch (error) {
      console.error("Error fetching user data:", error); 
    }
  };
  useEffect(() => {
    fetchTotal();
  });
  return (
    <div>
      <Divider orientation="left">
        <span style={{ marginRight: "8px", fontSize: "18px" }}>
          <DashboardOutlined />
        </span>
        <span style={{ fontSize: "18px" }}>Student Dashboard</span>
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
                  {totalBalance}
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
                  {totalCourse}
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
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="key"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }} // Thêm scroll cho bảng
      />
    </div>
  );
};

export default StudentContent;
