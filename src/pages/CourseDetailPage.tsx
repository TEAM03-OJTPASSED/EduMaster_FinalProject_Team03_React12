import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Banner } from "../components/CourseDetailPage/Banner";
import { Detail } from "../components/CourseDetailPage/Detail";
import { LeaveAComment } from "../components/LeaveAComment";
import { Course } from "../models/Course.model";
import { Session } from "../models/Session.model";
import { DetailModal } from "../components/CourseDetailPage/Modal";
import DetailSkeleton from "../components/CourseDetailPage/DetailSkeleton";

const token = localStorage.getItem("token");

const fetchCourse = async (courseId: string) => {
  try {
    const response = await axios.get(
      `https://edumaster-api-dev.vercel.app/api/client/course/${courseId}`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      window.location.href = "/error";
    }
  }
};

const CourseDetailPage = () => {
  // Get the course ID from the URL
  const { id } = useParams<{ id: string }>();
  const courseId = id ? id.toString() : "";

  const [course, setCourse] = useState<Course | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCourse(courseId);
        if (data) {
          setCourse(data.data);
          setSession(data.data.session_list);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();
  }, [courseId]);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (course && id) {
    return (
      <div className="relative">
        <div className="inset-x-0 flex flex-col">
          <Banner course={course} isPurchased={course.is_purchased} id={id} />
        </div>
        <Detail
          isEnrolled={true}
          course={course || undefined}
          session={session || undefined}
        />
        <div className="lg:w-2/3">
          <LeaveAComment />
        </div>
        <DetailModal course={course} isPurchased={course.is_purchased} />
      </div>
    );
  }
};

export default CourseDetailPage;
