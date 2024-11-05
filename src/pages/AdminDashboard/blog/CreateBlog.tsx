import { Button, Form, Upload, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CategoryService from "../../../services/category.service";
import { Category } from "../../../models/Category.model";
import { BlogRequest } from "../../../models/Blog.model";
import BlogService from "../../../services/blog.service";
import { API_UPLOAD_FILE } from "../../../constants/upload";
const { Option } = Select;

type BlogFormProps = {
  initialValues?: BlogRequest;
  onSuccess?: () => void;
};

const CreateBlog: React.FC<BlogFormProps> = ({ initialValues, onSuccess }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [form] = Form.useForm<BlogRequest>();

  const fetchCategories = async () => {
    const categoriesResponse = await CategoryService.getCategories({
      pageInfo: { pageNum: 1, pageSize: 100 },
      searchCondition: { keyword: "", is_deleted: false },
    });
    setListCategories(categoriesResponse.data?.pageData ?? []);
  };

  useEffect(() => {
    fetchCategories();
    if (initialValues) {
      form.setFieldsValue({ ...initialValues, content: initialValues.content });
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: initialValues.image_url,
        },
      ]);
    }
  }, [initialValues, form]);

  const handleImageChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedImageUrl = newFileList[0].response?.secure_url;
      form.setFieldsValue({ image_url: uploadedImageUrl });
      console.log("image url:", uploadedImageUrl)
    } else if (newFileList.length === 0 || newFileList[0].status === "error") {
      form.setFieldsValue({ image_url: "" });
    }
  };

  const onFinish = async (values: BlogRequest) => {
    try {
      const response = await BlogService.createBlog(values);
      if (response?.success && onSuccess) {
        message.success("Blog created successfully");
        onSuccess();
        form.resetFields();
        setFileList([]);
      } else {
        message.error("Failed to create blog");
      }
    } catch (error) {
      message.error("An error occurred while creating the blog.");
    }
  };

  return (
    <Form form={form} name="create-blog" onFinish={onFinish} layout="vertical" style={{ display: "flex", height: "100%" }}>
      {/* Left Section */}
      <div style={{ flex: 1, paddingRight: "16px", overflowY: "auto" }}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter the blog name!" }]}>
          <Input placeholder="Enter blog name" />
        </Form.Item>

        <Form.Item label="Type" name="category_id" rules={[{ required: true, message: "Please select the blog type!" }]}>
          <Select placeholder="Select blog type">
            {listCategories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter the blog description!" }]}>
          <Input.TextArea placeholder="Enter blog description" maxLength={1000} rows={2} />
        </Form.Item>

        <Form.Item label="Title Image" name="image_url">
          <Upload
            action={API_UPLOAD_FILE}
            listType="picture-card"
            onChange={handleImageChange}
            fileList={fileList}
            maxCount={1}
          >
            {fileList.length < 1 && (
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div>Upload</div>
              </button>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Blog
          </Button>
        </Form.Item>
      </div>

      {/* CKEditor Section */}
      <div style={{ flex: 1, paddingLeft: "16px" }}>
        <Form.Item label="Content" name="content" rules={[{ required: true, message: "Please enter the blog content!" }]}>
          <CKEditor
            editor={ClassicEditor}
            data={form.getFieldValue("content") || ""}
            onChange={(_, editor) => {
              const data = editor.getData();
              form.setFieldsValue({ content: data });
            }}
            config={{
              placeholder: "Enter blog content...",
              ckfinder: {
                uploadUrl: "/your-upload-endpoint", // Replace with your image upload endpoint
              },
            }}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateBlog;

