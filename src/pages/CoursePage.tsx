import { Layout } from "antd";
import { useEffect, useState } from "react";
import { SearchFilter } from "../components/courses/SearchFilter";
import { SearchResults } from "../components/courses/SearchResult";
import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb";
import { Course } from "../models/Course.model";
import { GetCategoriesClient, GetCourseClient } from "../models/Client.model";
import ClientService from "../services/client.service";
import { useSearchParams } from "react-router-dom"; // For handling query params
import { Category } from "../models/Category.model";

const initialCoursesParams: GetCourseClient = {
  pageInfo: {
    pageNum: 1,
    pageSize: 10,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    category_id: "",
  },
};

const initialCategoriesParams: GetCategoriesClient = {
  pageInfo: {
    pageNum: 1,
    pageSize: 100,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
  },
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [noResult, setNoResult] = useState(false);

  const initialKeyword = searchParams.get("search") || "";
  const initialCategoryId = searchParams.get("category") || "";

  const [coursesParams, setCoursesParams] = useState<GetCourseClient>({
    ...initialCoursesParams,
    searchCondition: {
      ...initialCoursesParams.searchCondition,
      keyword: initialKeyword,
      category_id: initialCategoryId,
    },
  });

  const handleSearch = (searchText: string) => {
    setNoResult(false);
    setCourses([])
    setSearchParams((prevParams) => {
      prevParams.set("search", searchText);
      return prevParams;
    });
    setCoursesParams((prevParams) => ({
      ...prevParams,
      searchCondition: {
        ...prevParams.searchCondition,
        keyword: searchText,
      },
      pageInfo: {
        ...prevParams.pageInfo,
        pageNum: 1,
      },
    }));
  };

  const handleFilterChange = (value: string) => {
    setNoResult(false);
    setCourses([])
    setSearchParams((prevParams) => {   
      prevParams.set("category", value);     
      return prevParams;
    });
    setCoursesParams((prevParams) => ({
      ...prevParams,
      searchCondition: {
        ...prevParams.searchCondition,
        category_id: value,
      },
      pageInfo: {
        ...prevParams.pageInfo,
        pageNum: 1,
      },
    }));
  };

  const fetchCategories = async () => {
    const response = await ClientService.getCategories(initialCategoriesParams);
    setCategories(response?.data?.pageData ?? []);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await ClientService.getCourses(coursesParams);
      if (response.data?.pageInfo?.totalItems === 0) setNoResult(true);
      setCourses(response?.data?.pageData ?? []);
    };

    fetchCourses();
  }, [coursesParams]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="mt-2 min-h-screen mb-40 relative">
      <div className="p-4 pb-0">
        <DynamicBreadcrumb />
      </div>
      <Layout className="relative">
        <SearchResults
          noResult={noResult}
          courses={courses}
          onSearch={handleSearch}
          searchQuery={coursesParams.searchCondition.keyword}
        />
        <SearchFilter
          onChange={handleFilterChange}
          filters={[
            {
              title: "Search Categories",
              options: categories.map((cat) => ({
                value: cat._id,
                label: cat.name,
              })),
            },
          ]}
          selectedFilter={coursesParams.searchCondition.category_id}
        />
      </Layout>
    </main>
  );
}
