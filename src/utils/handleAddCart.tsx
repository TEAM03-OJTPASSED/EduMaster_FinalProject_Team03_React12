import { message, notification } from "antd";
import { Course } from "../models/Course.model";




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