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
      `/api/client/course/${courseId}`,
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
    const response = await axios.get(
      `/api/category/${categoryId}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      }
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
      `/api/users/${instructor_Id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching instructor:", error);
    return null;
  }
};

const CourseDetailPage = () => {
  const { id } = useParams();
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
    return <div>CourseDetailPage: {id}</div>;
  }
};

export default CourseDetailPage;
