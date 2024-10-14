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
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    originalElement: React.ReactNode
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

  const calculateRatingCounts = (items: Review[]) => {
    const counts = [0, 0, 0, 0, 0];
    items.forEach((item) => {
      if (item.rating >= 1 && item.rating <= 5) {
        counts[item.rating - 1]++;
      }
    });
    return counts;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-orange-500" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      );
    }
    return stars;
  };

  const renderRatingSummary = (counts: any[]) => {
    return counts.map((count, index) => {
      const percentage = ((count / currentItems.length) * 100).toFixed(0);
      return (
        <div key={index} className="flex items-center font-exo text-sm">
          <span className="w-12 flex items-center">
            {renderStars(index + 1)}
          </span>
          <span className="w-16 px-4">{percentage}%</span>
          <div className="w-full bg-gray-200 rounded h-2 mx-2">
            <div
              className="bg-orange-500 h-2 rounded"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      );
    });
  };

  const ratingCounts = calculateRatingCounts(items);

  return (
    <div>
      <div>
        <div className="font-exo font-bold text-lg">Comment</div>
        <div>
          <div className="flex items-center mb-4">
            <span className="font-exo font-bold text-5xl mr-2">
              {(
                items.reduce((acc, item) => acc + item.rating, 0) / items.length
              ).toFixed(1)}
            </span>
            <div>
              <div className="flex items-center">
                {renderStars(
                  items.reduce((acc, item) => acc + item.rating, 0) /
                    items.length
                )}
              </div>
              <div>based on {items.length} ratings</div>
            </div>
          </div>
        </div>
        <div className="mb-4">{renderRatingSummary(ratingCounts)}</div>
      </div>
      {currentItems.map((items) => (
        <div
          key={items._id}
          className="flex gap-5 font-exo p-4 border-t border-gray-300"
        >
          <div className="w-10">
            <img
              className="rounded-full"
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              alt="avatar"
            />
          </div>
          <div className="grow">
            <div className="flex justify-between">
              <div className="font-bold">{items.user_id}</div>
              <div className="text-sm">{items.created_at}</div>
            </div>
            <div className="text-sm pt-2">{items.comment}</div>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={items.length}
          onChange={handlePageChange}
          itemRender={itemRender}
          className="mt-4"
        />
      </div>
    </div>
  );
};
