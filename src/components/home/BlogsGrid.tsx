import { Row, Col } from 'antd';
import BlogCard from '../BlogCard';
import { Blog } from '../../models/Blog.model';


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
          key={blog._id}
        >
          <BlogCard blog={blog} viewMode={viewMode} />
        </Col>
      ))}
    </Row>
  );
}