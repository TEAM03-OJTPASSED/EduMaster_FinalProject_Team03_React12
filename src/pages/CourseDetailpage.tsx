import { useParams } from "react-router-dom";

const CourseDetailPage = () => {
  const { id } = useParams();
  return <div>CourseDetailPage: {id}</div>;
};

export default CourseDetailPage;
