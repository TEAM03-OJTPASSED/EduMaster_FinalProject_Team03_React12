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
  return (
    <div>
      {items.map((review) => (
        <div key={review._id} className="p-4 border-b border-gray-300">
          <p><strong>Comment:</strong> {review.comment}</p>
          <p><strong>Rating:</strong> {review.rating}</p>
          <p><strong>Created At:</strong> {new Date(review.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};