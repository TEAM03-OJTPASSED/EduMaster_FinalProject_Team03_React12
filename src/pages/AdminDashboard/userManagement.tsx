import  { useState } from "react";
import {
  Table,
  Input,
  Card,
} from "antd";
import {
  SearchOutlined,
  
} from "@ant-design/icons";


const UserManagement = () => {
  const [dataSource] = useState([
    {
      key: "1",
      name: "Nguyễn Văn A",
      email: "a@example.com",
      phone: "0123456789",
      username: "nguyenvana",
      status: true, // Use boolean for status
      role: "Admin",
      createdAt: "2023-01-15",
    },
    {
      key: "2",
      name: "Trần Thị B",
      email: "b@example.com",
      phone: "0987654321",
      username: "tranthib",
      status: false, // Use boolean for status
      role: "Instructor",
      createdAt: "2023-02-20",
    },
    {
      key: "3",
      name: "Lê Văn C",
      email: "c@example.com",
      phone: "0912345678",
      username: "levanc",
      status: true, // Use boolean for status
      role: "Student",
      createdAt: "2023-03-05",
    },
  ]);

  // const [editVisible, setEditVisible] = useState(false);
  // const [currentUser] = useState(null);


  // const handleSave = (values:any) => {
  //   console.log("Saving user:", values);
  //   // Update user logic here, possibly update dataSource state
  //   // setDataSource(updatedData);
  // };

  const columns = [
    {
      title: "Họ và tên",
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      // render: () => (
      //   // <Switch
      //   //   checked={text}
      //   //   // checkedChildren="Kích hoạt"
      //   //   // unCheckedChildren="Không kích hoạt"
      //   //   onChange={(checked) => handleStatusChange(checked, record.key)}
      //   // />
      // ),
    },
    {
      title: "Loại người dùng",
      dataIndex: "role",
      key: "role",
      // render: (text, record) => (
      //   <Select
      //     defaultValue={text}
      //     style={{ width: 120 }}
      //     onChange={(value) => handleRoleChange(value, record.key)}
      //   >
      //     <Option value="Admin">Admin</Option>
      //     <Option value="Instructor">Instructor</Option>
      //     <Option value="Student">Student</Option>
      //   </Select>
      // ),
    },
    // {
    //   title: "Ngày tạo",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    // },
    {
      title: "Hành động",
      key: "action",
      // render: (text, record) => (
      //   <Space size="middle">
      //     <Button
      //       color="primary"
      //       variant="outlined"
      //       icon={<EditOutlined />}
      //       onClick={() => handleEdit(record)}
      //     >
      //       Chỉnh sửa
      //     </Button>
      //     <Button
      //       color="danger"
      //       variant="outlined"
      //       icon={<DeleteOutlined />}
      //       onClick={() => handleDelete(record)}
      //     >
      //       Xóa
      //     </Button>
      //   </Space>
      // ),
    },
  ];

  return (
    <div>
      <Card>
        <div className="flex">
          <h3 className="text-2xl my-5">User Management</h3>
        </div>
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }} // Thêm scroll cho bảng
        />
      </Card>
      {/* <EditUserModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        user={currentUser}
        onSave={handleSave}
      /> */}
    </div>
  );
};

export default UserManagement;
