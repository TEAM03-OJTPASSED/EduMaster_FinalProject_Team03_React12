import { useState, useEffect } from "react";

// type SearchableItem<T> = {
//   [key in keyof T]: string | object | unknown; // Giữ nguyên kiểu cho các thuộc tính
// };

const useSearch = <T extends object>(data: T[], keysToSearch: (keyof T)[]) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase();
      const filtered = data.filter((item) =>
        keysToSearch.some((key) => {
          // Nếu key là một chuỗi, tìm kiếm trong item[key]
          if (typeof item[key] === "string") {
            return item[key].toLowerCase().includes(lowerCaseSearchText);
          }
          // Nếu key là một chuỗi, nhưng trong item[key] lại là một đối tượng
          if (typeof item[key] === "object" && item[key] !== null) {
            return Object.values(item[key]).some((value) => {
              if (typeof value === "string") {
                return value.toLowerCase().includes(lowerCaseSearchText);
              }
              return false; // Bỏ qua nếu không phải là chuỗi
            });
          }
          return false;
        })
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchText, data, keysToSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return { searchText, filteredData, handleSearchChange };
};

export default useSearch;
