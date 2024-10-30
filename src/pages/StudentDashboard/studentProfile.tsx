import { Button, Card, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const StudentProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const [formData, setFormData] = useState({
    avatar: "",
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    description: "",
  });

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: currentUser.name,
      avatar_url: currentUser.avatar_url,
      phone_number: currentUser.phone_number,
      description: currentUser.description,
      bank_account_no: currentUser.bank_account_no,
    });
  }, []);
  return (
    <Card>
      <div>
        <h3 className="text-2xl mt-5">Profile</h3>
        <h5 className="mb-4">Here is your information</h5>
      </div>
      <Form
        // initialValues={{ image_url: currentUser.avatar_url,fullName:currentUser.name }}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
      >
        <Form.Item label="Avatar" name="avatar_url" valuePropName="fileList">
          <Upload accept="image/*" listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: " " }]}
        >
          <Input
            placeholder="Full Name"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[{ required: true, message: " " }]}
        >
          <Input
            placeholder="Phone Number"
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Bank account"
          name="bank_account_no"
          rules={[{ required: true, message: " " }]}
        >
          <Input
            placeholder="Bank account"
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <CKEditor
            editor={ClassicEditor}
            onChange={(_, editor) => {
              const data = editor.getData();
              setFormData({ ...formData, description: data });
            }}
            config={{ placeholder: "Enter course content..." }}
          />
        </Form.Item>
      </Form>
      <div className="pt-4">
        <Button type="primary">Save Changes</Button>
      </div>
    </Card>
  );
};

export default StudentProfile;
