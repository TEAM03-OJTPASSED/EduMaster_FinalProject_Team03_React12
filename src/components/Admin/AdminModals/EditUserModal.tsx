import { Modal, Form, Input, Select, Switch, Button, DatePicker } from "antd";
const { Option } = Select;

interface User {
  _id: string; // Thêm trường _id
  key: string;
  name: string;
  email: string;
  phone_number: string; // Cập nhật tên trường
  avatar_url?: string;
  video_url?: string;
  bank_name?: string;
  bank_account_no?: string;
  bank_account_name?: string;
  dob: string;
  status: boolean;
  role: string;
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
    onSave(values);
    onClose();
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
        initialValues={{
          ...user,
        }}
        onFinish={handleFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Số điện thoại"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar_url"
          label="URL Ảnh Đại Diện"
          rules={[{ required: false }]} // Không bắt buộc
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="video_url"
          label="URL Video"
          rules={[{ required: false }]} // Không bắt buộc
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bank_name"
          label="Tên Ngân Hàng"
          rules={[{ required: false }]} // Không bắt buộc
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bank_account_no"
          label="Số Tài Khoản"
          rules={[{ required: false }]} // Không bắt buộc
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bank_account_name"
          label="Tên Chủ Tài Khoản"
          rules={[{ required: false }]} // Không bắt buộc
        >
          <Input />
        </Form.Item>
        {/* <Form.Item name="dob" label="Ngày Sinh" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" disabled />
        </Form.Item> */}
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
