import { Modal, Form, Input, Select, Switch, Button } from "antd";

const { Option } = Select;

// Assuming the User interface is available for import
interface User {
  key: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  status: boolean;
  role: string;
  verified: boolean;
  blocked: boolean;
  createdAt: string;
}

interface EditUserProps {
  visible: boolean; // Update this to use boolean
  onClose: () => void; // Function type for onClose
  user: User | any; // User can be null when editing is not active
  onSave: (values: User) => void; // Function to handle save action
}

const EditUser: React.FC<EditUserProps> = ({
  visible,
  onClose,
  user,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSave(values);
    onClose(); // Close modal after saving
  };

  return (
    <Modal
      title="Chỉnh sửa người dùng"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        initialValues={user}
        onFinish={handleFinish}
        labelCol={{ span: 6 }} // Aligns labels to 6 columns width
        wrapperCol={{ span: 18 }} // Aligns input fields to 18 columns width
      >
        <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="role"
          label="Loại người dùng"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="Admin">Admin</Option>
            <Option value="Instructor">Instructor</Option>
            <Option value="Student">Student</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Trạng thái" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser;