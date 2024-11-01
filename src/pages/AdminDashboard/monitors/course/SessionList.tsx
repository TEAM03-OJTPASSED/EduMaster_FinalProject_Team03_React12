import { Table, Input, Card, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { GetSessions, Session } from "../../../../models/Session.model";
import SessionService from "../../../../services/session.service";
import { useDebouncedSearch } from "../../../../hooks/useSearch";
import { useEffect, useState } from "react";

const SessionList = () => {
  const [searchText, setSearchText] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [courses, setCourses] = useState<Session[]>([]);
  const filteredData = useDebouncedSearch(courses, searchText, 300, ["name", "category_id"]);

  const fetchSessions = async () => {
    const searchParams: GetSessions = {
      searchCondition: {
        keyword: searchText,
        course_id: "",
        is_position_order: true,
        is_deleted: false,
      },
      pageInfo: { pageNum, pageSize },
    };

    try {
      const response = await SessionService.getSessions(searchParams);
      const responseData = response.data?.pageData;
      const flattenedUsers: Session[] = Array.isArray(responseData)
        ? responseData.flat() // Dùng flat() để chuyển thành User[]
        : [];
      setCourses(flattenedUsers);
      setTotal(response.data?.pageInfo?.totalItems ?? 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  useEffect(() => {
    fetchSessions();
  }, [pageNum, pageSize]);


  const columns: TableProps<Session>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "course_id",
      key: "course_id",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt: string) => {
        return dayjs(createdAt).format("DD-MM-YYYY");
      },
    },
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">Session Management</h3>
      <div className="flex flex-wrap items-center mb-4">
        <Input
          placeholder="Search By Session Name"
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3 mb-2 md:mb-0"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        rowKey="_id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default SessionList;
