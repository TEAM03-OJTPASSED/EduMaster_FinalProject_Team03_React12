
import { Button, Form, Upload, Input, Select, Image, message } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import "./CreateBlog.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CategoryService from "../../../services/category.service";
import { Category, GetCategories } from "../../../models/Category.model";
import { BlogRequest } from "../../../models/Blog.model";
import BlogService from "../../../services/blog.service";
const { Option } = Select;

type BlogFormProps = {
  initialValues?: BlogRequest;
  onSuccess?: () => void; // Add a success callback prop
};

const CreateBlog: React.FC<BlogFormProps> = ({
  initialValues,
  onSuccess,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [form] = Form.useForm<BlogRequest>();

  const initialCategoriesParams: GetCategories = {
    pageInfo: {
      pageNum: 1,
      pageSize: 100,
    },
    searchCondition: {
      keyword: "",
      is_deleted: false,
    },
  };

  const fetchCategories = async () => {
    const categoriesResponse = await CategoryService.getCategories(initialCategoriesParams);
    setListCategories(categoriesResponse.data?.pageData ?? []);
  };

  useEffect(() => {
    fetchCategories();
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        content: initialValues.content,
      });
      setPreviewImage(initialValues.image_url);
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

  const onFinish = async (values: BlogRequest) => {
    values.image_url = "https://picsum.photos/id/237/200/300";
    try {
      const response = await BlogService.createBlog(values); // Create the blog using BlogService
      if (response && response.success && onSuccess) {
        message.success("Blog created successfully");
        onSuccess();
        form.resetFields(); // Reset form fields
        setFileList([]); // Clear uploaded files
        setPreviewImage(null); // Clear preview image
        return response.data; // Trả về dữ liệu người dùng đã được cập nhật 
      } else {
        message.error("Failed to create blog"); // Hiển thị thông báo lỗi
        return null; // Trả về null khi không thành công
      }

    } catch (error) {
      console.error("Error create blog:", error);
      message.error("An error occurred while creating the blog."); // Thông báo lỗi chung
      return null; // Đảm bảo trả về null trong trường hợp có lỗi
    }
  };


  return (
    <Form
      form={form}
      name="create-blog"
      onFinish={onFinish}
      layout="vertical"
      style={{ display: "flex", height: "100%" }}
    >
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
          <Input.TextArea placeholder="Enter blog description" maxLength={500} showCount allowClear rows={4} />
        </Form.Item>

        <Form.Item label="Title Image" name="image_url">
          <Upload
            action="https://your-api-server.com/admin/upload"
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
            fileList={fileList}
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

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Blog
          </Button>
        </Form.Item>
      </div>

      {/* Right Section - CKEditor */}
      <div style={{ flex: 1, paddingLeft: "16px", overflowY: "auto" }}>
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

