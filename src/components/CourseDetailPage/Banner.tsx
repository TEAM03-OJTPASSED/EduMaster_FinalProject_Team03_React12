import { useCustomNavigate } from "../../hooks/customNavigate";
import { Course } from "../../models/Course.model";
import { CourseSummary } from "./CourseSummary";

type Props = {
  course: Course;
  isPurchased: boolean;
  id: string;
};
export const Banner = ({ id, course, isPurchased }: Props) => {
  const totalLessons = course.session_list.reduce((sum, session) => {
    return sum + session.lesson_list.length;
  }, 0);
  const navigate = useCustomNavigate();
  return (
    <div className="font-exo flex flex-col bg-orange-50 px-20 lg:-mx-40 -mx-24 pb-10">
      <div className="flex gap-8 pt-10">
        <div className="lg:w-2/3 flex flex-col gap-4 items-start">
          <div className="bg-orange-500 text-white font-bold px-4 py-2 rounded-lg">
            {course.category_name}
          </div>
          <div className="font-jost text-5xl font-bold text-gradient">
            {course.name}
          </div>
          <div className="text-lg">{course.description}</div>
          <div className="text-lg cursor-pointer">
            <div className="text-lg cursor-pointer">
              Instructor:{" "}
              <span
                className="px-2 underline"
                onClick={() => {
                  navigate(`/profile/${course.instructor_id}`);
                }}
              >
                {course.instructor_name}
              </span>
            </div>
            {isPurchased ? (
              <div className="flex items-baseline gap-4">
                <div
                  className="bg-orange-500 text-white text-2xl font-semibold px-8 py-4 rounded cursor-pointer"
                  onClick={() => (window.location.href = `/learn/${id}`)}
                >
                  Learn Now
                </div>
                <div className="font-light">Already enrolled</div>
              </div>
            ) : (
              <div className="flex">
                <div className="bg-orange-500 text-white text-2xl font-semibold px-8 py-4 rounded cursor-pointer">
                  Start Now
                </div>
                <div className="flex flex-col items-start justify-center ml-4">
                  {course.discount && course.discount > 0 ? (
                    <>
                      <div className="text-xl line-through text-gray-500">
                        US${course.price.toFixed(2)}
                      </div>
                      <div className="text-2xl font-bold text-orange-500">
                        US${course.price_paid.toFixed(2)}
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-orange-500">
                      ${course.price.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="hidden lg:w-1/3 lg:block relative">
            <div className="absolute inset-0">
              <img
                src={course.image_url}
                alt="Course"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="relative flex justify-center">
          <CourseSummary
            time={course.full_time}
            student={course.enrolled}
            level={course.level}
            lessons={totalLessons}
            quizzes={0}
          />
        </div>
      </div>
    </div>
  );
};
