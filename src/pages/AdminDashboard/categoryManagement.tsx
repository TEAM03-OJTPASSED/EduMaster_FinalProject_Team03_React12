import { Button, Card, Input, Modal, Select, Table, Form } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import CreateCategoryModal from "../../components/Admin/AdminModals/CreateCategoryModal";
import UpdateCategoryModal from "../../components/Admin/AdminModals/UpdateCategoryModal";

const { Option } = Select;

const CategoryManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleDelete = (id: string) => {
    // Xử lý xóa ở đây
    console.log("Deleted record ID: ", id);
    setDataSource((prevData) => prevData.filter((item) => item.key !== id));
  };

  // Show Create Modal
  const showModalCreate = () => {
    setIsCreateModalVisible(true);
  };

  // Show Edit Modal with existing data
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

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "Photography & Video",
      parentCat: "	N/A",
    },
    {
      key: "2",
      name: "Education",
      parentCat: "N/A",
    },
    {
      key: "3",
      name: "Music Production",
      parentCat: "Music",
    },
  ]);
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
      render: (_, record) => (
        <>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDelete(record.key)}
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
      <div className="flex">
        <h3 className="text-2xl my-5">Category Management</h3>
        <div className="flex items-center mx-3">
          <Button
            onClick={showModalCreate}
            icon={<PlusCircleOutlined />}
            shape="round"
            variant="solid"
            color="primary"
            className="items-center"
          >
            Create Category
          </Button>
        </div>
      </div>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        style={{ width: 200 }}
        placeholder="Select a category"
      >
        <Option value="parent">Parent Category</Option>
        <Option value="sub">Sub Category</Option>
      </Select>
      <Input
        placeholder="Search By Category Name"
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

      {/* Modal for Create */}
      <CreateCategoryModal
        visible={isCreateModalVisible}
        onCreate={handleOkCreate}
        onCancel={handleCancel}
        form={form}
      />

      {/* Modal for Edit */}
      <UpdateCategoryModal
        visible={isEditModalVisible}
        onUpdate={handleOkEdit}
        onCancel={handleCancel}
        form={form}
      />
    </Card>
  );
};

export default CategoryManagement;
