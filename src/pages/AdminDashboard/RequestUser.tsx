import { useEffect, useState } from "react";
import { Table, Button, Input, Space, Card, Modal, message, Spin, FormProps } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { previewInstructor, UserService } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { User } from "../../models/UserModel";
import { UserSearchParams } from "../../models/SearchInfo.model";
import GlobalSearchUnit from "../../components/GlobalSearchUnit";

const initializeSearchParam: UserSearchParams = {
  searchCondition: {
    keyword: "",
    role: "instructor",
    status: true,
    is_delete: false,
    is_verified: true,
  },
  pageInfo: { pageNum: 1, pageSize: 10 },
};
const RequestUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success } = useSelector(
    (state: RootState) => state.users.previewProfile
  );

  const [reasonVisible, setReasonVisible] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reason, setReason] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useState<UserSearchParams>(
    initializeSearchParam
  );

  const fetchUsers = async () => {
    const response = await UserService.getUsers(searchParams);
    const responseData = response.data?.pageData;
    const flattenedUsers: User[] = Array.isArray(responseData)
      ? responseData.flat()
      : [];
    setUsers(flattenedUsers);
    setTotal(response.data?.pageInfo?.totalItems ?? 0);
  };

  useEffect(() => {
    fetchUsers();
  }, [searchParams]);

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
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
    await previewInstructor(formPreview, dispatch);
    if (success) {
      message.success("Submit preview successfully");
      setReasonVisible(false);
    }
    console.log(formPreview);
  };
  const handleSearch: FormProps["onFinish"] = (values) => {
    setSearchParams((prev) => ({
      ...prev,
      searchCondition: {
        ...prev.searchCondition,
        keyword: values.keyword,
      },
    }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (avatar_url:string) => (
        <div className="h-full w-full md:w-[100px]">
          <img src={avatar_url} alt={avatar_url} className="w-[200px] 2h-auto" />
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Actions",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button
            type="text"
            className="text-green-600"
            icon={<CheckOutlined />}
            onClick={() => handleSubmitPreview("approve", record)}
          />
          <Button
            className="text-red-600"
            type="text"
            icon={<CloseOutlined />}
            onClick={() => handleShowReason(record)}
          />
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
        <GlobalSearchUnit
          placeholder="Search By Course Name"
          onSubmit={handleSearch}
        />
        <Table
          dataSource={users}
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
