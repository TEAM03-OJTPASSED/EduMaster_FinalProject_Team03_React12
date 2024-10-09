import React, { useState } from "react";
import { Collapse } from "./Collapse";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

interface Lesson {
  name: string;
  course_id: string;
  session_id: string;
  lesson_type: "video" | "article" | "quiz";
  description: string;
  video_url: string;
  image_url: string;
  full_time: number;
  position_order: number;
}

interface Course {
  name: string;
  category_id: string;
  user_id: string;
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
}

type CurriculumProps = {
  courses: Course[];
  lessons: Lesson[];
};

export const Curriculum = ({ courses, lessons }: CurriculumProps) => {
  const [openCourse, setOpenCourse] = useState<string | null>(null);

  const toggleCourse = (id: string) => {
    setOpenCourse(openCourse === id ? null : id);
  };

  return (
    <div>
      {courses.map((course) => (
        <div key={course._id} className="mb-4 font-exo">
          <div
            className={`flex items-center gap-2 pt-4 px-4 bg-white font-bold rounded-t-lg cursor-pointer ${
              openCourse === course._id
                ? "text-orange-500 rounded-b-none pb-4"
                : "text-black"
            }`}
            onClick={() => toggleCourse(course._id)}
          >
            {openCourse === course._id ? (
              <MdOutlineKeyboardArrowUp fill="black"/>
            ) : (
              <MdOutlineKeyboardArrowDown fill="black" />
            )}
            {course.name}
          </div>
          {openCourse === course._id && (
            <Collapse
              items={lessons.filter(
                (lesson) => lesson.course_id === course._id
              )}
            />
          )}
          <div className="pb-4 bg-white rounded-b-lg"></div>
        </div>
      ))}
    </div>
  );
};
