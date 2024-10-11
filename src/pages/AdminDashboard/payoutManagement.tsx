import React, { useState } from "react";
import {
  Table,
  Input,
  Card,
  Tag,
  TableProps,
  Button,
  Modal,
  Select,
} from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { Payout, payouts, PayoutStatusEnum } from "./monitors/course/couseList";
import dayjs from "dayjs";

const CourseList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Payout | null>(null);

  const showModal = (course: Payout) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log("Accepted course:", selectedCourse?.payout_no);
    setIsModalVisible(false);
  };

  const handleReject = () => {
    console.log("Rejected course:", selectedCourse?.payout_no);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: TableProps<Payout>["columns"] = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_id",
      key: "instructor_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: PayoutStatusEnum) => {
        switch (status) {
          case "New":
            return <Tag color="blue">New</Tag>;
          case "Request Payout":
            return <Tag color="yellow">Request Payout</Tag>;
          case "Completed":
            return <Tag color="green">Approve</Tag>;
          case "Rejected":
            return <Tag color="red">Reject</Tag>;
        }
      },
    },

    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => {
        return (
          <div>
            <span className="text-red-500"> {discount}%</span>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: Payout) => (
        <>
          <Button
            type="text"
            icon={<EyeOutlined style={{ color: "blue" }} />}
            onClick={() => showModal(record)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">Pending Course Management</h3>


        <div>
          <Input
            placeholder="Search By Course Name"
            prefix={<SearchOutlined />}
            style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
          />

          <Select
            style={{ width: "10rem" }}
            placeholder="Select a person"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={() => console.log("gigi")}
            options={[
              { value: "New", label: "New" },
              { value: "Request Payout", label: "Request Payout" },
              { value: "Completed", label: "Completed" },
              { value: "Rejected", label: "Rejected" },
            ]}
          />
        </div>
        <Table
          dataSource={payouts}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="name"
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }}
        />

        <Modal
          title="Course Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="reject" onClick={handleReject}>
              Reject
            </Button>,
            <Button key="accept" type="primary" onClick={handleOk}>
              Accept
            </Button>,
          ]}
        >
          {selectedCourse && (
            <div>
              <p>
                <strong>Name:</strong> {selectedCourse.balance_instructor_paid}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {selectedCourse.balance_instructor_paid}
              </p>
              <p>
                <strong>Content:</strong>{" "}
                {selectedCourse.balance_instructor_received}
              </p>
              <p>
                <strong>Price:</strong> {selectedCourse.balance_origin}
              </p>
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default CourseList;
