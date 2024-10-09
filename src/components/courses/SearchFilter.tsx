import React from 'react';
import { Checkbox, Rate } from "antd";
import Sider from "antd/es/layout/Sider";

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

interface SearchFilterProps {
  filters: FilterSection[];
  onFilterChange: (filters: { [key: string]: string[] | number[] }) => void;
  selectedFilters: Filters;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ filters, onFilterChange, selectedFilters }) => {
  const handleFilterChange = (filterType: keyof Filters, checkedValues: string[] | number[]) => {
    onFilterChange({ [filterType]: checkedValues });
  };

  const renderCheckboxGroup = (section: FilterSection) => (
    <Checkbox.Group
      className="flex flex-col space-y-2"
      value={selectedFilters[section.type] as string[]} // Type cast added here
      onChange={(checkedValues) => handleFilterChange(section.type, checkedValues as string[] | number[])}
    >
      {section.options.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          {option.label} {option.count !== undefined && `(${option.count})`}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );

  const renderRatingGroup = (section: FilterSection) => (
    <Checkbox.Group
      className="flex flex-col space-y-2"
      value={selectedFilters[section.type] as number[]} // Type cast for reviews (number[])
      onChange={(checkedValues) => handleFilterChange(section.type, checkedValues)}
    >
      {section.options.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          <Rate disabled defaultValue={Number(option.value)} /> {option.count !== undefined && `(${option.count})`}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );

  return (
    <Sider width={300} theme="light" className="p-4">
      {filters.map((section) => (
        <div key={section.type}>
          <h3 className="text-lg font-semibold mt-6 mb-4">{section.title}</h3>
          {section.type === 'review' ? renderRatingGroup(section) : renderCheckboxGroup(section)}
        </div>
      ))}
    </Sider>
  );
};
