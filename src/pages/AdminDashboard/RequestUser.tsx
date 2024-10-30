import { useEffect, useState } from "react";
import { Table, Button, Input, Space, Card, Modal, message, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { previewInstructor } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getUsersData } from "../../redux/slices/userSlice";
import { SearchParamInterface } from "../../type/search.type";

const RequestUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data } = useSelector((state: RootState) => state.users.users);
  const [reasonVisible, setReasonVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [reason, setReason] = useState("");

  // Fetch users based on page number and page size
  const fetchUsers = async (pageNum: number, pageSize: number) => {
    const searchParams: SearchParamInterface = {
      searchCondition: {
        keyword: "",
        role: "instructor",
        status: true,
        is_verified: "",
        is_deleted: false,
      },
      pageInfo: { pageNum, pageSize },
    };
    await dispatch(getUsersData(searchParams));
  };
  useEffect(() => {
    // Initialize data with current pagination
    fetchUsers(data.pageInfo?.pageNum || 1, data.pageInfo?.pageSize || 10);
  }, [data.pageInfo?.pageNum, data.pageInfo?.pageSize]);

  const handleTableChange = async (pagination: any) => {
    await fetchUsers(pagination.current, pagination.pageSize);
  };

  const handleShowReason = (record: any) => {
    setCurrentUser(record);
    setReasonVisible(true);
  };

  const handleSubmitPreview = async (status: string, record: any) => {
    const formPreview = {
      user_id: record._id,
      status,
      comment: reason,
    };
    const response = await previewInstructor(formPreview, dispatch);
    if (response.success) {
      message.success("Submit preview successfully");
      setReasonVisible(false);
    } else {
      message.error("Failed to submit preview");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Descriptions",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành động",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button
            color="primary"
            onClick={() => handleSubmitPreview("approve", record)}
            variant="outlined"
          >
            Approve
          </Button>
          <Button
            color="danger"
            onClick={() => handleShowReason(record)}
            variant="outlined"
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div className="flex">
          <h3 className="text-2xl my-5">Request Instructor Management</h3>
        </div>
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        />
        <Table
          dataSource={data.pageData}
          pagination={{
            current: data.pageInfo?.pageNum || 1,
            pageSize: data.pageInfo?.pageSize || 10,
            total: data.pageInfo?.totalItems || 0,
            showSizeChanger: true,
          }}
          columns={columns}
          rowKey="_id"
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }}
          onChange={handleTableChange}
        />
      </Card>
      <Modal
        title="Reject Reason"
        open={reasonVisible}
        onCancel={() => setReasonVisible(false)}
        footer={[
          <Button
            color="primary"
            key="submit"
            variant="solid"
            htmlType="submit"
            onClick={() => handleSubmitPreview("reject", currentUser)}
          >
            {loading ? <Spin /> : <span>Submit</span>}
          </Button>,
        ]}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ height: "100px" }}
          placeholder="Comment here..."
        />
      </Modal>
    </div>
  );
};

export default RequestUser;
