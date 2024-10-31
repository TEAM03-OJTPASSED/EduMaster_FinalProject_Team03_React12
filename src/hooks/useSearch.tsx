import { useEffect, useState } from "react";
import { debounce } from "lodash";

export const useDebouncedSearch = <T,>(
  data: T[],
  searchText: string,
  delay: number = 300,
  fields: Array<keyof T> = [] // Tham số fields để chỉ định các trường tìm kiếm
) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      const lowerCasedSearchText = searchText.toLowerCase();
      const filtered = data.filter((item) =>
        fields.some(
          (field) =>
            item[field]?.toString().toLowerCase().includes(lowerCasedSearchText) // Kiểm tra từng field
        )
      );
      setFilteredData(filtered);
    }, delay);

    debouncedFilter();
    return () => {
      debouncedFilter.cancel();
    };
  }, [data, searchText, delay, fields]);

  return filteredData;
};
