export interface Lesson {
  _id: string;
  name: string;
  description: string;
  lesson_type: string;
  video_url: string;
  duration: number;
  position_order: number;
}[];