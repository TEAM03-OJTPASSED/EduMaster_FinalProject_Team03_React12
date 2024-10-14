import { useParams } from "react-router-dom";
import { Banner } from "../components/CourseDetailPage/Banner";
import { Detail } from "../components/CourseDetailPage/Detail";

const CourseDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="inset-x-0 flex flex-col">
        <Banner
          category="Photography"
          instructor="Determined-Poitras"
          title="The Ultimate Guide To The Best WordPress LMS Plugin"
          imageUrl="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0/"
          price={59.0}
          discount={50}
        />
      </div>
      <Detail a="asdasd" />
      <div className="p-4"></div>
    </div>
  );

  return <div>CourseDetailPage: {id}</div>;
};

export default CourseDetailPage;
