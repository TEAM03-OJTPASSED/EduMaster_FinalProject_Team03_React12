import { Card, Input, Table, Tag, TableProps, Button } from "antd";
import { CheckOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { Payout, payouts, PayoutStatusEnum } from "../monitors/course/courseList";
import { useState } from "react";
import RejectPayoutModal from "./RejectPayoutModal";

const AdminRequestPayout = () => {
    const location = useLocation();

    const { status } = location.state || {};

    const filterdPayouts = payouts.filter((payout) =>
        Array.isArray(status) ? status.includes(payout.status) : payout.status === status
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns: TableProps<Payout>["columns"] = [
        {
            title: "Payout No",
            dataIndex: "payout_no",
            key: "payout_no",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: PayoutStatusEnum) => {
                if (status === "New") {
                    return <Tag color="blue">New</Tag>;
                } else if (status === "Request Payout") {
                    return <Tag color="yellow">Request Payout</Tag>
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
            title: "Transaction ID",
            dataIndex: "transaction_id",
            key: "transaction_id",
        },
        {
            title: "Balance Origin",
            dataIndex: "balance_origin",
            key: "balance_origin",
        },
        {
            title: "Balance Instructor Paid",
            dataIndex: "balance_instructor_paid",
            key: "balance_instructor_paid",
        },
        {
            title: "Balance Instructor Received",
            dataIndex: "balance_instructor_received",
            key: "balance_instructor_received",
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
                        disabled={
                            record.status !== PayoutStatusEnum.request_payout &&
                            record.status !== PayoutStatusEnum.new
                        }
                    >
                        Approve
                    </Button>
                    <Button
                        className="text-red-600"
                        type="text"
                        icon={<CloseOutlined />}
                        disabled={
                            record.status !== PayoutStatusEnum.request_payout &&
                            record.status !== PayoutStatusEnum.new
                        }
                        onClick={showModal}
                    >
                        Reject
                    </Button>
                    <RejectPayoutModal
                        isOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                    />
                </>
            ),
        },
    ];

    return (
        <Card>
            <div className="flex">
                <h3 className="text-2xl my-5">Payout Management</h3>
            </div>
            <Input
                placeholder="Search By Payout Number"
                prefix={<SearchOutlined />}
                style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
            />
            <Table
                dataSource={filterdPayouts}
                columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey="name"
                bordered
                style={{ borderRadius: "8px" }}
                scroll={{ x: true }}
            />
        </Card>
    );
};
export default AdminRequestPayout;
