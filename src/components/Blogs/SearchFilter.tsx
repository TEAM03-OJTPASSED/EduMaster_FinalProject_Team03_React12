import React, { useState, useEffect } from 'react';
import { Checkbox, Drawer, Button } from "antd";
import { FilterOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';

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

interface BlogSearchFilterProps {
  filters: FilterSection[];
  onFilterChange: (filters: { [key: string]: string[] | number[] }) => void;
  selectedFilters: Filters;
}

export const SearchFilter: React.FC<BlogSearchFilterProps> = ({ filters, onFilterChange, selectedFilters }) => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleFilterChange = (filterType: keyof Filters, checkedValues: string[] | number[]) => {
    onFilterChange({ [filterType]: checkedValues });
  };

  const renderCheckboxGroup = (section: FilterSection) => (
    <Checkbox.Group
      className="flex flex-col space-y-2"
      value={selectedFilters[section.type] as string[]}
      onChange={(checkedValues) => handleFilterChange(section.type, checkedValues)}
    >
      {section.options.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          {option.label} {option.count !== undefined && `(${option.count})`}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );

  const renderFilters = () => (
    <>
      {filters.map((section) => (
        <div key={section.type} className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
          {renderCheckboxGroup(section)}
        </div>
      ))}
    </>
  );

  return (
    <>
      {isMobile ? (
        <div className='absolute -top-2 right-4'>
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={() => setVisible(true)}
            className="mb-4"
          >
            Filters
          </Button>
          <Drawer
            title="Filters"
            placement="right"
            onClose={() => setVisible(false)}
            visible={visible}
            width={300}
          >
            {renderFilters()}
          </Drawer>
        </div>
      ) : (
        <Sider width={250} theme="light" className="p-4">
          {renderFilters()}
        </Sider>
      )}
    </>
  );
};