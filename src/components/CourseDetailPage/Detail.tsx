import { useState } from "react";
import { Course } from "../../models/Course.model";
import { Session } from "../../models/Session.model";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Reviews } from "./Detail/Review";

type Props = {
  isEnrolled: boolean;
  course?: Course;
  session?: Session;
};
type Review = {
  _id: string;
  user_id: string;
  course_id: string;
  comment: string;
  rating: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
};
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
export const Detail = ({ isEnrolled, course, session }: Props) => {
  const [expandedSession, setExpandedSession] = useState<number | null>(null);

  const toggleSession = (index: number) => {
    setExpandedSession(expandedSession === index ? null : index);
  };

  return isEnrolled && course ? (
    <div className="font-exo flex mt-12">
      <div className="w-2/3">
        <div className="flex flex-col">
          <div className="text-xl font-bold pb-2 pt-4">Overview</div>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: course.content }}
          />
        </div>
        <div>
          <div className="text-xl font-bold pb-2 pt-4">Curriculum</div>
          <div className="border-2 rounded-lg px-10">
            {session?.map((item, index) => (
              <div
                className={`py-5 ${
                  index === session.length - 1
                    ? "border-none pb-5"
                    : "border-b-2"
                }`}
                key={index}
              >
                <div className="flex flex-col">
                  {expandedSession === index ? (
                    <div
                      className="flex justify-between text-orange-500 text-lg cursor-pointer font-bold hover:text-orange-600"
                      onClick={() => toggleSession(index)}
                    >
                      {item.name}
                      <MdOutlineKeyboardArrowUp size={24} />
                    </div>
                  ) : (
                    <div
                      className="flex justify-between text-lg cursor-pointer font-bold hover:text-orange-600"
                      onClick={() => toggleSession(index)}
                    >
                      {item.name}
                      <MdOutlineKeyboardArrowDown
                        className="text-gray-600"
                        size={24}
                      />
                    </div>
                  )}
                  <div className="flex text-sm font-light pb-2">
                    <div className="">Session {item.position_order}</div>
                    <span className="px-2">•</span>
                    <div>{item.lesson_list.length} lessons</div>
                    <span className="px-2">•</span>
                    <div>{Math.round(item.full_time / 60)} hours</div>
                  </div>
                </div>
                <div
                  className={`transition-all duration-300 ease-out overflow-hidden ${
                    expandedSession === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div>
                    <div className="font-semibold">What you'll learn</div>
                    <div
                      className="text-sm pt-2"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <div className="font-semibold pt-2">Skill you'll gain</div>
                    <div className="text-sm flex flex-wrap gap-2 pt-2">
                      {item.tag.map((skill, index) => (
                        <div className="bg-orange-200 px-2 rounded" key={index}>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-xl font-bold pb-2 pt-4">Comment</div>
            <Reviews items={sampleReviews} label={false} />
          </div>
        </div>
      </div>
      <div className="w-1/3"></div>
    </div>
  ) : (
    <div>
      <div className="w-2/3">
        <div>
          <div>About</div>
          {course?.content}
        </div>
      </div>
      <div className="w-1/3"></div>
    </div>
  );
};
