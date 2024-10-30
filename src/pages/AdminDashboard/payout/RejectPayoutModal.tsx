import React from "react";
import { Modal, Button, Input, Form } from "antd";
import { SendEmailRejectPayoutType, sendEmailToRejectPayout } from "../../../services/apiSendEmailRejectPayout";

interface RejectPayoutModalProps {
    isOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

const RejectPayoutModal: React.FC<RejectPayoutModalProps> = ({
    isOpen,
    handleOk,
    handleCancel,
}) => {
    const [form] = Form.useForm<SendEmailRejectPayoutType>();
    const onFinish = (values: SendEmailRejectPayoutType) => {
        console.log("Success:", values);
        sendEmailToRejectPayout(values);
        form.resetFields();
        handleOk();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Modal
            title="Reject Payout"
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
            centered
            width={500} 
            bodyStyle={{
                padding: '20px 30px', 
            }}
        >
            <Form
                name="rejectPayoutForm"
                form={form}
                layout="vertical" 
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Please enter a valid email" },
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Reason"
                    name="message"
                    rules={[
                        { required: true, message: 'Please enter your message' },
                        { min: 10, message: 'Message must be at least 10 characters long' },
                    ]}
                >
                    <Input.TextArea rows={4} placeholder="Describe the reason for rejecting the payout..." />
                </Form.Item>

                <Form.Item style={{ textAlign: 'right', marginTop: '20px' }}>
                    <Button onClick={handleCancel} style={{ marginRight: '10px' }}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Send Email
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RejectPayoutModal;
