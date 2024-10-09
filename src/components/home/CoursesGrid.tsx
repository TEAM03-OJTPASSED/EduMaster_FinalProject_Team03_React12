import React from 'react'
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

const courses: Course[] = [
  {
    id: 1,
    image_url: '/placeholder.svg?height=200&width=300',
    category: 'Photography',
    name: 'Create An LMS Website With LearnPress',
    author: 'Determined-Poitras',
    duration: '2Weeks',
    students: 156,
    price: 'Free',
  },
  {
    id: 2,
    image_url: '/placeholder.svg?height=200&width=300',
    category: 'Photography',
    name: 'Design A Website With ThimPresscrececerrcerverger',
    author: 'Determined-Poitras',
    duration: '2Weeks',
    students: 156,
    price: 49.0,
  },
  {
    id: 3,
    image_url: '/placeholder.svg?height=200&width=300',
    category: 'Photography',
    name: 'Create An LMS Website With LearnPress',
    author: 'Determined-Poitras',
    duration: '2Weeks',
    students: 156,
    price: 'Free',
  },
  {
    id: 4,
    image_url: '/placeholder.svg?height=200&width=300',
    category: 'Photography',
    name: 'Create An LMS Website With LearnPress',
    author: 'Determined-Poitras',
    duration: '2Weeks',
    students: 156,
    price: 'Free',
  },
  {
    id: 5,
    image_url: '/placeholder.svg?height=200&width=300',
    category: 'Photography',
    name: 'Create An LMS Website With LearnPress',
    author: 'Determined-Poitras',
    duration: '2Weeks',
    students: 156,
    price: 'Free',
  },
  {
    id: 6,
    image_url: '/placeholder.svg?height=200&width=300',
    category: 'Photography',
    name: 'Create An LMS Website With LearnPress',
    author: 'Determined-Poitras',
    duration: '2Weeks',
    students: 156,
    price: 'Free',
  },
]



export default function CoursesGrid() {
  return (
    <Row gutter={[20, 20]} className="mt-8">
      {courses.map((course) => (
        <Col xs={24} sm={12} md={8} key={course.id}>
          <CourseCard course={course} viewMode='grid'/>
        </Col>
      ))}
    </Row>
  )
}