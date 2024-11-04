import { Modal, message } from "antd";
import BlogService from "../../../services/blog.service";


interface DeleteBlogProps {
  id: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const DeleteBlog: React.FC<DeleteBlogProps> = ({ id, onSuccess, onCancel }) => {
  const handleDelete = async () => {
    try {
      const response = await BlogService.deleteBlog(id);
      if (response.success) {
        message.success("Blog deleted successfully");
        onSuccess(); // Call the success callback to refresh the blog list
        onCancel(); // Close the modal
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error("Error deleting blog");
    }
  };

  return (
    <Modal
      title="Confirm Deletion"
      visible={true}
      onOk={handleDelete}
      onCancel={onCancel}
      okText="Delete"
      cancelText="Cancel"
    >
      <p>Are you sure you want to delete this blog?</p>
    </Modal>
  );
};

export default DeleteBlog;
