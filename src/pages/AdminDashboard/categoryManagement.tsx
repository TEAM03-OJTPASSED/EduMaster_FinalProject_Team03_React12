import { Button, Card, Table, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateCategoryModal from "../../components/Admin/AdminModals/CreateCategoryModal";
import { Category, GetCategories } from "../../models/Category.model";
import CategoryService from "../../services/category.service";
import GlobalSearchUnit from "../../components/GlobalSearchUnit";
import DeleteCategorieModal from "../../components/Admin/AdminModals/DeleteCategorieModal";
import UpdateCategory from "../../components/Admin/AdminModals/UpdateCategoryModal";

const initialCategoriesParam: GetCategories = {
  pageInfo: {
    pageSize: 10,
    pageNum: 1,
  },
  searchCondition: { keyword: "", status: "active", is_deleted: false },
};

const CategoryManagement = () => {
  const [searchParams, setSearchParams] = useState<GetCategories>(
    initialCategoriesParam
  );
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentCategorie, setCurrentCategorie] = useState<Category | null>(
    null
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);

  const fetchCategories = async () => {
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
  }, [searchParams]);

  const handleSearch = (values: Record<string, any>) => {
    setSearchParams({
      pageInfo: searchParams.pageInfo,
      searchCondition: {
        ...searchParams.searchCondition, // Spread existing searchCondition fields
        keyword: values.keyword,
      },
    });
  };

  const handleEdit = (record: Category) => {
    setCurrentCategorie(record);
    setEditVisible(true);
  };

  const handleDeleteConfirm = async (userId: string) => {
    await CategoryService.deleteCategory(userId);
    fetchCategories();
    setDeleteModal(false);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Parent Category",
      dataIndex: "parent_cat",
      key: "parent_cat",
    },
    {
      title: "Actions",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setCurrentCategorie(record);
              setDeleteModal(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Category Management</h3>
      </div>

      <div className="flex flex-wrap items-center mb-4">
        <GlobalSearchUnit
          placeholder="Search By Course Name"
          onSubmit={handleSearch}
        />
        <Button
          onClick={() => setCreateVisible(true)}
          icon={<PlusCircleOutlined />}
          variant="solid"
          color="primary"
          className="w-full md:w-auto ml-0 md:ml-auto"
        >
          Add New Category
        </Button>
      </div>

      <Table
        dataSource={categories}
        columns={columns}
        pagination={{
          total,
          showSizeChanger: true,
          onChange: (page) =>
            setSearchParams({
              ...searchParams,
              pageInfo: { ...searchParams.pageInfo, pageNum: page },
            }),
        }}
        rowKey="_id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: "max-content" }}
      />

      {/* Modal for Create */}
      <CreateCategoryModal
        visible={createVisible}
        onClose={() => setCreateVisible(false)}
        onSave={fetchCategories}
      />
      <DeleteCategorieModal
        visible={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onDelete={() => handleDeleteConfirm(currentCategorie?._id!)}
        userName={currentCategorie?.name || "Undefined User"}
      />
      <UpdateCategory
        key={currentCategorie?._id}
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        category={currentCategorie ?? ({} as Category)}
        onSave={fetchCategories}
      />
    </Card>
  );
};

export default CategoryManagement;
