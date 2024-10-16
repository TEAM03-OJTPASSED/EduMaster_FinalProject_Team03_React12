import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Card, Button, Input, Table, Popconfirm } from "antd"; // Import Popconfirm
import "tailwindcss/tailwind.css"; // Import tailwind styles if necessary

const InstructorOrder = () => {
  const [quantity1] = useState(2);
  const [quantity2] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // Store selected products
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      product: {
        name: "Floral Print Wrap Dress",
        color: "Blue",
        size: "42",
        img: "https://picsum.photos/200/300", // Add your image link
      },
      price: 20.5,
      quantity: quantity1,
      total: quantity1 * 20.5,
    },
    {
      key: "2",
      product: {
        name: "Floral Print Wrap Dress",
        color: "Red",
        size: "42",
        img: "https://picsum.photos/200/300", // Add your image link
      },
      price: 30.5,
      quantity: quantity2,
      total: quantity2 * 30.5,
    },
  ]);

  // Handle remove product
  const handleRemove = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  // Columns for Ant Design Table
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product: any) => (
        <div className="flex items-center">
          <img
            src={product.img}
            alt={product.name}
            className="w-16 h-16 object-cover mr-4"
          />
          <div>
            <p className="font-bold">{product.name}</p>
            <p>Color: {product.color}</p>
            <p>Size: {product.size}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
      render: (total: number) => <span>${total.toFixed(2)}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleRemove(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}></Button>
        </Popconfirm>
      ),
    },
  ];

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Instructor Order</h2>

      <div className="flex flex-col lg:flex-row">
        {/* Table for products */}
        <div className="w-full lg:w-2/3 mb-4 lg:mb-0">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
            className="rounded-md shadow"
            rowSelection={rowSelection} // Add rowSelection for checkbox
            scroll={{ x: 600 }} // Enable horizontal scrolling on small screens
          />
        </div>

        {/* Sidebar for Shipping, Coupon, and Cart Total */}
        <div className="w-full lg:w-1/3 lg:pl-4">
          <Card className="mb-4 shadow-md">
            <h3 className="font-bold text-lg mb-2">Coupon Code</h3>
            <Input
              placeholder="Enter your coupon code"
              className="mb-4 rounded-2xl"
            />
            <Button
              type="primary"
              className="w-full mt-4 bg-black text-white rounded-2xl"
            >
              Apply
            </Button>
            <div className="mt-8 p-4 bg-gradient-to-r from-[#ffd28d] to-[#ff7b2a] rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Cart Total</h3>
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span>$71.50</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-$4.00</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>Total</span>
                <span>$67.50</span>
              </div>
              <Button
                type="primary"
                className="w-full mt-4 bg-black text-white rounded-2xl"
                color="danger"
              >
                Checkout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstructorOrder;
