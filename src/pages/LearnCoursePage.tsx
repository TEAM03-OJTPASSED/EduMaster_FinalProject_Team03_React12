import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "../models/Course.model";
import { Session } from "../models/Session.model";
import { Lesson } from "../models/Lesson.model";
import ReactPlayer from "react-player";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTBlMjI4YTMxZjEzYTZkMGE1ZTc2ZCIsInJvbGUiOiJzdHVkZW50IiwidmVyc2lvbiI6MCwiaWF0IjoxNzI5NjAwODk1LCJleHAiOjE3Mjk2Mjk2OTV9.pEtrWU8eJJukSdUNq8g3paO7Ld7bBU3wwWc3F_3ndLU";

const fetchCourse = async (courseId: string) => {
  try {
    const response = await axios.get(`/api/client/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 403
    ) {
      return "Forbidden";
    } else {
      console.error("Error fetching course:", error);
    }
    return null;
  }
};

const LearnCoursePage = () => {
  const [returnCode, setReturnCode] = useState<number | null>(0);
  const [course, setCourse] = useState<Course | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const navigate = useNavigate();
  const courseId = "6713859755b6534784014184";

  useEffect(() => {
    fetchCourse(courseId).then((data) => {
      if (data) {
        console.log("Data:", data);
        console.log("Course: ", data);
        setCourse(data);
        console.log("Session List: ", data.session_list);
        setSession(data.session_list);
        if (data.session_list && data.session_list.length > 0) {
          const firstSession = data.session_list[0];
          if (firstSession.lesson_list && firstSession.lesson_list.length > 0) {
            setSelectedLesson(firstSession.lesson_list[0]);
          }
          setExpandedSessions({ 0: true });
        }
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

  const [expandedSessions, setExpandedSessions] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleSession = (index: number) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const selectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  //http://localhost:5173/learn/6713859755b6534784014184\

  if ((!course || !session) && returnCode !== 403) {
    return <div className="pt-4 font-exo">Loading...</div>;
  }

  if (returnCode === 403) {
    return (
      <div>
        <div className="font-exo text-2xl font-bold pt-8 text-center">
          You don't own this course yet! Redirect to course purchase page in 5
          seconds.
        </div>
        <div className="font-exo text-center pt-4">
          If you are not redirected automatically,
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
    <div className="flex pt-10">
      <div className="w-1/4 p-4">
        {session?.map((sessionItem, sessionIndex) => (
          <div key={sessionIndex} className="mb-4">
            <div className="group cursor-pointer rounded border border-white hover:border-orange-500 ">
              <h3
                className={`hover:group text-lg font-semibold p-2 border-transition ${
                  expandedSessions[sessionIndex]
                    ? "border-b-orange-500 border-orange-500"
                    : "border-b-orange-500 border-transparent"
                }group-hover:border-orange-500 group-hover:bg-orange-200`}
                onClick={() => toggleSession(sessionIndex)}
              >
                {sessionItem.name}
              </h3>
              <div
                className={`lesson-list transition-max-height duration-500 ease-in-out overflow-hidden ${
                  expandedSessions[sessionIndex] ? "max-h-96" : "max-h-0"
                }`}
              >
                {sessionItem.lesson_list &&
                  sessionItem.lesson_list.map((lessonItem) => (
                    <div
                      key={lessonItem._id}
                      onClick={() => selectLesson(lessonItem)}
                      className={`pl-4 py-2 rounded cursor-pointer ${
                        selectedLesson && selectedLesson._id === lessonItem._id
                          ? "bg-orange-500 text-white"
                          : ""
                      }`}
                    >
                      <p>{lessonItem.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-3/4">
        {selectedLesson && (
          <div className="mt-4 p-4 rounded">
            <h2 className="text-xl font-bold">{selectedLesson.name}</h2>
            <div className="pt-2 rounded">
              {selectedLesson.lesson_type === "video" ? (
                (console.log("Selected Lesson: ", selectedLesson),
                (
                  <div className="w-full">
                    <ReactPlayer
                      width="100%"
                      url={selectedLesson.video_url}
                      controls
                    />
                  </div>
                ))
              ) : (
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{
                    __html: selectedLesson.description,
                  }}
                />
              )}
            </div>
            <div className="flex">
              <div className="mt-4 px-2 py-1 bg-orange-500 text-white font-bold rounded">
                Mark as Completed
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnCoursePage;
