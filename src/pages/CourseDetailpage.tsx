import { useParams } from "react-router-dom";
import { Banner } from "../components/CourseDetailPage/Banner";
import { Detail } from "../components/CourseDetailPage/Detail";

const CourseDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="absolute inset-x-0 flex flex-col">
      <Banner
        category="Photography"
        instructor="Determined-Poitras"
        title="The Ultimate Guide To The Best WordPress LMS Plugin"
        imageUrl="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0/"
        price={59.0}
        discount={50}
      />
      <Detail a="asdasd" />
    </div>
  );
};

export default CourseDetailPage;
