import React from "react";
import { Card, Row, Col, Skeleton } from "antd";
import { Category } from "../../models/Category.model";



interface CategoriesGridProps {
  categories: Category[];
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ categories }) => {
  return (
    <Row gutter={[20, 20]}>
      {categories.length < 1 ? (
        <Skeleton></Skeleton>
      ) : (
        categories.map((category, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
            <Card
              hoverable
              className="text-center justify-center bg-zinc-800 duration-500 hover:bg-orange-500 h-full !p-0 flex flex-col transition-all hover:shadow-lg"
            >
              <div className="flex flex-col items-center">
               
                <p className="font-exo text-white font-semibold">
                  {category.name}
                </p>
              </div>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default CategoriesGrid;
