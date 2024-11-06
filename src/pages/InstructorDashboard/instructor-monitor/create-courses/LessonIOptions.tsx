import React, { useCallback, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Button,
  Form,
  FormProps,
  Input,
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
  const [visibility, setVisibility] = useState<"text" | "image" | "video">();
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

  const handleImageChange: UploadProps["onChange"] = ({
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
      const uploadVideoUrl = newFileList[0].response?.secure_url;
      setVideoPreviewUrl(uploadVideoUrl); // Set the preview URL
      form.setFieldsValue({ video_url: uploadVideoUrl });
    } else {
      setVideoPreviewUrl(undefined);
      form.setFieldsValue({ video_url: "" });
    }
  };

  const handleCourseChange = useCallback(
    (courseId: string) => {
      form.setFieldsValue({
        session_id: initialValues?.session_id ?? undefined,
      }); // Reset session selection
      const filtered = listSessions.filter(
        (session) => session.course_id === courseId
      );
      setFilteredSessions(filtered);
    },
    [form, listSessions, setFilteredSessions, initialValues]
  );

  const handleLessonType = () => {
    const lessonType = form.getFieldValue("lesson_type") as LessonTypeEnum;
    if (lessonType === LessonTypeEnum.IMAGE) {
      form.setFieldsValue({ video_url: "" });
      setVideoPreviewUrl(undefined);
      setVisibility("image");
    } else if (lessonType === LessonTypeEnum.TEXT) {
      form.setFieldsValue({ image_url: "" });
      form.setFieldsValue({ video_url: "" });
      setImageFileList([]);
      setVideoPreviewUrl(undefined);
      setVisibility("text");
    } else if (lessonType === LessonTypeEnum.VIDEO) {
      form.setFieldsValue({ image_url: "" });
      setImageFileList([]);
      setVisibility("video");
    }
  };

  useEffect(() => {
    if (initialValues?.course_id) {
      handleCourseChange(initialValues.course_id);
    }
  }, [handleCourseChange, initialValues]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinished}
      className="flex flex-col lg:flex-row gap-6 lg:min-h-[calc(100vh-360px)]" // Adjust the 120px based on your header/footer
    >
      {/* Left Column - Basic Course Info - Static */}
      <div className="lg:w-2/5 space-y-4">
        <Form.Item
          label="Lesson Name"
          name="name"
          rules={[{ required: true, message: "Please input lesson name" }]}
        >
          <Input placeholder="Lesson Name" />
        </Form.Item>

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

        <Form.Item
          label="Lesson Type"
          name="lesson_type"
          rules={[{ required: true, message: "Please select lesson type" }]}
        >
          <Select
            onChange={() => handleLessonType()}
            placeholder="Lesson Type"
            options={[
              { label: "Video", value: LessonTypeEnum.VIDEO },
              { label: "Image", value: LessonTypeEnum.IMAGE },
              { label: "Text", value: LessonTypeEnum.TEXT },
            ]}
          />
        </Form.Item>

        <div className="flex gap-4">
          <Form.Item
            label="Time (minutes)"
            name="full_time"
            rules={[{ required: true, message: "Please input full time" }]}
            normalize={(value) => (value ? Number(value) : value)}
            className="flex-1"
          >
            <Input type="number" placeholder="Input lesson time" />
          </Form.Item>

          <Form.Item
            label="Position Order"
            name="position_order"
            rules={[{ required: true, message: "Please input position order" }]}
            normalize={(value) => (value ? Number(value) : value)}
            className="flex-1"
          >
            <Input type="number" placeholder="Input Position Order" />
          </Form.Item>
        </div>

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
      </div>

      {/* Right Column - Content and Media - Scrollable */}
      <div className="lg:w-3/5 h-full overflow-y-auto">
        <div className="space-y-4 pr-4"> {/* Added padding-right for scrollbar */}
          <Form.Item
            label="Content"
            name="description"
            rules={[{ required: true, message: "Please input description" }]}
          >
            <CKEditor
              editor={ClassicEditor}
              data={form.getFieldValue("description") || ""}
              onChange={(_, editor) =>
                form.setFieldsValue({ description: editor.getData() })
              }
            />
          </Form.Item>

          <div className="flex justify-around">
            {visibility === LessonTypeEnum.IMAGE && (
              <Form.Item 
                label="Lesson Image" 
                name="image_url"
                rules={[{ required: true, message: "Please input image" }]}
              >
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
                      <PlusOutlined className="h-5 w-5" />
                      <div>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            )}

            {visibility === LessonTypeEnum.VIDEO && (
              <Form.Item 
                label="Lesson Video" 
                name="video_url"
                rules={[{ required: true, message: "Please input video" }]}
              >
                <div className="space-y-4">
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
                        <PlusOutlined className="h-5 w-5" />
                        <div>Upload</div>
                      </div>
                    )}
                  </Upload>
                </div>
              </Form.Item>
            )}
          </div>

          {videoPreviewUrl && (
            <video
              src={videoPreviewUrl}
              controls
              className="w-full rounded-lg"
            />
          )}
        </div>
      </div>
    </Form>
  );
};

export default LessonIOptions;
