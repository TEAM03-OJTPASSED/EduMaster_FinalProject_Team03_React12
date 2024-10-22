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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTBlMjI4YTMxZjEzYTZkMGE1ZTc2ZCIsInJvbGUiOiJzdHVkZW50IiwidmVyc2lvbiI6MCwiaWF0IjoxNzI5NDIzNjU0LCJleHAiOjE3Mjk0NTI0NTR9.6xsCPiwMsxspukcDkuNZ60iQDLLmq9ICdVWD7EEwYc0";

const fetchCourse = async (courseId: string) => {
  try {
    const response = await axios.get(
      `/api/client/course/${courseId}`
      //`http://localhost:3000/api/client/course/${courseId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
};

const fetchCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(`/api/category/${categoryId}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

const fetchInstructor = async (instructor_Id: string) => {
  try {
    const response = await axios.get(`/api/users/${instructor_Id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching instructor:", error);
    return null;
  }
};

const CourseDetailPage = () => {
  useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const courseId = "6713859755b6534784014184";
    fetchCourse(courseId).then((data) => {
      if (data) {
        console.log("Data:", data);
        console.log("Course: ", data);
        setCourse(data);
        console.log("Session List: ", data.session_list);
        setSession(data.session_list);
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
      <div>
        <div className="inset-x-0 flex flex-col">
          <Banner
            category={category.name}
            instructor={instructor.name}
            title={course.name}
            overview={course.description}
            imageUrl={course.image_url}
            price={course.price}
            discount={course.discount}
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
      </div>
    );
  } else {
    return (
      <div>
        <div className="relative animate-pulse">
          <div className="font-exo flex gap-4 bg-orange-50 px-20 lg:-mx-40 -mx-24 pb-20 pt-10">
            <div className="w-3/4">
              <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
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
        </div>
      </div>
    );
  }
};

export default CourseDetailPage;
