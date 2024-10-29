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
    <div className="absolute w-full mt-4 text-xl bg-white flex gap-5 shadow-lg py-4 px-8 rounded-lg justify-center">
      <div className="w-1/5 flex items-center justify-center font-jost font-light gap-2 border-r px-4">
        <MdOutlineAccessTimeFilled height={16} fill="#FF782D" />
        {Math.ceil(time / (6 * 60))} Weeks
      </div>
      <div className="w-1/5 flex items-center justify-center font-jost font-light gap-2 border-r px-4">
        <MdAccountCircle height={16} fill="#FF782D" />
        {student} Students
      </div>
      <div className="w-1/5 flex items-center justify-center font-jost font-light gap-2 border-r px-4">
        <MdInsertChart height={16} fill="#FF782D" />
        {level} levels
      </div>
      <div className="w-1/5 flex items-center justify-center font-jost font-light gap-2 border-r px-4">
        <MdAutoStories height={16} fill="#FF782D" />
        {lessons} Lessons
      </div>
      <div className="w-1/5 flex items-center justify-center font-jost font-light gap-2">
        <MdQuestionMark height={16} fill="#FF782D" />
        {quizzes} Quizzes
      </div>
    </div>
  );
};
