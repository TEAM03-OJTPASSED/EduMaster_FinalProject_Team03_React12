import { Session } from "./Session.model";

export type Course = {
  average_rating: number;
  category_id: string;
  category_name: string;
  content: string;
  created_at: string;
  description: string;
  discount: number;
  full_time: number;
  image_url: string;
  instructor_id: string;
  instructor_name: string;
  is_in_cart: boolean;
  is_purchased: boolean;
  name: string;
  price: number;
  price_paid: number;
  review_count: number;
  session_list: Session[];
  status: "new" | "ongoing" | "completed";
  updated_at: string;
  video_url: string;
};