import { useParams } from "react-router-dom";

const BlogDetailPage = () => {
  const { id } = useParams();
  return <div>Blog Page</div>

  return <div>BlogDetailPage: {id}</div>;
};

export default BlogDetailPage;
