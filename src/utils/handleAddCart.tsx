import { notification } from "antd";


interface Course {
    id: number;
    image_url: string;
    category: string;
    name: string;
    author: string;
    duration: string;
    students: number;
    price: number | string;
    discount: number;
    lessons: number;
    description?: string;
    updatedDate?: string;
  }

export const handleAddCart = (course: Course) => {
    // Add the course to the cart
    //...
    console.log(course)
    notification.success({
      message: "Course Added to Cart",
      description: `You have added "${course.name}" to your cart.`,
    });
  }