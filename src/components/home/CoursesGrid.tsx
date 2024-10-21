import { Row, Col, Skeleton } from "antd";
import CourseCard from "../CourseCard";

interface Course {
  id: number;
  image_url: string;
  category: string;
  name: string;
  author: string;
  duration: string;
  students: number;
  price: number | string;
  discount: number;
  lessons: number;
  description?: string;
  updatedDate?: string;
}

interface CoursesGridProps {
  viewMode: "grid" | "list";
  courses: Course[];
  onAddCartClick: (course: Course) => void;
}

export default function CoursesGrid({ viewMode, courses, onAddCartClick }: CoursesGridProps) {
  return (
    <Row gutter={[20, 20]} className="mt-8">
      {!courses
        ? 
              <Skeleton active paragraph={{ rows: 4 }} />
        : courses.map((course, index) => (
            <Col
              xs={24}
              sm={viewMode === "list" ? 24 : 12}
              md={viewMode === "list" ? 24 : 12}
              lg={viewMode === "list" ? 24 : 12}
              xl={viewMode === "list" ? 24 : 8}

              key={course.id}
              // className="transition-all"
            >
              <CourseCard course={course} index={index} viewMode={viewMode} onAddCartClick={onAddCartClick} />
            </Col>
          ))}
    </Row>
  );
}
