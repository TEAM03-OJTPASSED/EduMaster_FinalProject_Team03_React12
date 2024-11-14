// createCategory.tsx
import { Modal, Form, Input, Select, Button } from "antd";
import { FC } from "react";
import CategoryService from "../../../services/category.service";

const { Option } = Select;

interface CreateCategoryProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
}

const CreateCategory: FC<CreateCategoryProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    const response = await CategoryService.createCategory(values);
    if (response.success) onSave(response.data);
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      title="Add New Categorie"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter description" rows={3} />
        </Form.Item>

        <Form.Item label="Parent Category" name="parent_category_id">
          <Select placeholder="Select a parent category">
            <Option value="parent1">N/A</Option>
            <Option value="parent2">Music</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategory;
