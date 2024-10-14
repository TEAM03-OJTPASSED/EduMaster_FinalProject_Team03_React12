import { Form, Input, Button, Row, Col, Checkbox } from "antd";

type Props = {
  name?: string;
  email?: string;
};

export const LeaveAComment = ({ name, email }: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: Props) => {
    console.log("Form values:", values);
  };

  return (
    <div className="font-exo my-4 w-2/3">
      <div className="font-bold pt-4">Leave A Comment</div>
      <div className="text-sm pt-1 pb-4">Your email address will not be published. Required fields are marked *</div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ name, email }}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
                className="mb-2"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name*" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
             className="mb-2"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Email*" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
        className="mb-2"
          name="comment"
          rules={[{ required: true, message: "Please input your comment!" }]}
        >
          <Input.TextArea rows={4} placeholder="Comment" />
        </Form.Item>
        <Form.Item className="mb-2" name="saveInfo" valuePropName="checked">
          <Checkbox>Save my name, email in this browser for the next time I comment</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-orange-500 rounded-full hover:bg-orange-600">
            Post Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
