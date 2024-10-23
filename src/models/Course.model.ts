import { Session } from "./Session.model";

export type Course = {
  _id: string;
  name: string;
  category_id: string;
  description: string;
  content: string;
  status: string;
  video_url: string;
  image_url: string;
  tag: string[];
  level: string;
  price: number;
  discount: number;
  enrolled: number;
  created_at: string;
  updated_at: string;
  instructor_id: string;
  instructor_name: string;
  category_name: string;
  price_paid: number;
  full_time: number;
  session_list: Session[];
  is_in_cart: boolean;
  is_purchased: boolean;
  average_rating: number;
  review_count: number;
};