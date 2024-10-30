import { Modal, Form, Input, Select, Switch, Button } from "antd";
const { Option } = Select;

interface User {
  _id: string;
  key: string;
  name: string;
  email: string;
  phone_number?: string;
  avatar_url?: string;
  video_url?: string;
  bank_name?: string;
  bank_account_no?: string;
  bank_account_name?: string;
  dob: string;
  status: boolean;
  role: string;
  description?: string;
}

interface EditUserProps {
  visible: boolean;
  onClose: () => void;
  user: User | any;
  onSave: (values: User) => void;
}

const EditUser: React.FC<EditUserProps> = ({
  visible,
  onClose,
  user,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    values.dob = values.dob ? values.dob.format("YYYY-MM-DD") : "";
    values.description = values.description || "";
    values.avatar_url = values.avatar_url || "";
    values.video_url = values.video_url || "";
    values.bank_name = values.bank_name || "";
    values.bank_account_no = values.bank_account_no || "";
    values.bank_account_name = values.bank_account_name || "";
    onSave(values);
    onClose();
  };

  return (
    <Modal
      title="Update User"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        initialValues={{
          name: user?.name || "",
          email: user?.email || "",
          phone_number: user?.phone_number || "",
          avatar_url: user?.avatar_url || "",
          video_url: user?.video_url || "",
          bank_name: user?.bank_name || "",
          bank_account_no: user?.bank_account_no || "",
          bank_account_name: user?.bank_account_name || "",
          dob: user?.dob || "",
          status: user?.status || false,
          role: user?.role,
          description: user?.description || "",
        }}
        onFinish={handleFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item name="name" label="Full name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="phone_number" label="Phone number">
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="instructor">Instructor</Option>
            <Option value="student">Student</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Satus" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser;
