import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "../models/Course.model";
import { Session } from "../models/Session.model";
import { Lesson } from "../models/Lesson.model";
import Navbar from "../components/Navbar";
import Skeleton from "../components/LearningPage/Skeleton";
import Sidebar from "../components/LearningPage/Sidebar";
import MainComponent from "../components/LearningPage/MainComponent";

const token = localStorage.getItem("token");

const fetchCourse = async (courseId: string) => {
  try {
    const response = await axios.get(
      `https://edumaster-api-dev.vercel.app/api/client/course/${courseId}`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      window.location.href = "/error";
    }
  }
};

const LearnCoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id ? id.toString() : "";

  const [returnCode, setReturnCode] = useState<number | null>(0);
  const [course, setCourse] = useState<Course | null>(null);
  const [session, setSession] = useState<Session[] | null>(null);
  const [buttonText, setButtonText] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountDown] = useState(5);
  const [sidebarWidth, setSidebarWidth] = useState("33%");

  const navigate = useNavigate();
  const colors = [
    "text-red-500",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-purple-500",
  ];
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountDown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, navigate, courseId]);

  useEffect(() => {
    fetchCourse(courseId).then((data) => {
      if (data) {
        setCourse(data.data);
        setSession(data.data.session_list || []);
      }
      if (data === "Forbidden") {
        setReturnCode(403);
        setTimeout(() => {
          navigate(`/course-detail/${courseId}`);
        }, 5000);
      }
    });
    console.log("Course:", course);
  }, []);

  const sessionIndex = sessionStorage.getItem("sessionIndex");

  const [expandedSessions, setExpandedSessions] = useState<{
    [key: number]: boolean;
  }>(sessionIndex ? { [parseInt(sessionIndex)]: true } : {});

  const toggleSession = (index: number) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  useEffect(() => {
    const lessonIndex = sessionStorage.getItem("lessonIndex");
    if (lessonIndex) {
      const lesson = JSON.parse(lessonIndex);
      setSelectedLesson({
        ...lesson,
        is_completed: lesson.is_completed || false,
      });
      setButtonText(
        lesson.is_completed ? "Go To Next Item" : "Mark as Completed"
      );
    }
  }, []);

  const selectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setButtonText(
      lesson.is_completed ? "Go To Next Item" : "Mark as Completed"
    );
  };

  const handleClick = async (lesson: Lesson) => {
    // Handle next lesson selection
    if (buttonText === "Go To Next Item") {
      const currentSessionIndex = session?.findIndex((s) =>
        s.lesson_list.some((l) => l._id === lesson._id)
      );
      const currentLessonIndex = session?.[
        currentSessionIndex!
      ].lesson_list.findIndex((l) => l._id === lesson._id);

      if (
        currentSessionIndex !== undefined &&
        currentLessonIndex !== undefined
      ) {
        // Check if it's the last lesson in the current session
        if (
          currentLessonIndex <
          session![currentSessionIndex].lesson_list.length - 1
        ) {
          // Select the next lesson in the current session
          selectLesson(
            session![currentSessionIndex].lesson_list[currentLessonIndex + 1]
          );
        } else if (currentSessionIndex < session!.length - 1) {
          // Select the first lesson of the next session
          toggleSession(currentSessionIndex);
          toggleSession(currentSessionIndex + 1);
          selectLesson(session![currentSessionIndex + 1].lesson_list[0]);
        } else {
          // Last lesson of the last session
          setButtonText("Completed");
        }
      }
    } else
      try {
        setLoading(true);
        const endpoint =
          "https://edumaster-backend-dev.vercel.app/api/users/completed-lesson/";
        const response = await axios.post(
          `${endpoint}`,
          { lessonId: lesson._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setButtonText(
            lesson.is_completed ? "Mark as Completed" : "Go To Next Item"
          );
          setSession((prevSessions: Session[] | null) => {
            if (!prevSessions) return null;
            return prevSessions?.map((sessionItem: Session) => ({
              ...sessionItem,
              lesson_list: sessionItem.lesson_list.map((lessonItem: Lesson) =>
                lessonItem._id === lesson._id
                  ? { ...lessonItem, is_completed: true }
                  : lessonItem
              ),
            }));
          });

          // Update the selectedLesson state directly
          setSelectedLesson((prevLesson) =>
            prevLesson
              ? { ...prevLesson, is_completed: !prevLesson.is_completed }
              : null
          );
        }
      } catch (error) {
        console.error("Error marking lesson as completed:", error);
      } finally {
        setLoading(false);
      }
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth >= 15 && newWidth <= 40) {
      setSidebarWidth(`${newWidth}%`);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  if ((!course || !session) && returnCode !== 403) {
    return <Skeleton />;
  }

  if (returnCode === 403) {
    return (
      <div className="my-40">
        <div className="font-exo text-2xl font-bold pt-8 text-center">
          You don't own this course yet! Redirect to course purchase page in{" "}
          <span
            className={`transition-all duration-500 ${colors[countdown - 1]}`} // Apply color to the countdown number only
          >
            {countdown}
          </span>{" "}
          seconds.
        </div>
        <div className="font-exo text-center pt-4">
          If you are not redirected automatically,{" "}
          <button
            className="text-orange-500 underline px-2"
            onClick={() => navigate(`/course-detail/${courseId}`)}
          >
            go to purchase
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed top-0 left-0 z-50 bg-white w-full h-[100vh] no-select">
      <Navbar />
      <div className="flex justify-between">
        <Sidebar
          sidebarWidth={sidebarWidth}
          sessions={session}
          expandedSessions={expandedSessions}
          selectedLesson={selectedLesson}
          toggleSession={toggleSession}
          selectLesson={selectLesson}
        />
        <div
          className="group flex h-[92vh] items-center justify-center w-2 bg-orange-100"
          onMouseDown={handleMouseDown}
        >
          <div className="group-hover:block hidden w-[1px] bg-orange-500 h-[85vh]"></div>
        </div>
        <MainComponent
          remainingWidth={`calc(${100 - parseInt(sidebarWidth)}% - 2px)`}
          selectedLesson={selectedLesson}
          handleClick={handleClick}
          loading={loading}
          buttonText={buttonText}
        />
      </div>
    </div>
  );
};

export default LearnCoursePage;
