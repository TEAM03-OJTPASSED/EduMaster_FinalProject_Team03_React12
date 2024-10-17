import { useState, useEffect } from "react";

// type SearchableItem<T> = {
//   [key in keyof T]: string | object | unknown; // Giữ nguyên kiểu cho các thuộc tính
// };

const useSearch = <T extends object>(data: T[], keysToSearch: (keyof T)[]) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    const lowerCaseSearchText = searchText.toLowerCase();

    const filtered = data.filter((item) =>
      keysToSearch.some((key) => {
        if (typeof item[key] === "string") {
          return item[key].toLowerCase().includes(lowerCaseSearchText);
        }

        if (typeof item[key] === "object" && item[key] !== null) {
          return Object.values(item[key]).some((value) => {
            if (typeof value === "string") {
              return value.toLowerCase().includes(lowerCaseSearchText);
            }
            return false;
          });
        }
        return false; // Bỏ qua nếu không phải chuỗi hoặc đối tượng
      })
    );

    // Chỉ cập nhật filteredData nếu có sự thay đổi
    if (JSON.stringify(filtered) !== JSON.stringify(filteredData)) {
      setFilteredData(filtered);
    }
  }, [searchText, data, keysToSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return { searchText, filteredData, handleSearchChange };
};

export default useSearch;
