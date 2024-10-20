export type Course = {
  name: string;
  category_id: string;
  instructor_id: string,
  instructor_name: string,
  description: string;
  content: string;
  status: "new" | "ongoing" | "completed";
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  is_deleted: boolean;
  _id: string;
  created_at: string;
  updated_at: string;
  __v: number;
};
