import { Form, Input, Button, Rate, message } from "antd";
import { Review, ReviewRequest } from "../models/Review.model";
import ReviewService from "../services/review.service";
type Props = {
  label?: boolean;
  courseId: string;
};

export const LeaveAComment = ({ courseId }: Props) => {
  const [form] = Form.useForm();

  const onFinish = async ({ rating, comment }: Review) => {
    const reviewRequest: ReviewRequest = {
      course_id: courseId,  // renamed to match `ReviewRequest`
      rating,
      comment,
    };

    try {
      const createReview = await ReviewService.createReview(reviewRequest);
      console.log("create review:", createReview.data)
      if (createReview && createReview.data) {

        localStorage.setItem("create review", JSON.stringify(createReview.data));
        
        window.dispatchEvent(new Event("storageChange"));
      }
      message.success("Review submitted successfully!")

      form.resetFields();
    } catch (error: any) {
  };
}
  return (
    <div className="font-exo my-4">
      <div className="text-xl font-bold pt-4">Leave A Comment</div>
      {/* <div className="text-sm pt-1 pb-4">Your email address will not be published. Required fields are marked *</div> */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          className="mb-2"
          name="rating"
          rules={[{ required: true, message: "Please select a rating!" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          className="mb-2"
          name="comment"
          rules={[{ required: true, message: "Please input your comment!" }]}
        >
          <Input.TextArea rows={4} placeholder="Comment" />
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
