import { Button, Pagination } from "antd";
import Search from "antd/es/input/Search";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { GrGrid } from "react-icons/gr";
import CoursesGrid from "../home/CoursesGrid";
import NoResult from "../../assets/no-result.jpg"
import { useCustomNavigate } from "../../hooks/customNavigate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { Course } from "../../models/Course.model";
import { addToCart } from "../../redux/slices/cartSlice";



export const SearchResults: React.FC<{
  courses: Course[];
  onSearch: (searchValue: string) => void;
  searchQuery?: string;
  noResult: boolean;
  // onCourseSelected: (course: Course) => void;
}> = ({ courses, onSearch, searchQuery, noResult }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useCustomNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const {currentUser} = useSelector((state : RootState) => state.auth.login)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 776px)");
    const handleResize = () => setViewMode("grid")
    handleResize(); // Initial check
    mediaQuery.addEventListener("change", handleResize); 

    return () => mediaQuery.removeEventListener("change", handleResize); 
  }, []);


  const onAddCart = async (course: Course) => {
    await dispatch(addToCart({ course, userRole: currentUser?.role, navigate }));
  };
  
  return (
    <Content className=" sm:py-8 pb-8 pt-2 px-4 bg-white">
      <div className="flex sm:flex-row flex-col  justify-between items-center mb-6">
        <h2 className="text-2xl sm:mb-0 mb-12  font-semibold">{searchQuery ? <span>Results for "<span className="font-bold">{searchQuery}</span>"</span>:"All Courses"}</h2>
        <div className="flex items-center justify-between space-x-4 w-full sm:w-[400px]">
          <Search
            placeholder={"Search"}
            defaultValue={searchQuery}
            className="w-full"
            
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
