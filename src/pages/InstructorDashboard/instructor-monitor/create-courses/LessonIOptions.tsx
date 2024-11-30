import React, { useCallback, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormInstance,
  FormProps,
  Input,
  Radio,
  Row,
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
import { Question } from "../../../../models/Question.model";
import ReactPlayer from "react-player";
import { API_UPLOAD_FILE } from "../../../../constants/api/upload";
import { handleNotify } from "../../../../utils/handleNotify";
import { uploadCustomRequest } from "../../../../utils/uploadCustomReuquest";

type LessonOptionsProps = {
  initialValues?: Lesson;
  mode: "create" | "update";
  onFinished: FormProps["onFinish"];
  listSessions: Session[];
  listCourses: Course[];
  onCourseChange: (value: string) => void;
  form: FormInstance<Lesson>
};

const LessonIOptions: React.FC<LessonOptionsProps> = ({
  initialValues,
  mode,
  onFinished,
  listCourses,
  listSessions,
  onCourseChange,
  form
}) => {
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
  const [visibility, setVisibility] = useState<
    "reading" | "video" | "assignment" | "image"
  >("reading");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | undefined>(
    initialValues?.video_url
  );

  useEffect(() => {
    if (mode === "update") {
      form.setFieldsValue({
        ...initialValues,
        description: initialValues?.description,
        session_id: initialValues?.session_id,
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
        session_id: undefined,
      }); // Reset session selection
      onCourseChange(courseId);
    },
    [form, initialValues]
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
    } else if (lessonType === LessonTypeEnum.IMAGE) {
      setImageFileList([]);
      setVisibility("image");
    }
  };

  useEffect(() => {
    if (initialValues?.course_id) {
      handleCourseChange(initialValues.course_id);
      form.setFieldsValue({ session_id: initialValues.session_id });
    }
  }, [handleCourseChange, initialValues, form]);

  //Huko additional code
  const { Option } = Select;
  const [questions, setQuestions] = useState<Question[]>([
    {
      _id: "1",
      question_type: "single_choice",
      question: "",
      answer: ["", ""],
      correct_answer: [],
      is_deleted: false,
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        _id: (questions.length + 1).toString(),
        question_type: "single_choice",
        question: "",
        answer: ["", ""],
        correct_answer: [],
        is_deleted: false,
      },
    ]);
  };

  const removeQuestion = (_id: string) => {
    setQuestions(questions.filter((q) => q._id !== _id));
  };

  const handleQuestionChange = (_id: string, value: string) => {
    setQuestions(
      questions.map((q) => (q._id === _id ? { ...q, question: value } : q))
    );
  };

  const handleTypeChange = (questionId: string, newType: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q._id === questionId) {
          return {
            ...q,
            question_type: newType,
            correct_answer: newType === "single_choice" ? [] : q.correct_answer,
          };
        }
        return q;
      })
    );
  };

  const handleOptionChange = (
    _id: string,
    optionIndex: number,
    value: string
  ) => {
    setQuestions(
      questions.map((q) =>
        q._id === _id
          ? {
              ...q,
              answer: q.answer.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
              correct_answer: q.correct_answer.map((answer) =>
                answer === q.answer[optionIndex] ? value : answer
              ),
            }
          : q
      )
    );
  };

  const addOption = (_id: string) => {
    setQuestions(
      questions.map((q) =>
        q._id === _id ? { ...q, answer: [...q.answer, ""] } : q
      )
    );
  };

  const removeOption = (_id: string, optionIndex: number) => {
    setQuestions(
      questions.map((q) =>
        q._id === _id
          ? {
              ...q,
              answer: q.answer.filter((_, idx) => idx !== optionIndex),
              correct_answer: q.correct_answer.filter(
                (answer) => answer !== q.answer[optionIndex]
              ),
            }
          : q
      )
    );
  };

  const handleCorrectAnswerChange = (
    questionId: string,
    selectedOption: string
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q._id === questionId) {
          if (q.question_type === "single_choice") {
            return {
              ...q,
              correct_answer: [selectedOption],
            };
          } else {
            const isSelected = q.correct_answer.includes(selectedOption);
            return {
              ...q,
              correct_answer: isSelected
                ? q.correct_answer.filter((option) => option !== selectedOption)
                : [...q.correct_answer, selectedOption],
            };
          }
        }
        return q;
      })
    );
  };

  // const handleConsoleLog = () => {
  //   console.log(JSON.stringify(questions));
  // };

  const onFinish = (values: Lesson) => {
    if (values.lesson_type === LessonTypeEnum.ASSIGNMENT) {
      const sanitizedQuestions = questions.map(({ _id, ...rest }) => rest);
      values.assignment = JSON.stringify({
        name: values.name,
        question_list: sanitizedQuestions,
      });
    }
    if (onFinished) {
      onFinished(values);
    }
  };



  // Huko additional code
  return (
    <Form<Lesson>
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
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
            options={listSessions.map((session) => ({
              label: session.name,
              value: session._id,
            }))}
            disabled={!form.getFieldValue("course_id")}

          />
        </Form.Item>
        {/* {(form.getFieldValue("course_id")).toString()} */}

        <Form.Item
          label="Lesson Type"
          name="lesson_type"
          rules={[{ required: true, message: "Please select lesson type" }]}
        >
          <Select
            onChange={() => handleLessonType()}
            defaultValue={LessonTypeEnum.READING}
            placeholder="Lesson Type"
            options={[
              { label: "Reading", value: LessonTypeEnum.READING },
              { label: "Video", value: LessonTypeEnum.VIDEO },
              { label: "Image", value: LessonTypeEnum.IMAGE },
              //{ label: "Assignment", value: LessonTypeEnum.ASSIGNMENT },
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

          {visibility === LessonTypeEnum.IMAGE && (
            <div>
              <Form.Item
                label="Content"
                name="description"
                rules={[
                  { required: true, message: "Please input description" },
                ]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  data={form.getFieldValue("description") || ""}
                  onChange={(_, editor) =>
                    form.setFieldsValue({ description: editor.getData() })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Lesson Image"
                name="image_url"
                rules={[{ required: true, message: "Please input image" }]}
              >
                <div className="space-y-4">
                  <Upload
                    customRequest={uploadCustomRequest}
                    action="https://api.cloudinary.com/v1_1/dz2dv8lk4/upload?upload_preset=edumaster1"
                    accept="image/*"
                    listType="picture-card"
                    fileList={imageFileList}
                    onChange={({ fileList }) => setImageFileList(fileList)}
                    maxCount={1}
                    
                  >
                    {imageFileList.length >= 1 ? null : (
                      <div>
                        <PlusOutlined className="h-5 w-5" />
                        <div>Upload</div>
                      </div>
                    )}
                  </Upload>
                </div>
              </Form.Item>
            </div>
          )}

          <div className="flex justify-around">
            {visibility === LessonTypeEnum.VIDEO && (
              <div>
                <Form.Item
                  label="Content"
                  name="description"
                  rules={[
                    { required: true, message: "Please input description" },
                  ]}
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data={form.getFieldValue("description") || ""}
                    onChange={(_, editor) =>
                      form.setFieldsValue({ description: editor.getData() })
                    }
                  />
                </Form.Item>
                <Col span={12}>
                  <Form.Item
                    label="Lesson Video"
                    name="video_url"
                    rules={[{ required: true, message: "Please input video" }]}
                  >
                    <Row gutter={16} align="middle">
                      <Col span={8}>
                        <Upload
                          action={API_UPLOAD_FILE}
                          customRequest={uploadCustomRequest}
                          accept="video/*"
                          listType="picture-card"
                          fileList={videoFileList}
                          onChange={handleVideoChange}
                          maxCount={1}
                          showUploadList
                          beforeUpload={(file) => {
                        const isSupportedFormat = ["video/mp4", "video/webm", "video/ogg", "video/mov"].includes(file.type);
                        if (!isSupportedFormat) {
                          handleNotify("File format not supported","You can only upload MP4, WebM, MOV or OGG video files!", 'error');
                        }
                        return isSupportedFormat || Upload.LIST_IGNORE; 
                      }}
                    >
                          {videoFileList.length >= 1 ? null : (
                            <div>
                              <PlusOutlined className="h-5 w-5" />
                              <div>Upload</div>
                            </div>
                          )}
                        </Upload>
                      </Col>

                      <Col span={16}>
                        {videoPreviewUrl && (
                          <div style={{ width: "100%", overflow: "hidden" }}>
                            <ReactPlayer
                              url={videoPreviewUrl}
                              width="100%"
                              height="auto" // Adjusts height to maintain aspect ratio
                              controls
                              style={{ maxWidth: "400px" }} // Limit max width
                            />
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </div>
            )}

            {visibility === LessonTypeEnum.ASSIGNMENT && (
              <div className="h-[70vh] w-full overflow-y-scroll">
                <Form.Item name="assignment">
                  {questions.map((q) => (
                    <div key={q._id}>
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <div className="text-lg">Question {q._id}</div>
                          <Select
                            value={q.question_type}
                            onChange={(value) => handleTypeChange(q._id, value)}
                            className="w-1/4 mb-2"
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
                                handleQuestionChange(q._id, content)
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
                        {q.answer.map((option, idx) => (
                          <div key={idx} className="flex items-center mb-2">
                            {q.question_type === "single_choice" ? (
                              <Radio
                                checked={q.correct_answer.includes(option)}
                                onChange={() =>
                                  handleCorrectAnswerChange(q._id, option)
                                }
                              />
                            ) : (
                              <Checkbox
                                checked={q.correct_answer.includes(option)}
                                onChange={() =>
                                  handleCorrectAnswerChange(q._id, option)
                                }
                                className="mr-2"
                              />
                            )}
                            <Input
                              placeholder={`Option ${idx + 1}`}
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(q._id, idx, e.target.value)
                              }
                              className="mr-2"
                            />
                            {q.answer.length > 2 && (
                              <Button
                                danger
                                onClick={() => removeOption(q._id, idx)}
                                icon={<MinusCircleOutlined />}
                              />
                            )}
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => addOption(q._id)}
                          icon={<PlusOutlined />}
                          className="w-full mb-2"
                        >
                          Add Option
                        </Button>
                        <Button
                          danger
                          onClick={() => removeQuestion(q._id)}
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
                </Form.Item>
              </div>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LessonIOptions;
