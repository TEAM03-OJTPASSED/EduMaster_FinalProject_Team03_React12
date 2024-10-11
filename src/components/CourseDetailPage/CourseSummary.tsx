import {
  MdOutlineAccessTimeFilled,
  MdAccountCircle,
  MdInsertChart,
  MdAutoStories,
  MdQuestionMark,
} from "react-icons/md";

type Props = {
  time: number;
  student: number;
  level: string;
  lessons: number;
  quizzes: number;
};
export const CourseSummary = ({
  time,
  student,
  level,
  lessons,
  quizzes,
}: Props) => {
  return (
    <div className="flex gap-5">
      <div className="flex items-center font-jost font-light gap-2">
        <MdOutlineAccessTimeFilled height={16} fill="#FF782D" />
        {time} Weeks
      </div>
      <div className="flex items-center font-jost font-light gap-2">
        <MdAccountCircle height={16} fill="#FF782D" />
        {student} Students
      </div>
      <div className="flex items-center font-jost font-light gap-2">
        <MdInsertChart height={16} fill="#FF782D" />
        {level} levels
      </div>
      <div className="flex items-center font-jost font-light gap-2">
        <MdAutoStories height={16} fill="#FF782D" />
        {lessons} Lessons
      </div>
      <div className="flex items-center font-jost font-light gap-2">
        <MdQuestionMark height={16} fill="#FF782D" />
        {quizzes} Quizzes
      </div>
    </div>
  );
};
