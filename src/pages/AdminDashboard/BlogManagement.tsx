import { Button, Card, Input, Modal, Table, Select, Tag } from "antd";
import { SearchOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CreateBlog from "./blog/CreateBlog";
import DeleteBlog from "./blog/DeleteBlog";
import { Blog } from "../../models/Blog.model";
import { BlogSearchParams } from "../../models/SearchInfo.model";
import BlogService from "../../services/blog.service";
import EditBlog from "./blog/EditBlog";

const BlogManagement = () => {
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [editBlogData, setEditBlogData] = useState<Blog | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fetchedBlogs, setFetchedBlogs] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchText, setSearchText] = useState("");

  const fetchBlogs = async () => {
    try {
      const searchParams: BlogSearchParams = {
        searchCondition: {
          category_id: "",
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 100,
        },
      };
      const res = await BlogService.getBlogs(searchParams);
      const pageData = res.data?.pageData ?? [];
      setFetchedBlogs(pageData);
      setBlogs(pageData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filteredBlogs = selectedCategories.length
      ? fetchedBlogs.filter((blog) => selectedCategories.includes(blog.category_id))
      : fetchedBlogs;
    setBlogs(filteredBlogs);
  }, [selectedCategories, fetchedBlogs]);

  const showModalCreate = () => setIsModalCreateVisible(true);

  const handleSelectChange = (values: string[]) => setSelectedCategories(values);

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
            onClick={() => showModalEdit(record)} // Pass full record
          />
        </>
      ),
    },
  ];

  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Blog Management</h3>
      </div>
      <div className="flex flex-wrap items-center mb-4">
        <Input
          placeholder="Search By Blog Name"
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3 mb-2 md:mb-0"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          mode="multiple"
          allowClear
          placeholder="Select categories"
          value={selectedCategories}
          onChange={handleSelectChange}
          className="w-full md:w-1/4 mb-2 md:mb-0 md:ml-3"
          style={{ minWidth: '200px' }}
        />
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
        dataSource={blogs}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
        bordered
        scroll={{ x: true }}
      />

      {isModalEditVisible && editBlogData && (
        <Modal
          title="Edit Blog"
          visible={isModalEditVisible}
          onCancel={() => setIsModalEditVisible(false)}
          width="80%"
          style={{ top: 20 }}
          bodyStyle={{ height: "68vh", padding: 0 }}
          footer={null}
        >
          <EditBlog
            initialValues={editBlogData} // Pass the full blog data for editing
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
        bodyStyle={{ height: "68vh", padding: 0 }}
        footer={null}
      >
        <CreateBlog onSuccess={onSuccess} />
      </Modal>
    </Card>
  );
};

export default BlogManagement;
