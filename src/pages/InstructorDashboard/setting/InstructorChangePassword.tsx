import { Button, Card, Input, Space, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const InstructorChangePassword = () => {
  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Change Password</h3>
      </div>
      <Space direction="vertical">
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              { required: true, message: "Please input your current password" },
            ]}
          >
            <Input.Password
              placeholder="Input current password"
              style={{ width: "72vw", boxSizing: "border-box" }}
            />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password" },
            ]}
          >
            <Input.Password
              placeholder="Input new password"
              style={{ width: "72vw", boxSizing: "border-box" }}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            rules={[
              { required: true, message: "Please confirm your new password" },
            ]}
          >
            <Input.Password
              placeholder="Please confirm your new password"
              style={{ width: "72vw", boxSizing: "border-box" }}
            />
          </Form.Item>
        </Form>
      </Space>
      <div className="pt-4">
        <Button type="primary">Change Password</Button>
      </div>
    </Card>
  );
};

export default InstructorChangePassword;
