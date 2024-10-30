
import { Button, Form, Upload, Input, Select, Image } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { FormProps, UploadFile, UploadProps } from "antd";
import "./CreateBlog.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CategoryService from "../../../services/category.service";
import { Category, GetCategories } from "../../../models/Category.model";
const { Option } = Select;

type BlogFieldType = {
  name: string;
  image_url: string;
  type: string;
  content: string;
  description: string
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
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [form] = Form.useForm<BlogFieldType>();
  const initialCategoriesParams: GetCategories = {
    pageInfo: {
      pageNum: 1,
      pageSize: 100,
    },
    searchCondition: {
      keyword: "",
      is_deleted: false,
    }
  }
  const fetchCategories = async () => {
    const categoriesResponse = await CategoryService.getCategories(initialCategoriesParams);
    setListCategories(categoriesResponse.data?.pageData ?? []);
  }
  useEffect(() => {
    fetchCategories();
    if (mode === "update" && initialValues) {
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

  // submit data
  const onFinish = (values: BlogFieldType) => {
    console.log("Success:", values);
    if (onFinished) {
      onFinished(values);
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
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter the blog name!" }]}
      >
        <Input placeholder="Enter blog name" />
      </Form.Item>
      {/* Description */}
      <Form.Item<BlogFieldType>
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter the blog description!" }]}
      >
        <Input.TextArea
          placeholder="Enter blog description"
          maxLength={500} // Adjust the character limit as needed
          showCount // Displays character count below TextArea
          allowClear // Adds a clear button to the TextArea
          rows={4} // Adjust the number of visible rows as needed
        />
      </Form.Item>
      {/* Title Image */}
      <Form.Item<BlogFieldType> label="Title Image" name="image_url">
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
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please select the blog type!" }]}
      >
        <Select placeholder="Select blog type">
          {listCategories.map((category) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* content */}
      <Form.Item<BlogFieldType>
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please enter the blog content!" }]}
      >
        <CKEditor
          editor={ClassicEditor}
          data={form.getFieldValue("content") || ""}
          onChange={(_, editor) => {
            const data = editor.getData();
            form.setFieldsValue({ content: data }); // Set CKEditor content to form field
          }}
          config={{
            placeholder: "Enter blog content...",
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

