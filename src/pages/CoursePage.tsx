'use client'

import { Layout } from "antd"
import { useEffect, useState } from "react"
import { SearchFilter } from "../components/courses/SearchFilter"
import { SearchResults } from "../components/courses/SearchResult"
import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb"
import { Course } from "../models/Course.model"
import { GetCourseClient } from "../models/Client.model"
import ClientService from "../services/client.service"
import { useSearchParams } from "react-router-dom"

interface FilterOption {
  value: string | number
  label: string
  count?: number
}

interface Filters {
  category: string[]
}

interface FilterSection {
  title: string
  type: keyof Filters
  options: FilterOption[]
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
    ],
  },
  // Add other filter sections here
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [noResult, setNoResult] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    category: [],
  })
  const [coursesParams, setCoursesParams] = useState<GetCourseClient>({
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    searchCondition: {
      keyword: "",
      is_deleted: false,
      category_id: "",
    },
  })

  const handleSearch = (searchText: string) => {
    setNoResult(false)
    const updatedSearchParams = new URLSearchParams(searchParams);
    if (searchText) {
      updatedSearchParams.set("search", searchText);
    } else {
      updatedSearchParams.delete("search");
    }
    setSearchParams(updatedSearchParams);
    setCourses([])
    setCoursesParams((prevParams) => ({
      ...prevParams,
      searchCondition: {
        ...prevParams.searchCondition,
        keyword: searchText,
      },
      pageInfo: {
        ...prevParams.pageInfo,
        pageNum: 1, // Reset to first page on new search
      },
    }))
  }

  const handleFilterChange = (filterType: keyof Filters, value: string | number) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters }
      const index = updatedFilters[filterType].indexOf(value.toString())
      if (index > -1) {
        updatedFilters[filterType].splice(index, 1)
      } else {
        updatedFilters[filterType].push(value.toString())
      }
      return updatedFilters
    })
  }

  // const handlePageChange = (page: number, pageSize?: number) => {
  //   setCoursesParams((prevParams) => ({
  //     ...prevParams,
  //     pageInfo: {
  //       pageNum: page,
  //       pageSize: pageSize || prevParams.pageInfo.pageSize,
  //     },
  //   }))
  // }

  useEffect(() => {
    const fetchCourses = async () => {
        const response = await ClientService.getCourses(coursesParams)
        if (response.data?.pageInfo?.totalItems === 0) setNoResult(true);
        setCourses(response?.data?.pageData ?? [])
    }

    fetchCourses()
  }, [coursesParams])

  useEffect(() => {
    const applyFilters = () => {
      let result = courses

      // Apply category filter
      if (filters.category.length > 0) {
        result = result.filter((course) => filters.category.includes(course.category_name))
      }

      // Apply other filters here...

      setCourses(result)
    }

    applyFilters()
  }, [courses, filters])

  return (
    <main className="mt-2 min-h-screen relative">
      <div className="p-4 pb-0">
        <DynamicBreadcrumb />
      </div>
      <Layout className="relative overflow-clip">
        <SearchResults
          noResult={noResult}
          courses={courses}
          onSearch={handleSearch}
          searchQuery={coursesParams.searchCondition.keyword}
        />
        <SearchFilter
          onFilterChange={handleFilterChange}
          filters={filterSections}
          selectedFilters={filters}
        />
      </Layout>
    </main>
  )
}