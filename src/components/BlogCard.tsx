import { Card } from 'antd';

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

export default function BlogCard({ blog, viewMode }: BlogCardProps) {
  return (
    <Card
      hoverable
      cover={<img alt={blog.title} src={blog.image_url} />}
      className={viewMode === "list" ? "list-view" : "grid-view"}
    >
      <Card.Meta
        title={blog.title}
        description={
          <>
            <p>{blog.author}</p>
            <p>{blog.date}</p>
            <p>{blog.category}</p>
          </>
        }
      />
      <div>{blog.content}</div>
    </Card>
  );
}