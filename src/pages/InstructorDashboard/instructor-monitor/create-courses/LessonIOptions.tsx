import React, { useCallback, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  Radio,
  Select,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Lesson, LessonTypeEnum } from "../../../../models/Lesson.model";
import { Session } from "../../../../models/Session.model";
import { Course } from "../../../../models/Course.model";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [visibility, setVisibility] = useState<
    "reading" | "video" | "assignment"
  >();
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
    if (lessonType === LessonTypeEnum.READING) {
      form.setFieldsValue({ video_url: "" });
      setVideoPreviewUrl(undefined);
      setVisibility("reading");
    } else if (lessonType === LessonTypeEnum.ASSIGNMENT) {
      form.setFieldsValue({ video_url: "" });
      setImageFileList([]);
      setVideoPreviewUrl(undefined);
      setVisibility("assignment");
    } else if (lessonType === LessonTypeEnum.VIDEO) {
      setImageFileList([]);
      setVisibility("video");
    }
  };

  useEffect(() => {
    if (initialValues?.course_id) {
      handleCourseChange(initialValues.course_id);
    }
  }, [handleCourseChange, initialValues]);

  //Huko additional code
  const { Option } = Select;

  const [questions, setQuestions] = useState<
    {
      id: number;
      type: string;
      question: string;
      options: string[];
      correctAnswers: any[];
    }[]
  >([
    {
      id: 1,
      type: "single_choice",
      question: "",
      options: ["", ""],
      correctAnswers: [],
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        type: "single_choice",
        question: "",
        options: ["", ""],
        correctAnswers: [],
      },
    ]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (id, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, question: value } : q))
    );
  };

  const handleTypeChange = (id, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          const correctAnswers =
            value === "single_choice" && q.correctAnswers.length > 0
              ? [q.correctAnswers[0]]
              : q.correctAnswers;
          return { ...q, type: value, correctAnswers };
        }
        return q;
      })
    );
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
              correctAnswers: q.correctAnswers.map((ans) =>
                ans === q.options[optionIndex] ? value : ans
              ),
            }
          : q
      )
    );
  };

  const addOption = (questionId) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const removeOption = (questionId, optionIndex) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((_, idx) => idx !== optionIndex),
            }
          : q
      )
    );
  };

  const handleCorrectAnswerChange = (questionId, optionValue) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          if (q.type === "single_choice") {
            return { ...q, correctAnswers: [optionValue] };
          } else {
            const newCorrectAnswers = q.correctAnswers.includes(optionValue)
              ? q.correctAnswers.filter((val) => val !== optionValue)
              : [...q.correctAnswers, optionValue];
            return { ...q, correctAnswers: newCorrectAnswers };
          }
        }
        return q;
      })
    );
  };

  const handleConsoleLog = () => {
    console.log("Current Questions State:", questions);
  };
  // Huko additional code
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
              { label: "Reading", value: LessonTypeEnum.READING },
              { label: "Assignment", value: LessonTypeEnum.ASSIGNMENT },
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
        <div className="space-y-4 pr-4">
          {visibility === LessonTypeEnum.READING && (
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
          )}
          <div className="flex justify-around">
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
                {videoPreviewUrl && (
                  <video
                    src={videoPreviewUrl}
                    controls
                    className="w-full rounded-lg"
                  />
                )}
              </Form.Item>
            )}

            {visibility === LessonTypeEnum.ASSIGNMENT && (
              <div className="h-[70vh] w-full overflow-y-scroll">
                <Form>
                  {questions.map((q) => (
                    <div>
                      <div key={q.id} className="mb-4">
                        <div className="flex justify-between items-center">
                          <div className="text-lg">Question {q.id}</div>
                          <Select
                            value={q.type}
                            onChange={(value) => handleTypeChange(q.id, value)}
                            className="w-1/5 mb-2"
                          >
                            <Option value="single_choice">Single Choice</Option>
                            <Option value="multiple_choice">
                              Multiple Choice
                            </Option>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-full mb-2">
                            <ReactQuill
                              value={q.question}
                              onChange={(content) =>
                                handleQuestionChange(q.id, content)
                              }
                              placeholder="Enter your question"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Tooltip title="Correct Answer">
                            <QuestionCircleOutlined className="text-md" />
                          </Tooltip>
                          <div>Answer</div>
                        </div>
                        {q.options.map((option, idx) => (
                          <div key={idx} className="flex items-center mb-2">
                            {q.type === "single_choice" ? (
                              <Radio
                                checked={q.correctAnswers.includes(option)}
                                onChange={() =>
                                  handleCorrectAnswerChange(q.id, option)
                                }
                              />
                            ) : (
                              <Checkbox
                                checked={q.correctAnswers.includes(option)}
                                onChange={() =>
                                  handleCorrectAnswerChange(q.id, option)
                                }
                                className="mr-2"
                              />
                            )}
                            <Input
                              placeholder={`Option ${idx + 1}`}
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(q.id, idx, e.target.value)
                              }
                            />
                            {q.options.length > 2 && (
                              <Button
                                danger
                                onClick={() => removeOption(q.id, idx)}
                                icon={<MinusCircleOutlined />}
                                className="ml-2"
                              />
                            )}
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => addOption(q.id)}
                          icon={<PlusOutlined />}
                          className="w-full mb-2"
                        >
                          Add Option
                        </Button>
                        <Button
                          danger
                          onClick={() => removeQuestion(q.id)}
                          icon={<MinusCircleOutlined />}
                          className="w-full"
                        >
                          Remove Question
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={addQuestion}
                    icon={<PlusOutlined />}
                    className="w-full"
                  >
                    Add Question
                  </Button>
                  <Button
                    type="primary"
                    className="w-full mt-4"
                    onClick={() => handleConsoleLog()}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LessonIOptions;
