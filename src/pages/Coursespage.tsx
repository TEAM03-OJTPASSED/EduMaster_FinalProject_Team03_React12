import { Layout } from "antd";
import { SearchFilter } from "../components/courses/SearchFilter";
import { SearchResults } from "../components/courses/SearchResult";
import { useEffect, useState } from "react";
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

interface FilterOption {
  value: string | number;
  label: string;
  count?: number;
}

interface Filters {
  category: string[];
  author: string[];
  price: string[];  
  review: number[]; 
  level: string[];  
}

interface FilterSection {
  title: string;
  type: keyof Filters;
  options: FilterOption[];
}

const filterSections: FilterSection[] = [
  {
    title: "Course Category",
    type: "category",
    options: [
      { value: "commercial", label: "Commercial", count: 15 },
      { value: "office", label: "Office", count: 15 },
      { value: "shop", label: "Shop", count: 15 },
      { value: "educate", label: "Educate", count: 15 },
      { value: "academy", label: "Academy", count: 15 },
      { value: "single-family-home", label: "Single Family Home", count: 15 },
      { value: "studio", label: "Studio", count: 15 },
      { value: "university", label: "University", count: 15 },
    ]
  },
  {
    title: "Instructors",
    type: "author",
    options: [
      { value: "kenny-white", label: "Kenny White", count: 15 },
      { value: "john-doe", label: "John Doe", count: 15 },
    ]
  },
  {
    title: "Price",
    type: "price",
    options: [
      { value: "free", label: "Free", count: 15 },
      { value: "paid", label: "Paid", count: 15 },
    ]
  },
  {
    title: "Review",
    type: "review",
    options: [
      { value: 5, label: "5 Stars", count: 1025 },
      { value: 4, label: "4 Stars", count: 800 },
      { value: 3, label: "3 Stars", count: 600 },
      { value: 2, label: "2 Stars", count: 300 },
      { value: 1, label: "1 Star", count: 150 },
    ]
  },
  {
    title: "Level",
    type: "level",
    options: [
      { value: "all-levels", label: "All Levels", count: 15 },
      { value: "beginner", label: "Beginner", count: 15 },
      { value: "intermediate", label: "Intermediate", count: 15 },
      { value: "expert", label: "Expert", count: 15 },
    ]
  }
];







const CoursesPage: React.FC = () => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  // const navigate = useCustomNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const [filters, setFilters] = useState<Filters>({
    category: searchParams.getAll('category'),
    author: searchParams.getAll('author'),
    price: searchParams.getAll('price'),
    review: searchParams.getAll('review').map(Number),
    level: searchParams.getAll('level'),
  });

  const updateUrlWithFilters = (newFilters: Partial<Filters>) => {
    const newSearchParams = new URLSearchParams();

    if (searchQuery) newSearchParams.set('search', searchQuery);

    Object.entries(newFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        values.forEach((value) => {
          newSearchParams.append(key, value.toString());
        });
      }
    });

    setSearchParams(newSearchParams);
  };

  const handleFilterChange = (newFilter: Partial<Filters>) => {
    const updatedFilters = {
      ...filters,
      ...newFilter,
    };
    setFilters(updatedFilters);
    updateUrlWithFilters(updatedFilters);
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
    const updatedSearchParams = new URLSearchParams(searchParams);
    if (searchText) {
      updatedSearchParams.set('search', searchText);
    } else {
      updatedSearchParams.delete('search');
    }
    setSearchParams(updatedSearchParams);
  };

  return (
    <main>
      <Layout>
        <SearchResults courses={filteredCourses} onSearch={handleSearch} />
        <SearchFilter onFilterChange={handleFilterChange}  filters={filterSections} selectedFilters={filters}/>
      </Layout>
    </main>
  );
};

export default CoursesPage;