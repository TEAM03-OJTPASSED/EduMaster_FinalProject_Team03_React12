import React from "react";
import { Modal, Button, Input, Form } from "antd";

interface RejectPayoutModalProps {
    isOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

type FieldType = {
    reason?: string;
    additionalInfo?: string;
};

const RejectPayoutModal: React.FC<RejectPayoutModalProps> = ({
    isOpen,
    handleOk,
    handleCancel,
}) => {
    const onFinish = (values: FieldType) => {
        console.log("Success:", values);
        handleOk();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Modal
            title="Reject Payout"
            open={isOpen}
            onCancel={handleCancel} // Đóng modal khi click nút Cancel
            footer={null} // Footer null để sử dụng các nút từ Form
        >
            <Form
                name="rejectPayoutForm"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 600 }}
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
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Reason"
                    name="reason"
                    rules={[{ required: false }]}
                >
                    <Input.TextArea rows={4} placeholder="Describe the reason for rejecting the payout..." />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                    <Button type="default" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: "10px" }}>
                        Send Email
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RejectPayoutModal;
