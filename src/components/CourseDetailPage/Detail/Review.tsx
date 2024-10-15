import React, { useState } from "react";
import { Pagination } from "antd";

interface Review {
  _id: string;
  user_id: string;
  course_id: string;
  comment: string;
  rating: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
}

type Props = {
  items: Review[];
};

export const Reviews = ({ items }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = items.slice(startIndex, endIndex);

  const itemRender = (
    page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next"
  ) => {
    if (type === "prev") {
      return (
        <button className="px-4 py-1 bg-neutral-100 font-bold text-white rounded-full border border-gray-300 hover:bg-orange-500 hover:text-white">
          {"<"}
        </button>
      );
    }
    if (type === "next") {
      return (
        <button className="px-4 py-1 bg-neutral-100 font-bold text-white rounded-full border border-gray-300 hover:bg-orange-500 hover:text-white">
          {">"}
        </button>
      );
    }
    if (type === "jump-prev" || type === "jump-next") {
      return (
        <button className="px-4 py-1 bg-neutral-100 font-bold text-white rounded-full hover:bg-orange-500 hover:text-white">
          {"..."}
        </button>
      );
    }
    const isActive = page === currentPage;
    return (
      <button
        className={`px-4 py-1 rounded-full border  ${
          isActive
            ? "bg-orange-500 text-white"
            : "bg-neutral-100 text-black hover:bg-orange-500 hover:text-white border border-gray-300"
        }`}
      >
        {page}
      </button>
    );
  };

  return (
    <div>
      {currentItems.map((items) => (
        <div key={items._id} className="font-exo p-4 border-b border-gray-300">
          <div className="flex justify-between">
            <div className="font-bold">{items.user_id}</div>
            <div className="text-sm">{items.created_at}</div>
          </div>
          <div className="text-sm pt-2">{items.comment}</div>
        </div>
      ))}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={items.length}
        onChange={handlePageChange}
        itemRender={itemRender}
        className="mt-4"
      />
    </div>
  );
};
