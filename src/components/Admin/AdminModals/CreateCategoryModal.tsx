// createCategory.tsx
import { Modal, Form, Input, Select } from "antd";
import { FC } from "react";

const { Option } = Select;

interface CreateCategoryProps {
  visible: boolean;
  onCreate: () => void;
  onCancel: () => void;
  form: any;
}

const CreateCategory: FC<CreateCategoryProps> = ({
  visible,
  onCreate,
  onCancel,
  form,
}) => {
  return (
    <Modal
      title="Create Category"
      visible={visible}
      onOk={onCreate}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[{ required: true, message: "Please input the category name!" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={3} />
        </Form.Item>

        <Form.Item
          label="Parent Category"
          name="parentCategory"
          rules={[{ required: true, message: "Please select a parent category!" }]}
        >
          <Select placeholder="Select a parent category">
            <Option value="parent1">N/A</Option>
            <Option value="parent2">Music</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategory;
