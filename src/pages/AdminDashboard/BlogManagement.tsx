import { useState } from "react";
import { Blog, listBlogs } from "./monitors/course/couseList";
import { Button, Card, Input, Modal, Table, TableProps, Tag } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import CreateBlog from "./blog/CreateBlog";

const BlogManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModaCreatelVisible, setIsModalCreateVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const showModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
  };
  const showModalCreate = () => {
    setIsModalCreateVisible(true);
  };

  const columns: TableProps<Blog>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Title Image",
      dataIndex: "title_image",
      key: "title_image",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        return <Tag color="gray">{type}</Tag>;
      },
    },
    {
      title: "Published Date",
      dataIndex: "publishedDate",
      key: "publishedDate",
      render: (publishedDate) => {
        return <div>{dayjs(publishedDate).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: Blog) => (
        <>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDelete(record.id)}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "blue" }} />}
            onClick={() => showModal(record)}
          />
        </>
      ),
    },
  ];

  const handleDelete = (name: string) => {
    console.log("Deleted course:", name);
  };
  return (
    <Card>
      <h3 className="text-2xl my-5">Blog Management</h3>
      <div className="flex justify-between">

      <Input
        placeholder="Search By Course Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />
      <div className="flex">
        <Button
          onClick={showModalCreate}
          icon={<PlusCircleOutlined />}
          shape="round"
          variant="solid"
          color="primary"
          className="items-center"
        >
          Create Blog
        </Button>
      </div>
      </div>

      <Table
        dataSource={listBlogs}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
      <Modal
        title="Course Update"
        open={isModalVisible}
        onCancel={handleCancel}
      >
        {selectedBlog && (
          <CreateBlog
            mode="update"
            initialValues={{
              title: selectedBlog.title,
              title_image: selectedBlog.title_image,
              type: selectedBlog.type,
              content: `<div>${selectedBlog.content}</div>`,
            }}
            onFinished={(values) => {
              console.log("Update values:", values);
            }}
          />
        )}
      </Modal>
      <Modal
        title="Create Course"
        open={isModaCreatelVisible}
        onCancel={handleCancel}
      >
        <CreateBlog
          mode="create"
          onFinished={(values) => {
            console.log("Create values:", values);
          }}
        />
      </Modal>
    </Card>
  );
};

export default BlogManagement;
