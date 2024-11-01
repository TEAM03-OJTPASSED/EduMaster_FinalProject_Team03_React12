import { Table, Input, Card, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { PageInfo } from "../../../../models/SearchInfo.model";
import { ChangeEvent, useEffect, useState } from "react";
import { GetSessions, Session } from "../../../../models/Session.model";
import SessionService from "../../../../services/session.service";
import useDebounce from "../../../../hooks/useDebounce";

const PendingSessionList = () => {
  const [searchText, setSearchText] = useState<string>("");
  const searchDebounce = useDebounce(searchText, 2000);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const [sessionPendingList, setSessionPendingList] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<PageInfo>({} as PageInfo);
  const [sessionSearchParam, setSessionSearchParam] = useState<GetSessions>({
    searchCondition: {
      keyword: "",
      course_id: "",
      is_position_order: false,
      is_deleted: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 5,
    },
  });

  useEffect(() => {
    // Update sessionSearchParam when searchDebounce changes
    setSessionSearchParam((prev) => ({
      ...prev,
      searchCondition: { ...prev.searchCondition, keyword: searchDebounce },
    }));
  }, [searchDebounce]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await SessionService.getSessions(sessionSearchParam);
      setSessionPendingList(res?.data?.pageData as Session[]);
      setCurrentSession(res?.data?.pageInfo as PageInfo);
    };
    fetchData();
  }, [sessionSearchParam]);

  const columns: TableProps<Session>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Position Order",
      dataIndex: "position_order",
      key: "position_order",
      render: (is_deleted) => {
        return <div className="text-red-600">{is_deleted}</div>;
      },
    },
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">Session Management</h3>
      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        onChange={handleSearchChange}
      />
      <Table
        dataSource={sessionPendingList}
        columns={columns}
        pagination={{
          current: currentSession.pageNum,
          pageSize: currentSession.pageSize,
          total: currentSession.totalItems,
          onChange: (pageNum, pageSize) => {
            setSessionSearchParam((prev) => ({
              ...prev,
              pageInfo: { pageNum, pageSize },
            }));
          },
        }}
        rowKey={(record) => record._id}
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default PendingSessionList;
