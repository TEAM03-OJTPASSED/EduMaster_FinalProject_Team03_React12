import { Button, Card, Input, Modal, Table, Tag } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CreateBlog from "./blog/CreateBlog";
import DeleteBlog from "./blog/DeleteBlog";
import { Blog } from "../../models/Blog.model";
import { BlogSearchParams } from "../../models/SearchInfo.model";
import BlogService from "../../services/blog.service";
import EditBlog from "./blog/EditBlog";
import { ellipsisText } from "../../utils/ellipsisText";

const initialBlogsParams: BlogSearchParams = {
  searchCondition: {
    category_id: "",
    is_delete: false,
  },
  pageInfo: {
    pageNum: 1,
    pageSize: 10,
  },
};

const BlogManagement = () => {
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [editBlogData, setEditBlogData] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchParams] = useState<BlogSearchParams>(initialBlogsParams);
  const [searchText, setSearchText] = useState<string>("");

  const fetchBlogs = async () => {
    try {
      const res = await BlogService.getBlogs(searchParams);
      const pageData = res.data?.pageData ?? [];
      setBlogs(pageData);
      setFilteredBlogs(pageData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchParams]);

  const handleSearch = () => {
    const filtered = blogs.filter((blog) =>
      blog.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  const showModalCreate = () => setIsModalCreateVisible(true);
  const onSuccess = () => {
    setIsModalCreateVisible(false);
    fetchBlogs();
  };
  const handleCancel = () => {
    setIsModalCreateVisible(false);
    setIsModalDeleteVisible(false);
    setDeleteId(null);
  };
  const showModalDelete = (id: string) => {
    setDeleteId(id);
    setIsModalDeleteVisible(true);
  };
  const showModalEdit = (blogData: Blog) => {
    setEditBlogData(blogData);
    setIsModalEditVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => {
        return <div>{ellipsisText(description, 50)}</div>;
      },
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (imageUrl: string) => (
        <img
          src={imageUrl}
          alt="Blog"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt: Date) => dayjs(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Actions",
      key: "action",
      render: (record: Blog) => (
        <>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => showModalDelete(record._id)}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "blue" }} />}
            onClick={() => showModalEdit(record)}
          />
        </>
      ),
    },
  ];

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl my-5">Blog Management</h3>
      </div>

      <div className="flex flex-wrap items-center mb-4">
        <div className="flex">
          <Input
            placeholder="Search by blog name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            style={{ marginRight: 8 }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        <Button
          onClick={showModalCreate}
          icon={<PlusCircleOutlined />}
          shape="round"
          type="primary"
          className="w-full md:w-auto ml-0 md:ml-auto"
        >
          Add New Blog
        </Button>
      </div>

      <Table
        dataSource={filteredBlogs}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
        bordered
        scroll={{ x: true }}
      />

      {isModalEditVisible && editBlogData && (
        <Modal
          title="Edit Blog"
          open={isModalEditVisible}
          onCancel={() => setIsModalEditVisible(false)}
          width="80%"
          style={{ top: 20 }}
          styles={{ body: { height: "68vh", padding: 0 } }}
          footer={null}
        >
          <EditBlog
            initialValues={editBlogData}
            onSuccess={() => {
              setIsModalEditVisible(false);
              fetchBlogs();
            }}
          />
        </Modal>
      )}

      {isModalDeleteVisible && deleteId && (
        <DeleteBlog
          id={deleteId}
          onSuccess={fetchBlogs}
          onCancel={handleCancel}
        />
      )}

      <Modal
        title="Create Blog"
        open={isModalCreateVisible}
        onCancel={handleCancel}
        width="80%"
        style={{ top: 20 }}
        styles={{ body: { height: "68vh", padding: 0 } }}
        footer={null}
      >
        <CreateBlog onSuccess={onSuccess} />
      </Modal>
    </Card>
  );
};

export default BlogManagement;
