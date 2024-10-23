import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Banner } from "../components/CourseDetailPage/Banner";
import { Detail } from "../components/CourseDetailPage/Detail";
import { LeaveAComment } from "../components/LeaveAComment";
import { DetailResponsive } from "../components/CourseDetailPage/DetailResponsive";
import { Course } from "../models/Course.model";
import { Category } from "../models/Category.model";
import { Instructor } from "../models/Instructor.model";
import { Session } from "../models/Session.model";

const token = localStorage.getItem("token");

const fetchCourse = async (courseId: string) => {
  try {
    console.log("token: ", token);
    if (token === null) {
      console.log("token null");
      const response = await axios.get(
        `https://edumaster-backend-dev.vercel.app/api/client/course/${courseId}`
      );
      return response.data;
    } else {
      console.log("not null");
      const response = await axios.get(
        `https://edumaster-backend-dev.vercel.app/api/client/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
};

const fetchCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(
      `https://edumaster-backend-dev.vercel.app/api/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

const fetchInstructor = async (instructor_Id: string) => {
  try {
    const response = await axios.get(
      `https://edumaster-backend-dev.vercel.app/api/users/${instructor_Id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching instructor:", error);
    return null;
  }
};

const CourseDetailPage = () => {
  const [showCourseInfo, setShowCourseInfo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        // Adjust this value as needed
        setShowCourseInfo(true);
        setAnimateClass("animate-float-in");
      } else {
        setAnimateClass("animate-float-out");
        setTimeout(() => setShowCourseInfo(false), 200); // Match the duration of the float-out animation
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  const [animateClass, setAnimateClass] = useState("");

  const courseId = "6713859755b6534784014184";
  useEffect(() => {
    fetchCourse(courseId).then((data) => {
      if (data) {
        console.log("data", data);
        if (data.data.is_purchased) setIsPurchased(true);
        setCourse(data.data);
        console.log("Session List: ", data.session_list);
        setSession(data.data.session_list);
      }
    });
    console.log("Course:", course);
  }, []);
  useEffect(() => {
    if (course) {
      fetchCategory(course.category_id).then((data) => {
        if (data) {
          setCategory(data.data);
        }
      });
    }
  }, [course]);
  useEffect(() => {
    if (course) {
      fetchInstructor(course.instructor_id).then((data) => {
        if (data) {
          setInstructor(data.data);
        }
      });
    }
  }, [course]);

  if (course && category && instructor) {
    return (
      <div className="relative">
        <div className="inset-x-0 flex flex-col">
          <Banner
            courseId={courseId}
            category={category.name}
            instructor={instructor.name}
            title={course.name}
            overview={course.description}
            imageUrl={course.image_url}
            price={course.price}
            discount={course.discount}
            isPurchased={isPurchased}
          />
        </div>
        <div className="hidden lg:block">
          <Detail
            isEnrolled={true}
            course={course || undefined}
            session={session || undefined}
          />
        </div>
        <div className="lg:hidden">
          <DetailResponsive />
        </div>
        <div className="lg:w-2/3">
          <LeaveAComment />
        </div>
        {showCourseInfo && (
          <div
            className={`fixed z-10 w-1/3 px-8 right-0 top-8 ${animateClass} `}
          >
            <div className="relative h-[20vh] bg-orange-200 rounded-t-lg">
              <div className="absolute bg-orange-500 text-white m-4 px-2 py-1 rounded">
                {category.name}
              </div>
              <img
                src={course.image_url}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-gradient">
                {course.name}
              </h2>
              <p>
                <strong>Instructor:</strong> {instructor.name}
              </p>
              <p className="flex flex-col">
                <strong>Overview:</strong>{" "}
                <span className="h-[30vh] overflow-y-scroll">
                  {course.description}
                </span>
              </p>
              {isPurchased ? (
                <div>
                  <div className="text-sm font-light pt-2">
                    Already enrolled
                  </div>
                  <div className="bg-orange-500 text-center text-lg font-bold text-white p-2 mt-2 rounded">
                    Go to course
                  </div>
                </div>
              ) : (
                <div>
                  {course.discount ? (
                    <div>
                      <div className="text-xl font-bold text-orange-500 pt-2">
                        US${((course.price * course.discount) / 100).toFixed(2)}
                      </div>
                      <div className="text-lg font-bold line-through">
                        US${course.price.toFixed(2)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xl font-bold text-orange-500 pt-2">
                      US${course.price.toFixed(2)}
                    </div>
                  )}
                  <div>
                    <div className="bg-orange-500 text-center text-lg font-bold text-white p-2 mt-2 rounded">
                      Start Now
                    </div>
                    <div className="text-center text-lg font-bold border-2 border-orange-500 p-2 mt-2 rounded">
                      Add to cart
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div className="relative animate-pulse">
          <div className="font-exo flex gap-4 bg-orange-50 px-20 lg:-mx-40 -mx-24 pb-20 pt-10">
            <div className="w-3/4">
              <div className="h-12 bg-gradient rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
            </div>
            <div className="w-1/4">
              <div className="h-full bg-gray-300 rounded-lg"></div>
            </div>
          </div>
          <div className="-mt-8 absolute w-full text-xl bg-white flex gap-5 shadow-lg py-4 px-2 rounded-lg justify-center">
            <div className="h-6 bg-gray-300 rounded w-1/6 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/6 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/6 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/6 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/6 mb-4"></div>
          </div>
          <div className="-m-20 w-full text-xl flex flex-col gap-5 rounded-lg justify-center mt-20">
            <div className="h-6 bg-gray-400 rounded w-1/6 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default CourseDetailPage;
