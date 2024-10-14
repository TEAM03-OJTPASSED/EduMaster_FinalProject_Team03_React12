import { useState, useEffect } from "react";

const useSearch = (data, keysToSearch) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase();
      const filtered = data.filter((item) =>
        keysToSearch.some((key) => {
          // Nếu key là một chuỗi, tìm kiếm trong item[key]
          if (typeof item[key] === "string") {
            return item[key].toLowerCase().includes(lowerCaseSearchText);
          }
          // Nếu key là một chuỗi, nhưng trong item[key] lại là một đối tượng, ví dụ: {name: 'John', email: 'john@example.com'}
          if (typeof item[key] === "object") {
            return Object.values(item[key]).some((value) =>
              value.toLowerCase().includes(lowerCaseSearchText)
            );
          }
          return false;
        })
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchText, data, keysToSearch]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return { searchText, filteredData, handleSearchChange };
};

export default useSearch;
