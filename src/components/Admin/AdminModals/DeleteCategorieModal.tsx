import React from "react";
import { Modal, Button } from "antd";

interface DeleteCategorieModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
  userName?: string;
}

const DeleteCategorieModal: React.FC<DeleteCategorieModalProps> = ({
  visible,
  onCancel,
  onDelete,
  userName,
}) => {
  return (
    <Modal
      title="Confirm Delete Categorie"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={onDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete categorie{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>{userName}</span>?
      </p>
    </Modal>
  );
};

export default DeleteCategorieModal;
