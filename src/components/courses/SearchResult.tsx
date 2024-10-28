import { Button, Pagination } from "antd";
import Search from "antd/es/input/Search";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GrGrid } from "react-icons/gr";
import CoursesGrid from "../home/CoursesGrid";
import NoResult from "../../assets/no-result.jpg"
import { handleAddCart } from "../../utils/handleAddCart";
import { useCustomNavigate } from "../../hooks/customNavigate";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Course } from "../../models/Course.model";



export const SearchResults: React.FC<{
  courses: Course[];
  onSearch: (searchValue: string) => void;
  searchQuery?: string;
  noResult: boolean;
  // onCourseSelected: (course: Course) => void;
}> = ({ courses, onSearch, searchQuery, noResult }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const navigate = useCustomNavigate()

  const {currentUser} = useSelector((state : RootState) => state.auth)


  const onAddCart = (course: Course) => {
    handleAddCart(currentUser.role, course, navigate);
  }
  
  return (
    <Content className="py-8 px-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{searchQuery ? <span>Results for "<span className="font-bold">{searchQuery}</span>"</span>:"All Courses"}</h2>
        <div className="flex items-center space-x-4">
          <Search
            placeholder={"Search"}
            defaultValue={searchQuery}
            className=""
            style={{ width: 200 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch(e.currentTarget.value);
              }
            }}
            onSearch={(e) => {           
                onSearch(e);
              }
            }
          />
          <Button
            icon={<GrGrid />}
            onClick={() => setViewMode("grid")}
            type={viewMode === "grid" ? "primary" : "default"}
            className="view-button"
          />
          <Button
            icon={<FaBars />}
            onClick={() => setViewMode("list")}
            type={viewMode === "list" ? "primary" : "default"}
            className=" md:inline-block hidden view-button"
          />
        </div>
      </div>           
            {!noResult ? (<>
  
              <CoursesGrid viewMode={viewMode} courses={courses} onAddCartClick={onAddCart}/>
        
              <Pagination
                total={courses.length}
                showSizeChanger
                showQuickJumper
                className="mt-8 text-center"
              /></>)
              : (

                <div className="text-center mt-8 flex flex-col justify-center items-center">
            <img src={NoResult} className="w-[250px] md:w-[400px]" alt="no search results"/>
            <h1 className="text-xl font-medium w-96 font-jost">We couldn't find what you were looking for. Try searching for something else</h1> 

          </div>
              )
            }       
        
    </Content>
  );
};
