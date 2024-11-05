import { useState } from "react";
import {
  Card,
  InputNumber,
  Radio,
  Button,
  Modal,
  Space,
  Typography,
  Alert,
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
  // State for controlled inputs
  const [amount, setAmount] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false); // Changed initial state to false
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (!amount || amount < 5) {
      setError("Minimum amount is $5");
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    setError("");
    setIsModalOpen(true);
  };

  const handleAmountChange = (value: number | null) => {
    setAmount(value);
  };

  const formatAmount = (value: number | undefined): string => {
    if (!value) return "";
    return `$ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };



  return (
    <Card className="w-full">
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
            <span className="text-xl font-bold">$200,000</span>
          </div>
        </Card>

        <div className="form-section">
          <div className="form-item">
            <label className="block mb-2">Amount</label>
            <InputNumber
              className="w-full"
              value={amount}
              onChange={handleAmountChange}
              formatter={formatAmount}
              placeholder="0"
              min={10000}
              step={1000}
            />
            <Text className="block mb-6 text-gray-500">
              Minimum top-up amount: $10
            </Text>
          </div>

          <div className="form-item">
            <label className="block mb-2">Payment Method</label>
            <Radio.Group
              className="w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
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
          </div>

          {error && <Alert message={error} type="error" showIcon />}

          <Button
            onClick={handleSubmit}
            type="primary"
            className="w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Continue to Top Up"}
          </Button>
        </div>

        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          okText="Confirm Top Up"
          onOk={() => setIsModalOpen(false)}
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
                      {amount ? `đ ${amount.toLocaleString()}` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold">
                      {paymentMethods.find((m) => m.id === paymentMethod)?.name ?? "-"}
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