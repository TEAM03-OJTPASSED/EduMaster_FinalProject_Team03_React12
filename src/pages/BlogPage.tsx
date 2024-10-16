import { Layout } from "antd";
import { SearchFilter } from "../components/Blogs/SearchFilter";
import { SearchResults } from "../components/Blogs/SearchResults";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Blog {
  id: number;
  image_url: string;
  category: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    image_url: "https://picsum.photos/300/200",
    category: "Technology",
    title: "Understanding React Hooks",
    author: "Jane Doe",
    date: "2023-01-01",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    image_url: "https://picsum.photos/300/200",
    category: "Health",
    title: "The Benefits of a Healthy Lifestyle",
    author: "John Smith",
    date: "2023-02-15",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    image_url: "https://picsum.photos/300/200",
    category: "Finance",
    title: "Investing for Beginners",
    author: "Alice Johnson",
    date: "2023-03-10",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    image_url: "https://picsum.photos/300/200",
    category: "Travel",
    title: "Top 10 Destinations for 2023",
    author: "Bob Brown",
    date: "2023-04-05",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    image_url: "https://picsum.photos/300/200",
    category: "Education",
    title: "The Future of Online Learning",
    author: "Carol White",
    date: "2023-05-20",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 6,
    image_url: "https://picsum.photos/300/200",
    category: "Food",
    title: "Healthy Recipes for Busy People",
    author: "David Green",
    date: "2023-06-15",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 7,
    image_url: "https://picsum.photos/300/200",
    category: "Lifestyle",
    title: "Minimalism: A Guide to Simplifying Your Life",
    author: "Eve Black",
    date: "2023-07-10",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 8,
    image_url: "https://picsum.photos/300/200",
    category: "Fitness",
    title: "10 Tips for Staying Fit at Home",
    author: "Frank Blue",
    date: "2023-08-25",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 9,
    image_url: "https://picsum.photos/300/200",
    category: "Entertainment",
    title: "The Best Movies of 2023",
    author: "Grace Yellow",
    date: "2023-09-15",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 10,
    image_url: "https://picsum.photos/300/200",
    category: "Science",
    title: "Breakthroughs in Quantum Computing",
    author: "Henry Red",
    date: "2023-10-05",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

interface FilterOption {
  value: string | number;
  label: string;
  count?: number;
}

interface Filters {
  category: string[];
  author: string[];
  date: string[];
}

interface FilterSection {
  title: string;
  type: keyof Filters;
  options: FilterOption[];
}

const filterSections: FilterSection[] = [
  {
    title: "Blog Category",
    type: "category",
    options: [
      { value: "technology", label: "Technology", count: 15 },
      { value: "health", label: "Health", count: 10 },
      { value: "lifestyle", label: "Lifestyle", count: 8 },
    ],
  },
  {
    title: "Authors",
    type: "author",
    options: [
      { value: "jane-doe", label: "Jane Doe", count: 5 },
      { value: "john-smith", label: "John Smith", count: 3 },
    ],
  },
  {
    title: "Date",
    type: "date",
    options: [
      { value: "2023", label: "2023", count: 10 },
      { value: "2022", label: "2022", count: 8 },
    ],
  },
];

const BlogPage: React.FC = () => {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogs);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  const [filters, setFilters] = useState<Filters>({
    category: searchParams.getAll("category"),
    author: searchParams.getAll("author"),
    date: searchParams.getAll("date"),
  });

  const updateUrlWithFilters = (newFilters: Partial<Filters>) => {
    const newSearchParams = new URLSearchParams();

    if (searchQuery) newSearchParams.set("search", searchQuery);

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
      return blogs.filter((blog) => {
        const matchesSearch = searchQuery
          ? blog.title.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        const matchesCategory =
          filters.category.length === 0 ||
          filters.category.includes(blog.category);

        const matchesAuthor =
          filters.author.length === 0 || filters.author.includes(blog.author);

        const matchesDate =
          filters.date.length === 0 || filters.date.includes(blog.date);

        return matchesSearch && matchesCategory && matchesAuthor && matchesDate;
      });
    };

    setFilteredBlogs(applyFilters());
  }, [filters, searchQuery]);

  const handleSearch = (searchText: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    if (searchText) {
      updatedSearchParams.set("search", searchText);
    } else {
      updatedSearchParams.delete("search");
    }
    setSearchParams(updatedSearchParams);
  };

  return (
    <main>
      <Layout className="relative">
        <SearchResults
          blogs={filteredBlogs}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <SearchFilter
          onFilterChange={handleFilterChange}
          filters={filterSections}
          selectedFilters={filters}
        />
      </Layout>
    </main>
  );
};

export default BlogPage;
