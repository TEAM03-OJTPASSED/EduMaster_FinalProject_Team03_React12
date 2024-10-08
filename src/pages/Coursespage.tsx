import { Layout } from "antd";
import { SearchFilter } from "../components/courses/SearchFilter";
import { SearchResults } from "../components/courses/SearchResult";
import { useEffect, useState } from "react";


interface Course {
  id: number
  image_url: string
  category: string
  name: string
  author: string
  duration: string
  students: number
  price: number | string
  lessons: number
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
    lessons: 2,
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
    lessons: 2,

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
    lessons: 2,

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
    lessons: 2,

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
    lessons: 2,

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
    lessons: 2,

  },
]


interface Filters {
  category: string[];
  author: string[];
  price: string[];  
  review: number[]; 
  level: string[];  
}

const CoursesPage = () => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const [filters, setFilters] = useState<Filters>({
    category: [],
    author: [],
    price: [],
    review: [],
    level: [],
  });

  const handleFilterChange = (newFilter: Partial<Filters>) => {
    const updatedFilters = {
      ...filters,
      ...newFilter,
    };
    setFilters(updatedFilters);
  }

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const matchesCategory = filters.category.length === 0 || filters.category.includes(course.category);
      const matchesAuthor = filters.author.length === 0 || filters.author.includes(course.author);

      // Ensure price is properly compared against filters.price (which are strings)
      const matchesPrice = filters.price.length === 0 ||
        (course.price === 'Free' && filters.price.includes('free')) ||
        (typeof course.price === 'number' && filters.price.includes('paid'));

      const matchesReview = filters.review.length === 0 || filters.review.some((review) => review <= course.students);

      // Assuming level is compared to course duration, replace this with actual level if necessary
      const matchesLevel = filters.level.length === 0 || filters.level.includes(course.duration);

      return matchesCategory && matchesAuthor && matchesPrice && matchesReview && matchesLevel;
    });

    setFilteredCourses(filtered);
  },[filters])


  return (
    <main>
      <Layout>
        <SearchResults courses={filteredCourses} />
        <SearchFilter onFilterChange={handleFilterChange}/>
      </Layout>
    </main>
  );
};

export default CoursesPage;
