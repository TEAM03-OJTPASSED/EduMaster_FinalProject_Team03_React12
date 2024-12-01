import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { Lesson } from "../../models/Lesson.model";

interface MainContentProps {
  remainingWidth: string;
  selectedLesson: Lesson | null;
  handleClick: (lesson: Lesson) => void;
  loading: boolean;
  buttonText: string;
}

const MainContent: React.FC<MainContentProps> = ({
  remainingWidth,
  selectedLesson,
  handleClick,
  loading,
  buttonText,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [selectedLesson]);

  return (
    <div
      ref={scrollRef}
      className="flex-grow h-[86vh] overflow-y-scroll" 
      style={{ width: remainingWidth }}
    >
      {selectedLesson && (
        <div className="mt-4 p-4 rounded">
          <h2 className="text-xl font-bold">{selectedLesson.name}</h2>
          <div className="pt-2 rounded">
            {selectedLesson.lesson_type === "video" ? (
              <div className="w-full">
                <ReactPlayer
                  width="100%"
                  height="auto"
                  url={selectedLesson.video_url}
                  controls
                />
              </div>
            ) : selectedLesson.lesson_type === "assignment" ? (
              <div className="w-full">
                <h2>Assignment</h2>
                <p>{selectedLesson.assignment}</p>
              </div>
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
            {selectedLesson.is_completed && (
              <div className="text-orange-500 font-bold text-lg">
                ✔ Completed
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
