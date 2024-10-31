import { Button, Card, Input, Select, Table, Form, Space } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateCategoryModal from "../../components/Admin/AdminModals/CreateCategoryModal";
import UpdateCategoryModal from "../../components/Admin/AdminModals/UpdateCategoryModal";
import { Category, GetCategories } from "../../models/Category.model";
import CategoryService from "../../services/category.service";
import { useDebouncedSearch } from "../../hooks/useSearch";

const { Option } = Select;

const CategoryManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const filteredData = useDebouncedSearch(categories, searchText, 300, ["name", "parentCat"]);


  const fetchCategories = async () => {
    const searchParams: GetCategories = {
      searchCondition: {
        keyword: searchText,
        status: "active",
        is_deleted: false,
      },
      pageInfo: { pageNum, pageSize },
    };

    try {
      const response = await CategoryService.getCategories(searchParams);
      const responseData = response.data?.pageData;
      const flattenedUsers: Category[] = Array.isArray(responseData)
        ? responseData.flat() // Dùng flat() để chuyển thành User[]
        : [];
      setCategories(flattenedUsers);
      setTotal(response.data?.pageInfo?.totalItems ?? 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [pageNum, pageSize]);

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleDelete = (id: string) => {
    console.log("Deleted record ID: ", id);
  };

  const showModalCreate = () => {
    setIsCreateModalVisible(true);
  };

  const showModalEdit = (record: any) => {
    setEditingRecord(record);
    form.setFieldsValue({
      categoryName: record.name,
      description: record.description,
    });
    setIsEditModalVisible(true);
  };

  const handleOkCreate = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Create Form values: ", values);
        setIsCreateModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleOkEdit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Edit Form values: ", values);
        setIsEditModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsCreateModalVisible(false);
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Parent Category",
      dataIndex: "parentCat",
      key: "parentCat",
    },
    {
      title: "Actions",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showModalEdit(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    }
  ];

  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Category Management</h3>
      </div>

      <div className="flex flex-wrap items-center mb-4">
        <Input
          placeholder="Search By Category Name"
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3 mb-2 md:mb-0"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Select a category"
          className="w-full md:w-1/4 ml-0 md:ml-3 mb-2 md:mb-0"
        >
          <Option value="parent">Parent Category</Option>
          <Option value="sub">Sub Category</Option>
        </Select>
        <Button
          onClick={showModalCreate}
          icon={<PlusCircleOutlined />}
          variant="solid"
          color="primary"
          className="w-full md:w-auto ml-0 md:ml-auto"
        >
          Add New Category
        </Button>
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
        rowKey="_id"
        onChange={handleTableChange}
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: "max-content" }}
      />

      {/* Modal for Create */}
      <CreateCategoryModal
        open={isCreateModalVisible}
        onCreate={handleOkCreate}
        onCancel={handleCancel}
        form={form}
      />

      {/* Modal for Edit */}
      <UpdateCategoryModal
        open={isEditModalVisible}
        onUpdate={handleOkEdit}
        onCancel={handleCancel}
        form={form}
        editingRecord={editingRecord}
      />
    </Card>
  );
};

export default CategoryManagement;
