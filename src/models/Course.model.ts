import { PageInfo, SearchCondition } from "./SearchInfo.model";
import { Session } from "./Session.model";

export interface Course  {
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

export interface CourseLog {
  _id: string;
  course_id: string;
  user_id: string;
  old_status: CourseStatusEnum; 
  new_status: CourseStatusEnum;
  comment: string;
  created_at: string; 
  is_deleted: boolean;
  user_name: string;
  course_name: string;
}


export interface CourseRequest {
  name: string;
  category_id: string;
  description: string;
  content: string;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
}

export interface CourseStatusUpdate {
  course_id: string;
  new_status: CourseStatusEnum;
  comment: "string"
}

enum CourseStatusEnum {
  NEW = "new",
  COMPLETED = "completed",
  WAITING_APPROVE = "waiting_approve",
  APPROVE = "approve",
  REJECT = "reject",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface GetCourses {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}

export interface GetCourseLogs {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}

