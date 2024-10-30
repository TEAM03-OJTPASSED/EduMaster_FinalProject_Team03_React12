import { message, notification } from "antd";


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


export const handleAddCart = (userRole : string, course: Course, navigate: any) => {
  
    if (!userRole) {
      message.destroy();
      message.error(<span className="text-lg font-jost">You must be logged in to do this action. <a className="text-orange-500 underline" onClick={() => navigate("/login")}>Login</a></span>)
      return;
    }
    // Add the course to the cart
    //...
    console.log(course)
    notification.success({
      message: "Course Added to Cart",
      description: `You have added "${course.name}" to your cart.`,
    });
  }