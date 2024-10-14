// updateCategory.tsx
import { Modal, Form, Input } from "antd";
import { FC } from "react";

interface UpdateCategoryProps {
  visible: boolean;
  onUpdate: () => void;
  onCancel: () => void;
  form: any;
}

const UpdateCategory: FC<UpdateCategoryProps> = ({
  visible,
  onUpdate,
  onCancel,
  form,
}) => {
  return (
    <Modal
      title="Edit Category"
      visible={visible}
      onOk={onUpdate}
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
      </Form>
    </Modal>
  );
};

export default UpdateCategory;
