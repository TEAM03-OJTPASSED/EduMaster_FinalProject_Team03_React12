import { Modal, Form, Input, Button } from "antd";
// import { createUser } from "../../../services/user.service";

interface CreateUserProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
}

const CreateUser: React.FC<CreateUserProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      // Call the API to create a new user
      const response = await createUser(values);
      if (response.success) {
        // If the API response is successful, trigger onSave
        onSave(response.data);
      } else {
        // Handle failure response accordingly (you might want to show an error message)
        console.error("Failed to create user:", response);
      }
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error accordingly (show a notification or message)
    }
  };

  return (
    <Modal title="Add User" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUser;
