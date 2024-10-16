import { Button, Card, Tag } from "antd";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { TiUserOutline } from "react-icons/ti";

interface Blog {
  id: number;
  image_url: string;
  category: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

interface BlogCardProps {
  blog: Blog;
  viewMode: "grid" | "list";
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, viewMode }) => (
  <a href={`/blog-detail/${blog.id}`}>
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
            alt={blog.title}
            src={blog.image_url}
            className={`${
              viewMode === "list" ? "min-w-[250px] w-[250px]" : "w-full"
            } h-56 object-cover`}
          />
          <Tag className="absolute top-2 left-2 bg-black text-white">
            {blog.category}
          </Tag>
        </div>
      }
      className={`h-full rounded-3xl overflow-hidden group font-jost hover:-translate-y-2 transition-all duration-500 ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      <div className="flex-grow">
        <p className="text-gray-500 text-sm mb-2">by {blog.author}</p>
        <h2 className="text-base font-semibold mb-4 overflow-ellipsis overflow-hidden whitespace-nowrap transition group-hover:text-[#FFAB2D]">
          {blog.title}
        </h2>
      </div>
      <div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <AiOutlineCalendar className="mr-1 text-orange-500" size={18} />
            {blog.date}
          </span>
          <span className="flex items-center justify-end">
            <TiUserOutline className="mr-1 text-orange-500" size={20} />
            {blog.author}
          </span>
          <span className="flex items-center">
            <BiCategory className="mr-1 text-orange-500" size={18} />
            {blog.category}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <Button type="link" className="text-blue-600 hover:text-blue-800">
            Read More
          </Button>
        </div>
      </div>
    </Card>
  </a>
);

export default BlogCard;