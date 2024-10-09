import { Col, Divider, Row } from "antd";
import { DashboardOutlined } from "@ant-design/icons";

const style = {
  background: "#fff",
  padding: "8px 0",
  borderRadius: "8px",
  margin: "8px 0",
};
const AdminContent = () => {
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
          <div style={style}>col-responsive</div>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={8} lg={6}>
          <div style={style}>col-responsive</div>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={8} lg={6}>
          <div style={style}>col-responsive</div>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={8} lg={6}>
          <div style={style}>col-responsive</div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminContent;
