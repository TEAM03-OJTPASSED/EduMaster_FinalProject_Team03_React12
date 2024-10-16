import { Button, Pagination } from "antd";
import Search from "antd/es/input/Search";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GrGrid } from "react-icons/gr";
import CoursesGrid from "../home/CoursesGrid";

interface Course {
  id: number;
  image_url: string;
  category: string;
  name: string;
  author: string;
  duration: string;
  students: number;
  price: number | string;
  lessons: number;
}

export const SearchResults: React.FC<{
  courses: Course[];
  onSearch: (searchValue: string) => void;
  searchQuery: string;
  // onCourseSelected: (course: Course) => void;
}> = ({ courses, onSearch, searchQuery }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  return (
    <Content className="py-8 px-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Courses</h2>
        <div className="flex items-center space-x-4">
          <Search
            placeholder={"Search"}
            defaultValue={searchQuery}
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
            className=" md:inline-block hidden"
          />
          <Button
            icon={<FaBars />}
            onClick={() => setViewMode("list")}
            type={viewMode === "list" ? "primary" : "default"}
          />
        </div>
      </div>
      {courses.length > 0 ? (<div>
            
              
            <CoursesGrid viewMode={viewMode} courses={courses}/>
        

            <Pagination
              total={courses.length}
              showSizeChanger
              showQuickJumper
              className="mt-8 text-center"
            />
            </div>)
        : (
          <div className="text-center mt-8">
            No courses found
          </div>
        )}
    </Content>
  );
};
