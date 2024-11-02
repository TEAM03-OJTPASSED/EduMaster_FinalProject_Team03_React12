import { useEffect, useState } from "react";
import { Button, Card, Input, Modal, Table, Select, Spin } from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import CreateBlog from "./blog/CreateBlog";
import { Blog } from "../../models/Blog.model";
import { BlogSearchParams } from "../../models/SearchInfo.model";
import BlogService from "../../services/blog.service";
import { Category, GetCategories } from "../../models/Category.model";
import CategoryService from "../../services/category.service";

const { Option } = Select;

const BlogManagement = () => {
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await BlogService.getBlogs(searchParams);
      console.log("res:", res.data?.pageData);
      setBlogs(res?.data?.pageData ?? []);
    } finally {
      setLoading(false);
    }
  };

  const initialCategoriesParams: GetCategories = {
    pageInfo: {
      pageNum: 1,
      pageSize: 100,
    },
    searchCondition: {
      keyword: "",
      is_deleted: false,
    },
  };

  const fetchCategories = async () => {
    const categoriesResponse = await CategoryService.getCategories(
      initialCategoriesParams
    );
    setListCategories(categoriesResponse.data?.pageData ?? []);
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const showModalCreate = () => {
    setIsModalCreateVisible(true);
  };

  const handleSelectChange = (values: string[]) => {
    setSelectedCategories(values);
  };

  const handleCancel = () => {
    setIsModalCreateVisible(false);
  };

  const handleDelete = (id: string) => {
    // Xử lý xóa ở đây
    console.log("Deleted record ID: ", id);
  };
  const showModalEdit = (record: any) => {
    console.log("Deleted record ID: ", record);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (imageUrl: string) => (
        <img
          src={imageUrl}
          alt="Blog"
          style={{ width: "100px", height: "100px" }}
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
      render: () => (
        <>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDelete}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "blue" }} />}
            onClick={() => showModalEdit}
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
          className="w-full md:w-1/3 mb-2 md:mb-0"
        />
        <Select
          mode="multiple"
          allowClear
          placeholder="Select categories"
          value={selectedCategories}
          onChange={handleSelectChange}
          className="w-full md:w-1/4 mb-2 md:mb-0 md:ml-3"
          style={{ minWidth: "200px" }} // Optional: Set a minimum width
        >
          {listCategories.map((category) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
        </Select>
        <Button
          onClick={showModalCreate}
          icon={<PlusCircleOutlined />}
          shape="round"
          variant="solid"
          type="primary"
          className="w-full md:w-auto ml-0 md:ml-auto"
        >
          Add New Blog
        </Button>
      </div>

      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={blogs}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="_id"
          bordered
          scroll={{ x: true }}
        />
      )}

      <Modal
        title="Create Blog"
        open={isModalCreateVisible}
        onCancel={handleCancel}
      >
        <CreateBlog
          mode="create"
          onFinished={(values) => {
            console.log("Create values:", values);
            setIsModalCreateVisible(false);
          }}
        />
      </Modal>
    </Card>
  );
};

export default BlogManagement;
