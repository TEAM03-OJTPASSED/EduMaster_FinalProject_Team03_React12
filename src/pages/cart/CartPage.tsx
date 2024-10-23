import React, { useState } from "react";
import { Tabs } from "antd";

import { useCustomNavigate } from "../../hooks/customNavigate";
import DynamicBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import MyCart from "../../components/cartTabs/MyCart";
import UnpaidOrders from "../../components/cartTabs/PendingCart";
import PurchasedOrders from "../../components/cartTabs/PurchasedCart";
import CancelledOrders from "../../components/cartTabs/CancelledCart";



interface Course {
  id: number;
  name: string;
  price: number;
  image: string;
  author: string; 
  discount: number;
}

//Gets all carts => then sorts each cart + item into their respective carts status

const CartPage: React.FC = () => {
  const navigate = useCustomNavigate();
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "Advanced Web Development",
      price: 2400000,
      image: "https://picsum.photos/400",
      author: "Author Name",
      discount: 0,
    },
    {
      id: 2,
      name: "Data Science Fundamentals",
      price: 2400000,
      image: "https://picsum.photos/400",
      author: "Author Name",
      discount: 20,

    },
    {
      id: 3,
      name: "Digital Marketing Mastery",
      price: 2400000,
      image: "https://picsum.photos/400",
      author: "Author Name",
      discount: 40,

    },
  ]);

  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  const removeCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
    setSelectedCourses(selectedCourses.filter((courseId) => courseId !== id));
  };

  const toggleSelectCourse = (id: number) => {
    if (selectedCourses.includes(id)) {
      setSelectedCourses(selectedCourses.filter((courseId) => courseId !== id));
    } else {
      setSelectedCourses([...selectedCourses, id]);
    }
  };


  const total = courses
    .filter((course) => selectedCourses.includes(course.id))
    .reduce((sum, course) => sum + course.price * ( 1 - (course.discount / 100) ), 0);

    return (
      <div className="container mx-auto px-4 py-8 font-jost">
        <DynamicBreadcrumb />
        <Tabs 
          defaultActiveKey="my-cart"
          className="custom-tabs font-jost "
          items={[
            {
              key: 'my-cart',
              label: 'My Cart',
              children: <MyCart 
                courses={courses} 
                navigate={navigate} 
                removeCourse={removeCourse} 
                selectedCourses={selectedCourses} 
                toggleSelectCourse={toggleSelectCourse} 
                total={total}
              />
            },
            {
              key: 'unpaid',
              label: 'Unpaid',
              children: <UnpaidOrders 
                courses={courses} 
                navigate={navigate} 
                total={total} 
                selectedCourses={selectedCourses} 
                toggleSelectCourse={toggleSelectCourse} 
              />
            },
            {
              key: 'purchased',
              label: 'Purchased',
              children: <PurchasedOrders 
                courses={courses} 
                navigate={navigate} 
                total={total} 
              />
            },
            {
              key: 'cancelled',
              label: 'Cancelled',
              children: <CancelledOrders 
                courses={courses} 
                navigate={navigate} 
                total={total} 
              />
            }
          ]}
        />
      </div>
  );
};

export default CartPage;
