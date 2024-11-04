import { Button, Pagination } from "antd";
import Search from "antd/es/input/Search";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GrGrid } from "react-icons/gr";
import BlogsGrid from "../home/BlogsGrid";
import { Blog } from "../../models/Blog.model";
import NoResult from "../../assets/no-result.jpg"




export const SearchResults: React.FC<{
  blogs: Blog[];
  onSearch: (searchValue: string) => void;
  searchQuery?: string;
  noResult: boolean;
}> = ({ blogs, onSearch, searchQuery, noResult }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  return (
    <Content className="py-8 px-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Blogs</h2>
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
            }}
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
      {!noResult ? (
        <div>
          <BlogsGrid viewMode={viewMode} blogs={blogs} />
          <Pagination
            total={blogs.length}
            showSizeChanger
            showQuickJumper
            className="mt-8 text-center"
          />
        </div>
      ) : (
        <div className="text-center mt-8 flex flex-col justify-center items-center">
            <img src={NoResult} className="w-[250px] md:w-[400px]" alt="no search results"/>
            <h1 className="text-xl font-medium w-96 font-jost">We couldn't find what you were looking for. Try searching for something else</h1> 

          </div>
      )}
    </Content>
  );
};