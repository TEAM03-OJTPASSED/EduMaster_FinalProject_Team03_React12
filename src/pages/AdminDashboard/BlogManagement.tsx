import { useEffect, useState } from "react";
import { Button, Card, Input, Select, Spin, Table } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { postRequest } from "../../services/httpsMethod";
import { Blog, BlogResponse } from "../../models/Blog.model";

const { Option } = Select;

const categories = ["Technology", "Health", "Education", "Lifestyle", "Business"];

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await postRequest<BlogResponse>("/api/blog/search", {
        searchCondition: { category_id: "", is_delete: false },
        pageInfo: { pageNum: 1, pageSize: 10 },
      });
      if (res?.data?.pageData) {
        setBlogs(res.data.pageData);
      } else {
        console.error("No data in response.");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSearch = () => {
    // Filter blogs based on search text and selected categories
    const filteredBlogs = blogs.filter(
      (blog) =>
        blog.name.toLowerCase().includes(searchText.toLowerCase()) &&
        selectedCategories.includes(blog.category_name)
    );
    setBlogs(filteredBlogs);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Category", dataIndex: "category_name", key: "category_name" },
    { title: "User", dataIndex: "user_name", key: "user_name" },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (url: string) => <img src={url} alt="Blog" style={{ width: "100px" }} />,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <Card>
      <h3 className="text-2xl my-5">Blog Management</h3>
      <div className="flex justify-between">
        <Input
          placeholder="Search By Blog Name"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "45%",
            height: "40px",
            marginBottom: "20px",
            marginRight: "10px",
            borderRadius: "4px",
          }}
        />
        <Select
          mode="multiple"
          allowClear
          placeholder="Select categories"
          value={selectedCategories}
          onChange={(values) => setSelectedCategories(values)}
          style={{ width: '200px', marginBottom: '16px' }}
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
        <Button
          onClick={() => console.log("Open Create Blog Modal")}
          icon={<PlusCircleOutlined />}
          shape="round"
          type="primary"
          style={{ marginBottom: "20px" }}
        >
          Create Blog
        </Button>
      </div>

      <Button type="primary" onClick={handleSearch} style={{ marginBottom: 20 }}>
        Search
      </Button>

      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={blogs}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="_id"
          bordered
        />
      )}
    </Card>
  );
};

export default BlogManagement;
