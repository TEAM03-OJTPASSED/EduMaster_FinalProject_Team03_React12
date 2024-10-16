import { Card, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const CourseLog = () => {
  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Course Log</h3>
      </div>
      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />
    </Card>
  );
};
export default CourseLog;
