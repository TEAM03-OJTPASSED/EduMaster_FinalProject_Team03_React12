import { Row, Col } from 'antd';
import BlogCard from '../BlogCard';

interface Blog {
  id: number;
  image_url: string;
  category: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

interface BlogsGridProps {
  viewMode: "grid" | "list";
  blogs: Blog[];
}

export default function BlogsGrid({ viewMode, blogs }: BlogsGridProps) {
  return (
    <Row gutter={[20, 20]} className="mt-8">
      {blogs.map((blog) => (
        <Col
          xs={24}
          sm={viewMode === "list" ? 24 : 12}
          md={viewMode === "list" ? 24 : 12}
          lg={viewMode === "list" ? 24 : 8}
          key={blog.id}
        >
          <BlogCard blog={blog} viewMode={viewMode} />
        </Col>
      ))}
    </Row>
  );
}