import React from "react";
import { Card, Row, Col } from "antd";

interface Category {
  icon: React.ReactNode;
  title: string;
  courses: number;
}

interface CategoriesGridProps {
  categories: Category[];
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ categories }) => {
  return (
    <Row gutter={[20, 20]}>
      {categories.length < 1 ? (
        <>adwd</>
      ) : (
        categories.map((category, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
            <Card
              hoverable
              className="text-center h-full flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col items-center">
                {category.icon}
                <h3 className="text-base font-semibold mt-4 mb-2">
                  {category.title}
                </h3>
                {/* <p className="text-gray-500">{category.courses} Courses</p> */}
              </div>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default CategoriesGrid;
