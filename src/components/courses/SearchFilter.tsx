import { Checkbox, Rate } from "antd";
import Sider from "antd/es/layout/Sider";

interface SearchFilterProps {
  onFilterChange: (filters: { [key: string]: string[] | number[] }) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange }) => {
  const handleFilterChange = (filterType: string, checkedValues: string[] | number[]) => {
    onFilterChange({ [filterType]: checkedValues });
  };

  return (
    <Sider width={300} theme="light" className="p-4">
      {/* Course Category Filter */}
      <h3 className="text-lg font-semibold mb-4">Course Category</h3>
      <Checkbox.Group
        className="flex flex-col space-y-2"
        onChange={(checkedValues) => handleFilterChange('category', checkedValues as string[])}
      >
        <Checkbox value="commercial">Commercial (15)</Checkbox>
        <Checkbox value="office">Office (15)</Checkbox>
        <Checkbox value="shop">Shop (15)</Checkbox>
        <Checkbox value="educate">Educate (15)</Checkbox>
        <Checkbox value="academy">Academy (15)</Checkbox>
        <Checkbox value="single-family-home">Single family home (15)</Checkbox>
        <Checkbox value="studio">Studio (15)</Checkbox>
        <Checkbox value="university">University (15)</Checkbox>
      </Checkbox.Group>

      {/* Instructors Filter */}
      <h3 className="text-lg font-semibold mt-6 mb-4">Instructors</h3>
      <Checkbox.Group
        className="flex flex-col space-y-2"
        onChange={(checkedValues) => handleFilterChange('instructor', checkedValues as string[])}
      >
        <Checkbox value="kenny-white">Kenny White (15)</Checkbox>
        <Checkbox value="john-doe">John Doe (15)</Checkbox>
      </Checkbox.Group>

      {/* Price Filter */}
      <h3 className="text-lg font-semibold mt-6 mb-4">Price</h3>
      <Checkbox.Group
        className="flex flex-col space-y-2"
        onChange={(checkedValues) => handleFilterChange('price', checkedValues as string[])}
      >
        <Checkbox value="all">All (15)</Checkbox>
        <Checkbox value="free">Free (15)</Checkbox>
        <Checkbox value="paid">Paid (15)</Checkbox>
      </Checkbox.Group>

      {/* Review Filter */}
      <h3 className="text-lg font-semibold mt-6 mb-4">Review</h3>
      <Checkbox.Group
        className="flex flex-col space-y-2"
        onChange={(checkedValues) => handleFilterChange('review', checkedValues as number[])}
      >
        {[5, 4, 3, 2, 1].map((rating) => (
          <Checkbox key={rating} value={rating}>
            <Rate disabled defaultValue={rating} /> (1,025)
          </Checkbox>
        ))}
      </Checkbox.Group>

      {/* Level Filter */}
      <h3 className="text-lg font-semibold mt-6 mb-4">Level</h3>
      <Checkbox.Group
        className="flex flex-col space-y-2"
        onChange={(checkedValues) => handleFilterChange('level', checkedValues as string[])}
      >
        <Checkbox value="all-levels">All levels (15)</Checkbox>
        <Checkbox value="beginner">Beginner (15)</Checkbox>
        <Checkbox value="intermediate">Intermediate (15)</Checkbox>
        <Checkbox value="expert">Expert (15)</Checkbox>
      </Checkbox.Group>
    </Sider>
  );
};
