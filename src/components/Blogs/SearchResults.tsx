import { Button, Pagination } from "antd";
import Search from "antd/es/input/Search";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GrGrid } from "react-icons/gr";
import BlogsGrid from "../home/BlogsGrid";

interface Blog {
  id: number;
  image_url: string;
  category: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

export const SearchResults: React.FC<{
  blogs: Blog[];
  onSearch: (searchValue: string) => void;
  searchQuery: string;
}> = ({ blogs, onSearch, searchQuery }) => {
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
      {blogs.length > 0 ? (
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
        <div className="text-center mt-8">No blogs found</div>
      )}
    </Content>
  );
};