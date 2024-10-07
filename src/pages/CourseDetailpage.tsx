import { useParams } from "react-router-dom";

const CourseDetailpage = () => {
  const { id } = useParams();
  return <div>CourseDetailpage: {id}</div>;
};

export default CourseDetailpage;
