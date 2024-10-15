import { SetStateAction, useState } from "react";
import { Overview } from "./Detail/Overview";
import { Curriculum } from "./Detail/Curriculum";
import { Instructor } from "./Instructor";
import { Reviews } from "./Detail/Review"; // Assuming you have a Review component

type Course = {
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
};

interface Instructor {
  email: string;
  name: string;
  google_id: string;
  role: string;
  status: boolean;
  description: string;
  phone_number: string;
  avatar_url: string;
  video_url: string;
  is_verified: boolean;
  token_version: number;
  balance: number;
  balance_total: number;
  bank_name: string;
  bank_account_no: string;
  bank_account_name: string;
  is_deleted: boolean;
  _id: string;
  dob: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

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
type Lesson = {
  name: string;
  course_id: string;
  session_id: string;
  lesson_type: "video" | "article" | "quiz";
  description: string;
  video_url: string;
  image_url: string;
  full_time: number;
  position_order: number;
};
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
interface Instructor {
  email: string;
  name: string;
  google_id: string;
  role: string;
  status: boolean;
  description: string;
  phone_number: string;
  avatar_url: string;
  video_url: string;
  is_verified: boolean;
  token_version: number;
  balance: number;
  balance_total: number;
  bank_name: string;
  bank_account_no: string;
  bank_account_name: string;
  is_deleted: boolean;
  _id: string;
  dob: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
const sampleInstructor: Instructor = {
  email: "tamoki1110@gmail.com",
  name: "instructor",
  google_id: "",
  role: "instructor",
  status: true,
  description:
    "LearnPress is a comprehensive WordPress LMS Plugin for WordPress. This is one of the best WordPress LMS Plugins which can be used to easily create & sell courses online.",
  phone_number: "0938947221",
  avatar_url: "https://picsum.photos/seed/picsum/200/300",
  video_url:
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  is_verified: false,
  token_version: 0,
  balance: 0,
  balance_total: 0,
  bank_name: "TPBank",
  bank_account_no: "10837054501",
  bank_account_name: "Tamoki Loi",
  is_deleted: false,
  _id: "66fe0cde171d976a891947e3",
  dob: "2024-10-03T03:17:50.593Z",
  created_at: "2024-10-03T03:17:50.593Z",
  updated_at: "2024-10-03T03:17:50.593Z",
  __v: 0,
};

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

const sampleReviews: Review[] = [
  {
    _id: "6680e264e19995122837e322",
    user_id: "6680d54954c31267eb217f55",
    course_id: "667ecee48039581edcd01af5",
    comment: "Course is very good!",
    rating: 3,
    is_deleted: false,
    created_at: "2024-06-30T04:43:16.652Z",
    updated_at: "2024-06-30T05:05:21.619Z",
    __v: 0,
  },
  {
    _id: "6680e264e19995122837e323",
    user_id: "6680d54954c31267eb217f56",
    course_id: "667ecee48039581edcd01af6",
    comment: "Excellent course!",
    rating: 5,
    is_deleted: false,
    created_at: "2024-06-30T04:43:16.652Z",
    updated_at: "2024-06-30T05:05:21.619Z",
    __v: 0,
  },
  {
    _id: "6680e264e19995122837e324",
    user_id: "6680d54954c31267eb217f57",
    course_id: "667ecee48039581edcd01af7",
    comment: "Not bad, but could be better.",
    rating: 2,
    is_deleted: false,
    created_at: "2024-06-30T04:43:16.652Z",
    updated_at: "2024-06-30T05:05:21.619Z",
    __v: 0,
  },
  {
    _id: "6680e264e19995122837e323",
    user_id: "6680d54954c31267eb217f57",
    course_id: "667ecee48039581edcd01af7",
    comment: "Not bad, but could be better.",
    rating: 2,
    is_deleted: false,
    created_at: "2024-06-30T04:43:16.652Z",
    updated_at: "2024-06-30T05:05:21.619Z",
    __v: 0,
  },
];



export const Detail = () => {
  const [selected, setSelected] = useState("overview");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex">
      <div className="border-2 border-gray-200 rounded-lg mt-12 w-2/3">
        <div className="flex justify-between items-center">
          {["overview", "curriculum", "instructor", "reviews"].map((tab) => (
            <label
              key={tab}
              className="w-1/4 text-center font-semibold cursor-pointer"
            >
              <input
                type="radio"
                name="tab"
                value={tab}
                checked={selected === tab}
                onChange={handleChange}
                className="hidden"
              />
              <div
                className={`p-2 ${
                  selected === tab
                    ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-gray-200"
                    : "bg-white-200 border-b-2 border-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            </label>
          ))}
        </div>

        <div className="p-4 bg-neutral-100">
          {selected === "overview" && <Overview a={a} />}
          {selected === "curriculum" && (
            <Curriculum courses={sampleCourses} lessons={sampleLessons} />
          )}
          {selected === "instructor" && <Instructor items={sampleInstructor} />}
          {selected === "reviews" && <Reviews items={sampleReviews} />}
        </div>
      </div>
      <div className="w-1/3"></div>
    </div>
  );
};
