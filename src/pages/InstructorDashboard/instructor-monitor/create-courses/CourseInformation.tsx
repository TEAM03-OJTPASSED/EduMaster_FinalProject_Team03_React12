import { Col, Form, Input, Row, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
/**
 * {
  "course": {
    "name": "Course Name",
    "category_id": "category_id-1",
    "description": "Course description",
    "content": "Detailed content",
    "video_url": "video_url_here",
    "image_url": "image_url_here",
    "status": "PUBLISHED",
    "price": 100,
    "discount": 10,
    "sessions": [
      {
     
        "name": "Session 1",
        "user_id": "user_id_1",
        "description": "Session 1 description",
        "position_order": 1,
        "created_at": "2024-10-11T00:00:00Z",
        "updated_at": "2024-10-11T00:00:00Z",
        "is_deleted": false,
        "lessons": [
          {
           
            "name": "Lesson 1",
            "course_id": "course_id_1",
            "session_id": "session_id_1",
            "user_id": "user_id_1",
            "lesson_type": "VIDEO",
            "description": "Lesson 1 description",
            "video_url": "lesson_video_url",
            "image_url": "lesson_image_url",
            "full_time": 1200,
            "position_order": 1,
            "created_at": "2024-10-11T00:00:00Z",
            "updated_at": "2024-10-11T00:00:00Z",
            "is_deleted": false
          }
        ]
      }
    ]
  }
}
 */

// type CourseInfoFiled = {
//   name: string;
//   category_id: string;
//   description: string;
//   content: string;
//   video_url: string;
//   image_url: string;
// };

const CourseInformation = () => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
      >
        <Row justify={`space-around`} gutter={[16, 16]}>
          <Col xs={{ span: 12 }}>
            <Form.Item
              label="Course Name"
              name="name"
              rules={[{ required: true, message: "Please input course name" }]}
            >
              <Input placeholder="Course Name" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 12 }}>
            <Form.Item
              label="Category"
              name="category_id"
              rules={[
                { required: true, message: "Please input Category name" },
              ]}
            >
              <Select
                placeholder="select category"
                options={[
                  {
                    label: "Javascript",
                    value: "category_id-1",
                  },
                  {
                    label: "TypeScript",
                    value: "category_id-2",
                  },
                  {
                    label: "Machine learning",
                    value: "category_id-3",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description" }]}
        >
          <Input.TextArea
            showCount
            maxLength={100}
            // onChange={onChange}
            placeholder="Course description"
            style={{ height: 120, resize: "none" }}
          />
        </Form.Item>
        {/* Content */}
        <Form.Item label="Content" name="content">
          {/* <CKEditor
            editor={ClassicEditor}
            // onChange={(event, editor) => {
            // const data = editor.getData();
            // setForm(content:data)
            // }}
            config={{
              placeholder: "Enter blog content...",
            }}
          /> */}
        </Form.Item>
        <Row>
          <Col>
            <Form.Item
              label="Course Image"
              name="image_url"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload accept="image/*" listType="picture-card">
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Course Video"
              name="video_url"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload accept="video/*" listType="picture-card">
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CourseInformation;
