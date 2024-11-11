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

export const Detail = ({ isEnrolled, course, session }: Props) => {
  const [expandedSession, setExpandedSession] = useState<number | null>(null);

  const toggleSession = (index: number) => {
    setExpandedSession(expandedSession === index ? null : index);
  };
  console.log("Session in detail: ", session);
  return isEnrolled && course ? (
    <div className="font-exo flex mt-12">
      <div className="w-2/3">
        <div className="flex flex-col">
          <div className="text-xl font-bold pb-2 pt-4">Overview</div>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: course.content }}
          />
          <div className="text-xl font-bold pb-2 pt-4">Skill set</div>
          <div className="flex gap-2 flex-wrap">
            {course.tag &&
              course.tag.map((tag, index) => (
                <div
                  key={index}
                  className="bg-orange-200 px-2 rounded inline-block mr-2"
                >
                  {tag}
                </div>
              ))}
          </div>
        </div>
        <div>
          <div className="text-xl font-bold pb-2 pt-4">Curriculum</div>
          <div className="border-2 rounded-lg px-4">
            {Array.isArray(session) &&
              session.map((item, index) => (
                <div
                  className={`py-4 ${
                    index === session.length - 1 ? "border-none" : "border-b-2"
                  }`}
                  key={index}
                >
                  <div
                    className="flex flex-col hover:bg-orange-100 px-4 py-2 rounded cursor-pointer"
                    onClick={() => toggleSession(index)}
                  >
                    {expandedSession === index ? (
                      <div className="flex justify-between text-orange-500 text-lg cursor-pointer font-bold hover:text-orange-600">
                        {item.name}
                        <MdOutlineKeyboardArrowUp size={24} />
                      </div>
                    ) : (
                      <div
                        className="flex justify-between text-lg cursor-pointer font-bold"
                        onClick={() => toggleSession(index)}
                      >
                        {item.name}
                        <MdOutlineKeyboardArrowDown
                          className="text-gray-600"
                          size={24}
                        />
                      </div>
                    )}
                    <div className="flex text-sm font-light">
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
                    <div className="px-4 pt-2">
                      <div className="font-semibold">What you'll learn</div>
                      <div
                        className="text-sm pt-2"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                      <div className="font-semibold pt-2">
                        Skill you'll gain
                      </div>
                      <div className="text-sm flex flex-wrap gap-2 pt-2">
                        {item.tag.map((skill: string, index: number) => (
                          <div
                            className="bg-orange-200 px-2 rounded"
                            key={index}
                          >
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
            <Reviews label={false} courseId={course._id} />
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
