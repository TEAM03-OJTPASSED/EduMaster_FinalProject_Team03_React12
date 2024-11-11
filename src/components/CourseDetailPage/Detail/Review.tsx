import { useState, useMemo, useEffect } from "react";
import { Pagination, Rate, Dropdown, Menu} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { GetReviews, Review } from "../../../models/Review.model";
import ReviewService from "../../../services/review.service";
import dayjs from 'dayjs';

type Props = {
  label?: boolean;
  courseId: string;
};

export const Reviews = ({ label, courseId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const pageSize = 3;

  const handleEdit = (reviewId: string) => {
    console.log("Edit review:", reviewId);
    // Add edit functionality here
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const searchParams: GetReviews = {
          searchCondition: {
            course_id: "",
            rating: 0,
            is_instructor: false,
            is_rating_order: false,
            is_deleted: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 100,
          },
        };
        const res = await ReviewService.getReviews(searchParams);
        const pageData = res.data?.pageData ?? [];
        setReviews(pageData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId: string) => {
    console.log("Delete review:", reviewId);
    try {
        await ReviewService.deleteReview(reviewId);
    } catch (error) {

    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getReviewsByCourseId = (courseId: string) => {
    return reviews.filter((review) => review.course_id === courseId);
  };

  const courseReviews = useMemo(() => getReviewsByCourseId(courseId), [reviews, courseId]);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = courseReviews.slice(startIndex, endIndex);

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
        className={`px-4 py-1 rounded-full border ${isActive
          ? "bg-orange-500 text-white"
          : "bg-neutral-100 text-black hover:bg-orange-500 hover:text-white border border-gray-300"
          }`}
      >
        {page}
      </button>
    );
  };

  const calculateRatingCounts = (courseReviews: Review[]) => {
    const counts = [0, 0, 0, 0, 0];
    courseReviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[review.rating - 1]++;
      }
    });
    return counts;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-orange-500" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    ));
  };

  const renderRatingSummary = useMemo(() => {
    const totalRatings = courseReviews.length;
    const counts = calculateRatingCounts(courseReviews);
    return counts.map((count, index) => {
      const percentage = ((count / totalRatings) * 100).toFixed(0);
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
  }, [courseReviews]);

  const averageRating = (
    courseReviews.reduce((acc, review) => acc + review.rating, 0) /
    courseReviews.length
  ).toFixed(1);

  return (
    <div>
      {label && <div className="font-exo font-bold text-lg">Comment</div>}
      <div className="flex items-center mb-4">
        <span className="font-exo font-bold text-5xl mr-2">
          {averageRating}
        </span>
        <div>
          <div className="flex items-center">
            {renderStars(Math.round(Number(averageRating)))}
          </div>
          <div>based on {courseReviews.length} ratings</div>
        </div>
      </div>
      <div className="mb-4">{renderRatingSummary}</div>

      {currentItems.map((review) => (
        <div key={review._id} className="flex gap-5 font-exo p-4 border-t border-gray-300">
          <div className="w-10">
            <img
              className="rounded-full"
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              alt="avatar"
            />
          </div>
          <div className="grow">
            <div className="flex justify-between">
              <div className="font-bold">{review.reviewer_name}</div>
              <div className="flex items-center gap-2">
                <div className="text-sm">
                  {dayjs(review.created_at).format('DD/MM/YYYY')}
                </div>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="edit" onClick={() => handleEdit(review._id)}>
                        Edit
                      </Menu.Item>
                      <Menu.Item key="delete" danger onClick={() => handleDelete(review._id)}>
                        Delete
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                >
                  <EllipsisOutlined className="text-lg cursor-pointer" />
                </Dropdown>
              </div>
            </div>

            <div className="flex items-start mt-1">
              <Rate disabled defaultValue={review.rating} />
            </div>
            <div className="text-sm pt-2">{review.comment}</div>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={courseReviews.length}
          onChange={handlePageChange}
          itemRender={itemRender}
          className="mt-4"
        />
      </div>
    </div>
  );
};
