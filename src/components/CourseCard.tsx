import { Button, Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { TiUserOutline } from "react-icons/ti";

interface Course {
  id: number;
  image_url: string;
  category: string;
  name: string;
  author: string;
  duration: string;
  students: number;
  price: number | string;
  discount: number;
  lessons: number;
  description?: string;
  updatedDate?: string;
}
// interface Course {
//     name: string;
//     category_id: string;
//     description: string;
//     content: string;
//     video_url: string;
//     image_url: string;
//     price: number;
//     discount: number;
// }
const CourseCard: React.FC<{
  course: Course;
  viewMode: string;
  index: number;
  onAddCartClick: (course: Course) => void;
}> = ({ course, viewMode, index, onAddCartClick }) => {
  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 992px)");
    const handleResize = () => setIsMdScreen(mediaQuery.matches);
    handleResize(); // Initial check
    mediaQuery.addEventListener("change", handleResize); // Listen to screen changes

    return () => mediaQuery.removeEventListener("change", handleResize); // Cleanup on unmount
  }, []);

  return (
    <div className="group relative">
      <a href={`/course-detail/${course.id}`}>
        <Card
          hoverable
          styles={{
            body: {
              height: "100%",
              width: "100%",
            },
          }}
          cover={
            <div className="relative">
              <img
                alt={course.name}
                src={"https://picsum.photos/400/192"}
                className={`${
                  viewMode === "list" ? "min-w-[200px]  w-[200px] md:min-w-[250px] md:w-[250px]" : "w-full"
                } h-56 object-cover`}
              />
              <Tag className="absolute top-2 left-2 bg-black text-white">
                {course.category}
              </Tag>
            </div>
          }
          className={`${viewMode==="list"&&" h-[200px] md:"}h-full rounded-3xl overflow-hidden group font-jost  hover:-translate-y-2 transition-all duration-500 ${
            viewMode === "list" ? "flex" : ""
          }`}
        >
          <div className="flex-grow">
            <p className="text-gray-500 text-sm mb-2">by {course.author}</p>
            <h2 className="text-base font-semibold mb-4 overflow-ellipsis overflow-hidden whitespace-nowrap transition group-hover:text-[#FFAB2D]">
              {course.name}
            </h2>
          </div>
          <div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-between text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <AiOutlineClockCircle
                  className="mr-1 text-orange-500"
                  size={18}
                />
                {course.duration}
              </span>
              <span className="flex items-center justify-end">
                <TiUserOutline className="mr-1 text-orange-500" size={20} />
                {course.students} Students
              </span>
             
                <span className="flex items-center">
                  <BiBook className="mr-1 text-orange-500" size={18} />
                  {course.lessons} Lessons
                </span>
            
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-orange-500">
                {typeof course.price === "number"
                  ? `$${course.price.toFixed(0)}`
                  : course.price}
              </span>
              <Button type="link" className="text-blue-600 hover:text-blue-800">
                View More
              </Button>
            </div>
          </div>
        </Card>
        
        <div
          className={`z-10 absolute w-[352px] top-0 opacity-0 px-4 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto ${
            (index + 1) % (isMdScreen ? 3 : 2) === 0 && viewMode !== "list"
              ? "right-full -translate-x-4 "
              : "left-full translate-x-4"
          } `}
        >
          <div className="w-80 font-jost bg-white p-4 rounded-3xl shadow-lg ">
          <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            Updated {course.updatedDate ?? "Recently"}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            {course.description ??
              "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."}
          </p>
          <ul className="text-sm text-gray-600 mb-4">
            <li className="flex items-center mb-1">
              <AiOutlineClockCircle className="mr-2 text-primary" size={16} />
              {course.duration} total hours
            </li>
            <li className="flex items-center mb-1">
              <BiBook className="mr-2 text-primary" size={16} />
              All Levels
            </li>
            <li className="flex items-center">
              <TiUserOutline className="mr-2 text-primary" size={18} />
              Subtitles
            </li>
          </ul>
          <Button className="font-jost w-full bg-primary text-primary-foreground hover:bg-primary/90 flex view-button ant-btn-variant-solid" 
          onClick={(e)=> {
            e.preventDefault();
            onAddCartClick(course) 
            }}>
            <FaShoppingCart className="text-white" size={18} /> Add to cart
          </Button>
          </div>
        </div>
      </a>
    </div>
  );
};
export default CourseCard;
