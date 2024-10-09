import { Layout } from "antd";
import { SearchFilter } from "../components/courses/SearchFilter";
import { SearchResults } from "../components/courses/SearchResult";
import { useEffect, useState } from "react";
import { useCustomNavigate } from "../hooks/customNavigate";
import { useSearchParams } from "react-router-dom";


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


const CoursesPage: React.FC = () => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const navigate = useCustomNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const [filters, setFilters] = useState<Filters>({
    category: [],
    author: [],
    price: [],
    review: [],
    level: [],
  });

  const handleFilterChange = (newFilter: Partial<Filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
    }));
  };

  useEffect(() => {
    const applyFilters = () => {
      return courses.filter((course) => {
        const matchesSearch = searchQuery
          ? course.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        const matchesCategory =
          filters.category.length === 0 || filters.category.includes(course.category);

        const matchesAuthor =
          filters.author.length === 0 || filters.author.includes(course.author);

        const matchesPrice =
          filters.price.length === 0 ||
          (course.price === 'Free' && filters.price.includes('free')) ||
          (typeof course.price === 'number' && filters.price.includes('paid'));

        const matchesReview =
          filters.review.length === 0 ||
          filters.review.some((review) => review <= course.students);

        const matchesLevel =
          filters.level.length === 0 || filters.level.includes(course.duration);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesAuthor &&
          matchesPrice &&
          matchesReview &&
          matchesLevel
        );
      });
    };

    setFilteredCourses(applyFilters());
  }, [filters, searchQuery]);

  const handleSearch = (searchText: string) => {
    navigate(`/course?search=${searchText}`);
  };

  return (
    <main>
      <Layout>
        <SearchResults courses={filteredCourses} onSearch={handleSearch} />
        <SearchFilter onFilterChange={handleFilterChange} />
      </Layout>
    </main>
  );
};

export default CoursesPage;