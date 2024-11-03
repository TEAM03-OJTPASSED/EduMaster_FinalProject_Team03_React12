import { useParams } from "react-router-dom";
import { BlogHeader } from "../components/BlogDetailPage/Header";
import { TagList } from "../components/BlogDetailPage/TagList";
import { RecentBlog } from "../components/BlogDetailPage/RecentBlog";
import { Comment } from "../components/BlogDetailPage/Comment";
import { LeaveAComment } from "../components/LeaveAComment";
import { Blog } from "../models/Blog.model";
import { useEffect, useState } from "react";
import BlogDetailSkeleton from "../components/Blogs/BlogDetailSkeleton";
import ClientService from "../services/client.service";


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

const HTMLContent = ({ content }: { content: string }) => {
  return (
    <div 
      className="prose max-w-none" // if you're using Tailwind Typography
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    const fetchBlogs = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const response = await ClientService.getBlogDetail(id);
          if (response.data) {
            setBlog(response.data);
          }
        } catch (error) {
          console.error('Error fetching blog:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchBlogs();
  }, [id]);

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="font-exo flex mt-6">
      <div className="w-3/4">
        <BlogHeader
          title={blog.name}
          date={new Date(blog.created_at).toLocaleDateString()}
          creator={blog.user_id}
          comments={0}
        />
        <img
          src={blog.image_url}
          alt="blog"
          className="w-full h-[400px] mt-8 rounded-2xl object-contain"
        />
        <div className="mt-8"><HTMLContent content={blog.content}/></div>
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
};

export default BlogDetailPage;