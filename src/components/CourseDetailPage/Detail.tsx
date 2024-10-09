import { SetStateAction, useState } from "react";
import { Overview } from "./Detail/Overview";
import { Curriculum } from "./Detail/Curriculum";

const sampleCourses: Course[] = [
  {
    name: "Nodejs Beginner 2027",
    category_id: "667d6f9887d3be7cec496e7a",
    user_id: "667ed37ca20b693592628508",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content: "",
    status: "new",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    price: 60000000,
    discount: 0,
    is_deleted: false,
    _id: "668213c669a3f12e2e95eb88",
    created_at: "2024-07-01T02:26:14.621Z",
    updated_at: "2024-07-01T02:26:14.621Z",
    __v: 0,
  },
  {
    name: "React Advanced 2027",
    category_id: "667d6f9887d3be7cec496e7b",
    user_id: "667ed37ca20b693592628509",
    description:
      "Advanced concepts of React including hooks, context, and more.",
    content: "",
    status: "ongoing",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    price: 80000000,
    discount: 10,
    is_deleted: false,
    _id: "668213c669a3f12e2e95eb89",
    created_at: "2024-07-01T02:26:14.621Z",
    updated_at: "2024-07-01T02:26:14.621Z",
    __v: 0,
  },
];

const sampleLessons: Lesson[] = [
  {
    name: "Lesson 1: Introduction to Node.js",
    course_id: "668213c669a3f12e2e95eb88",
    session_id: "667f937e734773e8a46c8a1b",
    lesson_type: "video",
    description: "An introduction to Node.js and its features.",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 30,
    position_order: 1,
  },
  {
    name: "Lesson 2: Setting up the Environment",
    course_id: "668213c669a3f12e2e95eb88",
    session_id: "667f937e734773e8a46c8a1c",
    lesson_type: "video",
    description: "Setting up the development environment for Node.js.",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 45,
    position_order: 2,
  },
  {
    name: "Lesson 1: Introduction to React",
    course_id: "668213c669a3f12e2e95eb89",
    session_id: "667f937e734773e8a46c8a1d",
    lesson_type: "video",
    description: "An introduction to React and its features.",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 35,
    position_order: 1,
  },
  {
    name: "Lesson 2: Advanced Hooks",
    course_id: "668213c669a3f12e2e95eb89",
    session_id: "667f937e734773e8a46c8a1e",
    lesson_type: "video",
    description: "Deep dive into advanced hooks in React.",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 50,
    position_order: 2,
  },
];

type Props = {
  a: string;
};
export const Detail = ({ a }: Props) => {
  const [selected, setSelected] = useState("overview");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex">
      <div className="border-2 border-gray-200 rounded-lg mt-12 ml-20 w-2/3">
        <div className="flex justify-between items-center">
          <label className="w-1/5 text-center font-semibold cursor-pointer">
            <input
              type="radio"
              name="tab"
              value="overview"
              checked={selected === "overview"}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`p-2 ${
                selected === "overview"
                  ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-r-gray-200"
                  : "bg-white-200 border-b-2 border-gray-200"
              }`}
            >
              Overview
            </div>
          </label>
          <label className="w-1/5 text-center font-semibold cursor-pointer">
            <input
              type="radio"
              name="tab"
              value="curriculum"
              checked={selected === "curriculum"}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`p-2 ${
                selected === "curriculum"
                  ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-x-gray-200"
                  : "bg-white-200 border-b-2 border-gray-200"
              }`}
            >
              Curriculum
            </div>
          </label>
          <label className="w-1/5 text-center font-semibold cursor-pointer">
            <input
              type="radio"
              name="tab"
              value="instructor"
              checked={selected === "instructor"}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`p-2 ${
                selected === "instructor"
                  ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-x-gray-200"
                  : "bg-white-200 border-b-2 border-gray-200"
              }`}
            >
              Instructor
            </div>
          </label>
          <label className="w-1/5 text-center font-semibold cursor-pointer">
            <input
              type="radio"
              name="tab"
              value="qa"
              checked={selected === "qa"}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`p-2 ${
                selected === "qa"
                  ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-x-gray-200"
                  : "bg-white-200 border-b-2 border-gray-200"
              }`}
            >
              Q&A
            </div>
          </label>
          <label className="w-1/5 text-center font-semibold cursor-pointer">
            <input
              type="radio"
              name="tab"
              value="reviews"
              checked={selected === "reviews"}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`p-2 ${
                selected === "reviews"
                  ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-l-gray-200"
                  : "bg-white-200 border-b-2 border-gray-200"
              }`}
            >
              Reviews
            </div>
          </label>
        </div>
        <div className="p-4 bg-neutral-100">
          {selected === "overview" && <Overview a="1" />}
          {selected === "curriculum" && (
            <Curriculum courses={sampleCourses} lessons={sampleLessons} />
          )}
          {selected === "instructor" && (
            <div>Instructor content goes here.</div>
          )}
          {selected === "qa" && <div>Q&A content goes here.</div>}
          {selected === "reviews" && <div>Reviews content goes here.</div>}
        </div>
      </div>
      <div className="w-1/3"></div>
    </div>
  );
};
