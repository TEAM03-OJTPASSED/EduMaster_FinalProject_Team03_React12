import { Button, Form, Input, UploadProps, Select, Image } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react"; // CKEditor component
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // CKEditor build

const { Option } = Select;

type BlogFieldType = {
  title: string;
  title_image: string;
  type: string;
  content: string;
};

const CreateBlog: React.FC = () => {
  const [content, setContent] = useState<string>(""); // CKEditor content state
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Image preview state
  const [previewOpen, setPreviewOpen] = useState<boolean>(false); // Modal visibility

  // Upload properties with image preview logic


  const onFinish = (values: BlogFieldType) => {
    console.log("Success:", { ...values, content });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="create-blog"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* Title */}
      <Form.Item<BlogFieldType>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter the blog title!" }]}
      >
        <Input placeholder="Enter blog title" />
      </Form.Item>

      {/* Title Image with Dragger */}
      <Form.Item<BlogFieldType> label="Title Image" name="title_image">
      
      </Form.Item>

      {/* Select Type */}
      <Form.Item<BlogFieldType>
        label="Blog Type"
        name="type"
        rules={[{ required: true, message: "Please select the blog type!" }]}
      >
        <Select placeholder="Select blog type">
          <Option value="news">News</Option>
          <Option value="tutorial">Tutorial</Option>
          <Option value="opinion">Opinion</Option>
        </Select>
      </Form.Item>

      {/* Content */}
      <Form.Item<BlogFieldType>
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please enter the blog content!" }]}
      >
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
          config={{
            placeholder: "Enter blog content...",
          }}
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit Blog
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBlog;
