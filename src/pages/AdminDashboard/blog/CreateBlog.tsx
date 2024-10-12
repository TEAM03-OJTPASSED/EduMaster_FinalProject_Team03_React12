import { Button, Form, Upload, Input, Select, Image } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { FormProps, UploadFile, UploadProps } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./CreateBlog.css";
const { Option } = Select;

type BlogFieldType = {
  title: string;
  title_image: string;
  type: string;
  content: string;
};

type BlogFormProps = {
  initialValues?: BlogFieldType;
  mode: "create" | "update";
  onFinished: FormProps<BlogFieldType>["onFinish"];
};

const CreateBlog: React.FC<BlogFormProps> = ({
  initialValues,
  mode,
  onFinished,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [form] = Form.useForm<BlogFieldType>();

  useEffect(() => {
    if (mode === "update" && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        content: initialValues.content,
      });
      setPreviewImage(initialValues.title_image);
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: initialValues.title_image,
        },
      ]);
    }
  }, [initialValues, form, mode]);

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0];
      setPreviewImage(file.url || (file.preview as string));
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinish = (values: BlogFieldType) => {
    console.log("Success:", values);
    if (onFinished) {
      onFinished(values); // Pass form values to parent component
    }
  };

  return (
    <Form
      form={form}
      name="create-blog"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
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

      {/* Title Image */}
      <Form.Item<BlogFieldType> label="Title Image" name="title_image">
        <Upload
          action="https://your-api-server.com/admin/upload"
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
          fileList={fileList}
          style={{ width: "100%" }}
          maxCount={1}
        >
          {fileList.length > 0 ? null : uploadButton}
        </Upload>

        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </Form.Item>
      {/* Blog Type */}
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
          data={form.getFieldValue("content") || ""}
          onChange={(event, editor) => {
            const data = editor.getData();
            form.setFieldsValue({ content: data }); // Set CKEditor content to form field
          }}
          config={{
            placeholder: "Enter blog content...",
          }}
          onReady={(editor) => {
            const editableElement = editor.ui.view.editable.element;
            if (editableElement) {
              editableElement.style.minHeight = "1000px";
            }
          }}
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {mode === "create" ? "Create Blog" : "Update Blog"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBlog;
