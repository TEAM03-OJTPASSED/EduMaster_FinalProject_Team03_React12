import React, { useState, useEffect, useCallback } from 'react';
import { Drawer, Button, Radio } from "antd";
import { FilterOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { debounce } from 'lodash';

interface SearchFilterProps {
  filters: Filters[];
  selectedFilter?: string;
  onChange: (value: string) => void;
}

export interface Filters {
  options: { label: string, value: string }[];
  title: string;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ filters, onChange, selectedFilter }) => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debounce the onChange handler to delay the callback
  const debouncedOnChange = useCallback(debounce(onChange, 800), []);

  const renderFilters = () => (
    <div className='sticky-sider top-0'>
      {filters.map((section) => (
        <div key={section.title} className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
          <Radio.Group
            className="flex flex-col space-y-2"
            defaultValue={selectedFilter}
            onChange={(e) => debouncedOnChange(e.target.value)}
          >
            {section.options.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
          <button
            className='italic text-orange-600 mt-2'
            onClick={() => debouncedOnChange('')} // Clear filters when button is clicked
          >
            Clear Filters
          </button>
        </div>
      ))}
    </div>
  );

  return isMobile ? (
    <div className='absolute -top-2 right-4'>
      <Button
        type="primary"
        icon={<FilterOutlined />}
        onClick={() => setVisible(true)}
        className="mb-4 font-jost view-button ant-btn-variant-solid"
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
  );
};
