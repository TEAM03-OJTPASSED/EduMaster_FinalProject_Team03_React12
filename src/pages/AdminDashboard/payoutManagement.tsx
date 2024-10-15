import React, { ChangeEvent, useState } from "react";
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
import {
  SearchOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Payout, payouts, PayoutStatusEnum } from "./monitors/course/couseList";

import { InputSearchProps } from "../../hooks/useDebounce";

const PayoutManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [selectedCourse, setSelectedCourse] = useState<Payout | null>(null);

  const [filterSelection, setFilterSelection] = useState<InputSearchProps>({
    selection: "",
    search: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === "string") {
      // Handle Select
      setFilterSelection({ ...filterSelection, selection: e });
    } else {
      // Handle Input
      const { name, value } = e.target;
      setFilterSelection({ ...filterSelection, [name]: value });
    }
    console.log(filterSelection);
  };
  // const showModal = (course: Payout) => {
  //   setSelectedCourse(course);
  //   setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //   // console.log("Accepted course:", selectedCourse?.payout_no);
  //   setIsModalVisible(false);
  // };



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
      title: "Balance Origin",
      dataIndex: "balance_origin",
      key: "balance_origin",
    },
    {
      title: "Balance Instructor paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
    },
    {
      title: "Balance Instructor Receive",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
    },
    {
      title: "Transaction",
      key: "balance_origin",
      render: () => {
        return (
          <div>
            <p className="underline font font-medium text-blue-500 cursor-pointer hover:font-bold active:text-blue-300">View</p>
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
            className="text-green-600"
            icon={<CheckOutlined />}
            disabled={record.status !== PayoutStatusEnum.request_payout}
          >
            Approve
          </Button>
          <Button
            className="text-red-600"
            type="text"
            icon={<CloseOutlined />}
            disabled={record.status !== PayoutStatusEnum.request_payout}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">Payout Management</h3>
        <div className="flex flex-col justify-between mb-5 lg:flex-row ">
          {/* Search */}
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="w-full mb-5 rounded-sm md:w-[30rem]"
            onChange={(e) => handleOnChange(e)}
            name="search"
          />

          {/* Select status */}
          <div className="flex gap-2">
            <p className="text-base">Select Status:</p>
            <Select
              style={{ width: "10rem" }}
              placeholder="Select a status"
              defaultValue=""
              onChange={(value) => handleOnChange(value)} // Pass the selected value
              options={[
                { value: "", label: "All" },
                { value: "New", label: "New" },
                { value: "Request Payout", label: "Request Payout" },
                { value: "Completed", label: "Completed" },
                { value: "Rejected", label: "Rejected" },
              ]}
            />
          </div>
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
          // onOk={handleOk}
          onCancel={handleCancel}
        >
       

        </Modal>
      </Card>
    </div>
  );
};

export default PayoutManagement;
