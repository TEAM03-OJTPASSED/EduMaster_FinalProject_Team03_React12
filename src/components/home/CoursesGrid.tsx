import { Row, Col } from 'antd'
import CourseCard from '../CourseCard'

interface Course {
  id: number
  image_url: string
  category: string
  name: string
  author: string
  duration: string
  students: number
  price: number | string
}


interface CoursesGridProps {
  viewMode: "grid" | "list";
  courses: Course[];
}

export default function CoursesGrid({ viewMode, courses }: CoursesGridProps) {
  return (
    <Row gutter={[20, 20]} className="mt-8">
      {courses.map((course, index) => (
        <Col xs={24} sm={viewMode === "list" ? 24 : 12} md={viewMode === "list" ? 24 : 12} lg={viewMode === "list" ? 24 : 8} key={course.id}>
          <CourseCard course={course} index={index} viewMode={viewMode}/>
        </Col>
      ))}
    </Row>
  )
}