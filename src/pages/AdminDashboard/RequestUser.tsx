import  { useEffect, useState } from "react";
import { Table, Button, Input, Space, Card, Modal, message, Spin } from "antd";
import { 
  SearchOutlined,
  CheckOutlined,
  CloseOutlined, 
} from "@ant-design/icons";
import useSearch from "../../hooks/useSearch";
import { getUsers, previewInstructor } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";

const RequestUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success } = useSelector(
    (state: RootState) => state.users.previewProfile
  );
  const [reasonVisible, setReasonVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [reason, setReason] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { searchText, filteredData, handleSearchChange } = useSearch(users, [
    "name",
    "email",
  ]);

  const fetchUsers = async (pageNum :number, pageSize :number, keyword:string) => {
    const searchParams = {
      searchCondition: {
        keyword,
        role: "instructor",
        status: true,
        is_verified: "",
        is_delete: false,
      },
      pageInfo: { pageNum, pageSize },
    };

    try {
      const response = await getUsers(searchParams);
      setUsers((response as any)?.pageData );
      setTotal((response as any)?.pageInfo.totalItems);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers(pageNum, pageSize, searchText);
  }, [pageNum, pageSize, searchText]);

  const handleTableChange = (pagination :any ) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleShowReason = (record :any) => {
    setCurrentUser(record);
    setReasonVisible(true);
  };

  const handleSubmitPreview = async (status: string, record:any) => {
    const formPreview = {
      user_id: record._id,
      status,
      comment: reason,
    };
    await previewInstructor(formPreview, dispatch);
    if (success) {
      message.success("Submit preview successfully");
      setReasonVisible(false);
    }
    console.log(formPreview);
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
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Descriptions",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "action",
      render: (record :any) => (
        <Space size="middle">
          <Button
            type="text"
            className="text-green-600"
            icon={<CheckOutlined />}
            onClick={() => handleSubmitPreview("approve", record)}
          >
          </Button>
          <Button
            className="text-red-600"
            type="text"
            icon={<CloseOutlined />}
            onClick={() => handleShowReason(record)}
          >
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
        <div className="flex flex-wrap items-center mb-4">
        <Input
            placeholder="Search By User Name"
            prefix={<SearchOutlined />}
            className="w-full md:w-1/3 mb-2 md:mb-0"
            value={searchText}
            onChange={handleSearchChange}
          />
          </div>
        <Table
          dataSource={filteredData}
          pagination={{
            current: pageNum,
            pageSize,
            total,
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
            {loading ? <Spin/> : <span>Submit</span>}
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
