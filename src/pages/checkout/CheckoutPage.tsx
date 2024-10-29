import React, { useState } from 'react';
import { Form, Input, Button, Card, List, Typography, Space, Radio, Divider, message } from 'antd';
import { CreditCardOutlined, BankOutlined, DollarOutlined } from '@ant-design/icons';
import { useCustomNavigate } from '../../hooks/customNavigate';
import DynamicBreadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { RootState } from '../../redux/store/store';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

interface Course {
  id: number;
  name: string;
  price: number;
}

// interface User {
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
// }

const CheckoutPage: React.FC = () => {
  const navigate = useCustomNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const {currentUser} = useSelector((state:RootState) => state.auth.login)

  

  const courses: Course[] = [
    { id: 1, name: "Advanced Web Development", price: 24000000 },
    { id: 2, name: "Data Science Fundamentals", price: 24000000},
    { id: 3, name: "Digital Marketing Mastery", price: 24000000 },
  ];

  

  const total = courses.reduce((sum, course) => sum + course.price, 0);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('Order placed successfully!');
    navigate('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Please fill in all required fields.');
  };

  return (
    <div className="container mx-auto px-4 py-8 font-jost">
            <DynamicBreadcrumb/>

      <Title level={1} className="mb-8 font-exo">Checkout</Title>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <Card title="Billing Information" className="mb-8">
            <Form
              name="checkout"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
              
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
                initialValue={currentUser?.name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                initialValue={currentUser?.email}
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
              <Divider />
              <Title level={4}>Payment Method</Title>
              <Form.Item name="paymentMethod">
                <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                  <Space direction="vertical">
                    <Radio value="credit_card">
                      <Space>
                        <CreditCardOutlined />
                        Credit Card
                      </Space>
                    </Radio>
                    <Radio value="bank_transfer">
                      <Space>
                        <BankOutlined />
                        Bank Transfer
                      </Space>
                    </Radio>
                    <Radio value="paypal">
                      <Space>
                        <DollarOutlined />
                        PayPal
                      </Space>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              {paymentMethod === 'credit_card' && (
                <>
                  <Form.Item
                    name="cardNumber"
                    label="Card Number"
                    rules={[{ required: true, message: 'Please input your card number!' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Space>
                    <Form.Item
                      name="expiryDate"
                      label="Expiry Date"
                      rules={[{ required: true, message: 'Required!' }]}
                    >
                      <Input placeholder="MM/YY" />
                    </Form.Item>
                    <Form.Item
                      name="cvv"
                      label="CVV"
                      rules={[{ required: true, message: 'Required!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Space>
                </>
              )}
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large"
                  className="w-full mt-4 view-button ant-btn-variant-solid font-jost"
                >
                  Place Order
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card title="Order Summary" className="sticky top-4">
            <List
              dataSource={courses}
              renderItem={(course) => (
                <List.Item key={course.id}>
                  <Text>{course.name}</Text>
                  <Text>${course.price.toFixed(2)}</Text>
                </List.Item>
              )}
            />
            <Divider />
            <div className="flex justify-between items-center">
                <Text strong>Total</Text>
                <Text strong className='text-4xl font-jost '>đ {total.toFixed(0)}</Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;