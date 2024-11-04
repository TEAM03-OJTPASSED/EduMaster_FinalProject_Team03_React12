import React, { useEffect } from "react";
import { Button, Form, Input, Row, Col, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface UserProfileFormProps {
  currentUser: UserProfile;
  onSave: (values: UserProfile) => void;
}

export type UserProfile = {
  name?: string;
  email?: string;
  description?: string;
  avatar_url?: string | null;
  video_url?: string;
  phone_number?: string;
  bank_name?: string;
  bank_account_no?: string;
  bank_account_name?: string;
};

const UserProfileForm: React.FC<UserProfileFormProps> = ({ currentUser, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        avatar_url: currentUser.avatar_url
          ? [
              {
                uid: "-1",
                url: currentUser.avatar_url,
                name: "avatar.jpg",
                status: "done",
              },
            ]
          : [],
        name: currentUser.name || "",
        phone_number: currentUser.phone_number || "",
        bank_account_no: currentUser.bank_account_no || "",
        description: currentUser.description || "",
        email: currentUser.email || "",
        bank_name: currentUser.bank_name || "",
        bank_account_name: currentUser.bank_account_name || "",
        video_url: currentUser.video_url || "",
      });
    }
  }, [currentUser, form]);

  const handleSubmit = () => {
    const formValues = form.getFieldsValue([
      "name",
      "avatar_url",
      "phone_number",
      "bank_account_no",
      "description",
      "email",
      "bank_name",
      "bank_account_name",
      "video_url",
    ]);

    const processedValues: UserProfile = {
      name: formValues.name || "",
      email: formValues.email || "",
      description: formValues.description || "",
      avatar_url: formValues.avatar_url && formValues.avatar_url.length > 0
        ? formValues.avatar_url[0].url
        : null,
      video_url: formValues.video_url || "",
      phone_number: formValues.phone_number || "",
      bank_name: formValues.bank_name || "",
      bank_account_no: formValues.bank_account_no || "",
      bank_account_name: formValues.bank_account_name || "",
    };

    onSave(processedValues);
  };

  return (
    <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="horizontal">
      <Form.Item label="Avatar" name="avatar_url" valuePropName="fileList">
        <Upload accept="image/*" listType="picture-card">
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input placeholder="Full Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Bank Account" name="bank_account_no" rules={[{ required: true, message: "Please enter your bank account number" }]}>
            <Input placeholder="Bank Account" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Phone Number" name="phone_number" rules={[{ required: true, message: "Please enter your phone number" }]}>
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Bank Name" name="bank_name">
            <Input placeholder="Bank Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Bank Account Name" name="bank_account_name">
            <Input placeholder="Bank Account Name" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Description" name="description">
        <CKEditor
          editor={ClassicEditor}
          data={currentUser.description || ""}
          onChange={(_, editor) => {
            const data = editor.getData();
            form.setFieldsValue({ description: data });
          }}
          config={{ placeholder: "Enter your description..." }}
        />
      </Form.Item>

      <div className="pt-4">
        <Button type="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default UserProfileForm;
