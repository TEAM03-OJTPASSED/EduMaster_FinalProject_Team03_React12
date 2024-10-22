import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "../models/Course.model";
import { Session } from "../models/Session.model";
import { Lesson } from "../models/Lesson.model";
import ReactPlayer from "react-player";
import { MdOutlinePlayCircle, MdOutlineTaskAlt } from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTBlMjI4YTMxZjEzYTZkMGE1ZTc2ZCIsInJvbGUiOiJzdHVkZW50IiwidmVyc2lvbiI6MCwiaWF0IjoxNzI5NjAwODk1LCJleHAiOjE3Mjk2Mjk2OTV9.pEtrWU8eJJukSdUNq8g3paO7Ld7bBU3wwWc3F_3ndLU";

const fetchCourse = async (courseId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/client/course/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
  const [buttonText, setButtonText] = useState("Mark as Completed");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const courseId = "6713859755b6534784014184";

  useEffect(() => {
    fetchCourse(courseId).then((data) => {
      if (data) {
        setCourse(data);
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

  const handleClick = async (lesson: Lesson) => {
    setLoading(true);
    try {
      const endpoint = lesson.is_completed
        ? `/api/users/remove-completed-lesson/`
        : `/api/users/completed-lesson/`;
      const response = await axios.post(
        `http://localhost:3000${endpoint}`,
        { lessonId: lesson._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setButtonText(
          lesson.is_completed ? "Mark as Completed" : "Mark as Incomplete"
        );
        // Update the lesson's is_completed status in the state
        setSession((prevSessions) => {
          if (!prevSessions) return null;
          return prevSessions?.map((sessionItem) => ({
            ...sessionItem,
            lesson_list: sessionItem.lesson_list.map((lessonItem) =>
              lessonItem._id === lesson._id
                ? { ...lessonItem, is_completed: !lesson.is_completed }
                : lessonItem
            ),
          }));
        });
      }
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
    } finally {
      setLoading(false);
    }
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
                      className={`pl-2 py-2 rounded cursor-pointer ${
                        selectedLesson && selectedLesson._id === lessonItem._id
                          ? "bg-orange-500 text-white"
                          : ""
                      }`}
                    >
                      <div>
                        <div className="flex gap-2 items-center">
                          <div className="w-1/10">
                            {lessonItem.is_completed ? (
                              <MdOutlineTaskAlt className="w-6 h-6 text-green-500" />
                            ) : (
                              <div>
                                {lessonItem.lesson_type === "video" && (
                                  <MdOutlinePlayCircle className="w-6 h-6" />
                                )}
                                {lessonItem.lesson_type === "text" && (
                                  <FiBookOpen className="w-6 h-6" />
                                )}
                              </div>
                            )}
                          </div>
                          <div className="font-semibold">{lessonItem.name}</div>
                        </div>
                        <span className="text-sm">
                          {lessonItem.lesson_type.charAt(0).toUpperCase() +
                            lessonItem.lesson_type.slice(1)}
                          <span className="px-2">•</span>
                          {lessonItem.full_time} min
                        </span>
                      </div>
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
            <div className="flex items-baseline gap-4">
              <button
                onClick={() => handleClick(selectedLesson)}
                className="mt-4 px-4 py-2 font-bold bg-orange-500 text-white rounded"
                disabled={loading}
              >
                {loading ? "Loading..." : buttonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnCoursePage;
