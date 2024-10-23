import { useParams } from "react-router-dom";
import { BlogHeader } from "../components/BlogDetailPage/Header";
import { TagList } from "../components/BlogDetailPage/TagList";
import { RecentBlog } from "../components/BlogDetailPage/RecentBlog";
import { Comment } from "../components/BlogDetailPage/Comment";
import { LeaveAComment } from "../components/LeaveAComment";

interface Blog {
  name: string;
  user_id: string;
  category_id: string;
  description: string;
  image_url: string;
  content: string;
  is_deleted: boolean;
  _id: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

const blog: Blog = {
  name: "New Blog Java 3",
  user_id: "667bcd995ce3736b08de1cb7",
  category_id: "667d6f9887d3be7cec496e7a",
  description: "123",
  image_url: "https://picsum.photos/seed/picsum/200/50",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  is_deleted: false,
  _id: "6698971b6541788587175b46",
  created_at: "2024-07-18T04:16:27.274Z",
  updated_at: "2024-07-18T04:16:27.274Z",
  __v: 0,
};

const comments = [
  {
    avatar: "https://picsum.photos/seed/picsum/200/300",
    name: "John Doe",
    date: "2024-07-18T04:16:27.274Z",
    content: "Great blog",
  },
  {
    avatar: "https://picsum.photos/seed/picsum/200/300",
    name: "John Doe",
    date: "2024-07-18T04:16:27.274Z",
    content: "Great blog",
  },
  {
    avatar: "https://picsum.photos/seed/picsum/200/300",
    name: "John Doe",
    date: "2024-07-18T04:16:27.274Z",
    content: "Great blog",
  },
  {
    avatar: "https://picsum.photos/seed/picsum/200/300",
    name: "John Doe",
    date: "2024-07-18T04:16:27.274Z",
    content: "Great blog",
  },
  {
    avatar: "https://picsum.photos/seed/picsum/200/300",
    name: "John Doe",
    date: "2024-07-18T04:16:27.274Z",
    content: "Great blog",
  },
  {
    avatar: "https://picsum.photos/seed/picsum/200/300",
    name: "John Doe",
    date: "2024-07-18T04:16:27.274Z",
    content: "Great blog",
  },
  {
    avatar: "https://picsum.photos/seed/picsum/200/300",
    name: "John Doe",
    date: "2024-07-18T04:16:27.274Z",
    content: "Great blog",
  },
  {
    avatar: "https://picsum.photos/seed/picsum/200/300",
    name: "John Doe",
    date: "2024-07-18T04:16:27.274Z",
    content: "Great blog",
  },
];

const BlogDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="font-exo flex mt-6">
      <div className="w-3/4">
        <BlogHeader
          title={blog.name}
          date={blog.created_at}
          creator={blog.user_id}
          comments={0}
        />
        <img
          src={blog.image_url}
          alt="blog"
          className="w-full mt-8 rounded-2xl"
        />
        <div className="mt-8">{blog.content}</div>
        <TagList tags={["1", "2", "6", "7"]} />
        <div>
          <h2 className="text-lg font-semibold mt-8">Recent Blogs</h2>
          <div className="flex gap-4">
            <RecentBlog category="Java" title="New Blog Java 1" />
            <RecentBlog category="Java" title="New Blog Java 2" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mt-8">Comment</h2>
          <div>
            {comments.length === 0
              ? "No comment"
              : `${comments.length} comments`}
          </div>
          <Comment items={comments} />
        </div>
        <LeaveAComment />
      </div>
      <div className="w-1/4"></div>
    </div>
  );

  return <div>BlogDetailPage: {id}</div>;
};

export default BlogDetailPage;
