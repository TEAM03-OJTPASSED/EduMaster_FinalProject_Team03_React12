export interface Lesson {
  _id: string;
  name: string;
  user_id: string;
  course_id: string;
  session_id: string;
  lesson_type: string;
  description: string;
  video_url: string;
  image_url: string;
  full_time: number;
  position_order: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  user_name: string;
  course_name: string;
  session_name: string;
};

export interface LessonRequest {
  name: string;
  course_id: string;
  session_id: string;
  lesson_type: string;
  description: string;
  video_url: string;
  image_url: string;
  full_time: number;
  position_order: number;
}