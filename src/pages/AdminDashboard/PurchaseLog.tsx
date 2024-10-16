import { Card, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const PurchaseLog = () => {
  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Purchase Log</h3>
      </div>
      <Input
        placeholder="Search By Purchase Number"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />
    </Card>
  );
};
export default PurchaseLog;
