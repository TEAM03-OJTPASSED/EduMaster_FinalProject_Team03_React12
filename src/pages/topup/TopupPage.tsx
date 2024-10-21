import React, { useState } from "react";
import {
  Card,
  Form,
  InputNumber,
  Radio,
  Button,
  Modal,
  Space,
  Typography,
  Alert,
  Statistic,
  Spin,
} from "antd";

const { Text } = Typography;

const paymentMethods = [
  {
    id: "card",
    name: "Credit Card",
    description: "Pay securely with your credit card",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Fast and secure payment with PayPal",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Direct transfer from your bank account",
  },
];

const TopUpPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const handleSubmit = (values) => {
    // Ensure the amount is a valid number before proceeding
    const numericAmount = Number(values.amount);
    if (isNaN(numericAmount) || numericAmount < 10000) {
      setError("Minimum amount is đ 10,000");
      return;
    }
    setError("null");
    setIsModalOpen(true);
  };

  const validateAmount = (_, value) => {
    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      setIsLoading(true);
      return Promise.reject("Please enter a valid number");
    }
    if (numericValue < 10000) {
      setIsLoading(true);
      return Promise.reject("Minimum amount is đ 10,000");
    }
    setIsLoading(false);
    return Promise.resolve();
  };

  return (
    <Card className="">
      <Space direction="vertical" size="large" className="w-full">
        <Space direction="vertical" size="small">
          <h3 className="text-2xl mt-5">Top Up</h3>
          <Text className="text-gray-500">
            Add funds to your account balance
          </Text>
        </Space>

        <Card className="bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Current Balance</span>
            <span className="text-xl font-bold">đ 1,234.56</span>
          </div>
        </Card>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            amount: "",
            paymentMethod: undefined,
          }}
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: "Please enter an amount" },
              { validator: validateAmount },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <InputNumber
              className="w-full"
              formatter={(value) =>
                `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/đ\s?|(,*)/g, "")}
              placeholder="0"
              min={10000}
              step={1000}
            />
          </Form.Item>

          <Text className="block mb-6 text-gray-500">
            Minimum top-up amount: đ 10,000
          </Text>

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[
              { required: true, message: "Please select a payment method" },
            ]}
          >
            <Radio.Group className="w-full">
              <Space direction="vertical" className="w-full">
                {paymentMethods.map((method) => (
                  <Radio key={method.id} value={method.id} className="w-full">
                    <div className="flex flex-col">
                      <span className="font-medium">{method.name}</span>
                      <span className="text-gray-500">
                        {method.description}
                      </span>
                    </div>
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <span>{error}</span>
            </Alert>
          )}

          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Continue to Top Up"}
          </Button>
        </Form>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          okText="Confirm Top Up"
          onCancel={() => setIsModalOpen(false)}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Confirm Top Up</h2>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <span>Loading...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <p>Please review the details of your top-up request:</p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span>Amount:</span>
                    <span className="font-semibold">
                      đ {Number(form.getFieldValue("amount")).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold">
                      {
                        paymentMethods.find(
                          (m) => m.id === form.getFieldValue("paymentMethod")
                        )?.name
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </Space>
    </Card>
  );
};

export default TopUpPage;
