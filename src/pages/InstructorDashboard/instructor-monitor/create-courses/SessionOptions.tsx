import { Button, Col, Form, FormProps, Input, Row, Select } from "antd";
import React, { useEffect } from "react";
import {
  listCourses,
  Session,
} from "../../../AdminDashboard/monitors/course/courseList";
import { Course } from "../../../AdminDashboard/monitors/course/courseList";

type SessionOptionsProps = {
  initialState?: Session;
  mode: "create" | "update";
  onFinish: FormProps["onFinish"];
};

const SessionOptions: React.FC<SessionOptionsProps> = ({
  initialState,
  mode,
  onFinish,
}) => {
  const [form] = Form.useForm<Partial<Session>>();

  useEffect(() => {
    if (mode === "update") {
      form.setFieldsValue(initialState ?? {});
    }
  }, [mode, initialState, form]);
  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Row justify={`space-around`} gutter={[16, 16]}>
          <Col xs={{ span: 12 }}>
            <Form.Item
              label="Session Name"
              name="name"
              rules={[{ required: true, message: "Please input session name" }]}
            >
              <Input placeholder="Course Name" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 12 }}>
            <Form.Item
              label="Position Order"
              name="position_order"
              rules={[
                { required: true, message: "Please input position order" },
              ]}
            >
              <Input type="number" placeholder=" Position Order" />
            </Form.Item>
          </Col>
        </Row>

        {/*  */}
        <Form.Item label="Course Id" name="course_id">
          {mode === "update" && (
            <Input value={"Course id get dc o step 1"} disabled />
          )}
          {mode === "create" && (
            <Select
              placeholder="Select course name"
              options={listCourses.map((course:Course) => ({
                label: course.name,
                value: course.id,
              }))}
            />
          )}
        </Form.Item>
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
            placeholder="Session description"
            style={{ height: 120, resize: "none" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="w-full"
            variant="solid"
            color="primary"
            htmlType="submit"
          >
            {mode === "create" ? "Create" : "Change"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SessionOptions;
