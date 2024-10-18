import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Course } from "../../../AdminDashboard/monitors/course/courseList";

type CourseInformationProps = {
  initializeValue?: Course;
  mode: "create" | "update";
  onFinished: FormProps["onFinish"];
};

type CoursePriceType = "Free" | "Paid";
//nhan nut create thi no se la status new
// Sau khi send admin thi status cap nhat la approving

const CourseOption: React.FC<CourseInformationProps> = ({
  initializeValue,
  mode,
  onFinished,
}) => {
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);

  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | undefined>(
    initializeValue?.video_url
  );

  const [selectTypePrice, setSelectPriceType] = useState<CoursePriceType>(
    initializeValue?.price && initializeValue.price > 0 ? "Paid" : "Free"
  );

  const [form] = Form.useForm<Course>();

  useEffect(() => {
    if (initializeValue && mode === "update") {
      setImageFileList(
        initializeValue?.image_url
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: initializeValue.image_url,
              },
            ]
          : []
      );
      setVideoFileList(
        initializeValue?.video_url
          ? [
              {
                uid: "-1",
                name: "video.mp4",
                status: "done",
                url: initializeValue.video_url,
              },
            ]
          : []
      );
      form.setFieldsValue({
        ...initializeValue,
        content: initializeValue.content,
      });
    }
  }, [initializeValue, form, mode]);

  const handleImageChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setImageFileList(newFileList || []);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedImageUrl = newFileList[0].response?.secure_url;
      form.setFieldsValue({ image_url: uploadedImageUrl });
    } else {
      form.setFieldsValue({ image_url: "" });
    }
  };
  const handleVideoChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setVideoFileList(newFileList || []);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedVideoUrl = newFileList[0].response?.secure_url;
      setVideoPreviewUrl(uploadedVideoUrl);
      form.setFieldsValue({ video_url: uploadedVideoUrl });
    } else {
      setVideoPreviewUrl(undefined);
      form.setFieldsValue({ video_url: "" });
    }
  };

  const handleSelectPrice = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setSelectPriceType(value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initializeValue}
      onFinish={onFinished}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Course Name"
            name="name"
            rules={[{ required: true, message: "Please input course name" }]}
          >
            <Input placeholder="Course Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select category"
              options={[
                { label: "Javascript", value: "category_id-1" },
                { label: "TypeScript", value: "category_id-2" },
                { label: "Machine Learning", value: "category_id-3" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input description" }]}
      >
        <Input.TextArea
          maxLength={200}
          style={{ height: "100px" }}
          placeholder="Course description"
        />
      </Form.Item>
      <Form.Item label="Content" name="content">
        <CKEditor
          editor={ClassicEditor}
          data={form.getFieldValue("content") || ""}
          onChange={(_, editor) =>
            form.setFieldsValue({ content: editor.getData() })
          }
        />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Course Image" name="image_url">
            <Upload
              action="https://api.cloudinary.com/v1_1/dz2dv8lk4/upload?upload_preset=edumaster1"
              accept="image/*"
              listType="picture-card"
              fileList={imageFileList}
              onChange={handleImageChange}
              maxCount={1}
            >
              {imageFileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Course Video" name="video_url">
            <Upload
              action="https://api.cloudinary.com/v1_1/dz2dv8lk4/upload?upload_preset=edumaster1"
              accept="video/*"
              listType="picture-card"
              fileList={videoFileList}
              onChange={handleVideoChange}
              maxCount={1}
            >
              {videoFileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div>Upload</div>
                </div>
              )}
            </Upload>
            {videoPreviewUrl && (
              <video
                src={videoPreviewUrl}
                controls
                style={{ width: "100%", marginTop: "16px" }}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      {/* Course Type Price */}
      <Form.Item
        label="Course Price"
        rules={[{ required: true, message: "Please select course price type" }]}
      >
        <Radio.Group onChange={handleSelectPrice} value={selectTypePrice}>
          <Radio value="Free"> Free </Radio>
          <Radio value="Paid"> Paid </Radio>
        </Radio.Group>
      </Form.Item>

      {/* hidden when type free */}
      {selectTypePrice === "Free" && (
        <div>
          <Form.Item name="price" hidden>
            <Input type="number" value={0} />
          </Form.Item>
          <Form.Item name="discount" hidden>
            <Input type="number" value={0} />
          </Form.Item>
        </div>
      )}

      {selectTypePrice === "Paid" && (
        <div>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price" }]}
          >
            <Input type="number" placeholder="Input price" />
          </Form.Item>
          {/* discount */}
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Please input discount" }]}
          >
            <Input type="number" placeholder="Input discount" />
          </Form.Item>
        </div>
      )}
      {/* Button Submit */}
      <Form.Item>
        <Button
          className="w-full"
          variant="solid"
          color="primary"
          htmlType="submit"
        >
          Change
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseOption;
