export interface Lesson {
  _id: string;
  name: string;
  description: string;
  lesson_type: string;
  video_url: string;
  full_time: number;
  position_order: number;
  is_completed: boolean;
};