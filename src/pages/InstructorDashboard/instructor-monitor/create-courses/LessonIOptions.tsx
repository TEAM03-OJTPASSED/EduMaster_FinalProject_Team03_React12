import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Lesson, LessonTypeEnum } from "../../../../models/Lesson.model";
import { Session } from "../../../../models/Session.model";
import { Course } from "../../../../models/Course.model";

type LessonOptionsProps = {
  initialValues?: Lesson;
  mode: "create" | "update";
  onFinished: FormProps["onFinish"];
  listSessions: Session[];
  listCourses: Course[];
  isLoading: boolean;
};

const LessonIOptions: React.FC<LessonOptionsProps> = ({
  initialValues,
  mode,
  onFinished,
  listCourses,
  listSessions,
  isLoading,
}) => {
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm<Lesson>();
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | undefined>(
    initialValues?.video_url
  );
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);

  useEffect(() => {
    if (mode === "update") {
      form.setFieldsValue({
        ...initialValues,
        description: initialValues?.description,
      });
      setImageFileList(
        initialValues?.image_url
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: initialValues.image_url,
              },
            ]
          : []
      );
      setVideoFileList(
        initialValues?.video_url
          ? [
              {
                uid: "-1",
                name: "video.mp4",
                status: "done",
                url: initialValues.video_url,
              },
            ]
          : []
      );
      setVideoPreviewUrl(initialValues?.video_url);
    }
  }, [initialValues, form, mode]);

  const handleImageChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setImageFileList(newFileList || []);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedImageUrl = newFileList[0].response?.secure_url;
      form.setFieldsValue({ image_url: uploadedImageUrl });
    } else {
      form.setFieldsValue({ image_url: "" });
    }
  };

  const handleVideoChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setVideoFileList(newFileList || []);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadVideoUrl = newFileList[0].response?.secure_url;
      setVideoPreviewUrl(uploadVideoUrl); // Set the preview URL
      form.setFieldsValue({ video_url: uploadVideoUrl });
    } else {
      setVideoPreviewUrl(undefined);
      form.setFieldsValue({ video_url: "" });
    }
  };

  const handleCourseChange = (courseId: string) => {
    form.setFieldsValue({ session_id: undefined }); // Reset session selection
    const filtered = listSessions.filter(session => session.course_id === courseId);
    setFilteredSessions(filtered);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinished}
    >
      {/* Lesson name */}
      <Form.Item
        label="Lesson Name"
        name="name"
        rules={[{ required: true, message: "Please input lesson name" }]}
      >
        <Input placeholder="Lesson Name" />
      </Form.Item>

      <Form.Item
        label="Lesson Type"
        name="lesson_type"
        rules={[{ required: true, message: "Please select lesson type" }]}
      >
        <Select
          placeholder="Lesson Type"
          options={[
            { label: "Video", value: LessonTypeEnum.VIDEO },
            { label: "Image", value: LessonTypeEnum.IMAGE },
            { label: "Text", value: LessonTypeEnum.TEXT },
          ]}
        />
      </Form.Item>

      {/* Course Name */}
      <Form.Item
        label="Course Name"
        name="course_id"
        rules={[{ required: true, message: "Please select a Course Name" }]}
      >
        <Select
          placeholder="Select Course"
          options={listCourses.map((course) => ({
            label: course.name,
            value: course._id,
          }))}
          onChange={handleCourseChange}
        />
      </Form.Item>

      {/* Session Name */}
      <Form.Item
        label="Session Name"
        name="session_id"
        rules={[{ required: true, message: "Please select a Session Name" }]}
      >
        <Select
          placeholder="Select Session"
          options={filteredSessions.map((session) => ({
            label: session.name,
            value: session._id,
          }))}
        />
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input description" }]}
      >
        <CKEditor
          editor={ClassicEditor}
          data={form.getFieldValue("description") || ""}
          onChange={(_, editor) => form.setFieldsValue({ description: editor.getData() })}
        />
      </Form.Item>

      {/* Image and Video */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Lesson Image" name="image_url">
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
          <Form.Item label="Lesson Video" name="video_url">
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

      {/* Fulltime */}
      <Form.Item
        label="Time (minutes)"
        name="full_time"
        rules={[{ required: true, message: "Please input full time" }]}
      >
        <Input type="number" placeholder="Input lesson time" />
      </Form.Item>

      {/* Position */}
      <Form.Item
        label="Position Order"
        name="position_order"
        rules={[{ required: true, message: "Please input position order" }]}
      >
        <Input type="number" placeholder="Input Position Order" />
      </Form.Item>

      {/* Button Submit */}
      <Form.Item>
        <Button
          className="w-full"
          variant="solid"
          color="primary"
          htmlType="submit"
          loading={isLoading}
        >
          {mode === "create" ? "Create" : "Update"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LessonIOptions;
