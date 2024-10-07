import { Button, Card, Tag } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";
import { TiUserOutline } from "react-icons/ti";


interface Course {
    id: number
    image_url: string
    category: string
    name: string
    author: string
    duration: string
    students: number
    price: number | string
}


// interface Course {
//     name: string;
//     category_id: string;
//     description: string;
//     content: string;
//     video_url: string;
//     image_url: string;
//     price: number;
//     discount: number;
// }

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <Card
      hoverable
      cover={
        <div className="relative">
          <img alt={course.name} src={course.image_url} className="w-full h-48 object-cover " />
          <Tag className="absolute top-2 left-2 bg-black text-white">{course.category}</Tag>
        </div>
      }
      className="h-full flex flex-col rounded-3xl overflow-hidden group"
    >
      
      <div className="flex-grow">
        <p className="text-gray-500 text-sm mb-2">by {course.author}</p>
        <h3 className="text-base font-semibold mb-4 overflow-ellipsis overflow-hidden whitespace-nowrap transition group-hover:text-[#FFAB2D]">{course.name}</h3>
      </div>  
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span className="flex items-center"><AiOutlineClockCircle className="mr-1" />{course.duration}</span>
            <span className="flex items-center"><TiUserOutline className="mr-1" />{course.students} Students</span>
        </div>
        
        <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-orange-500">
            {typeof course.price === 'number' ? `$${course.price.toFixed(2)}` : course.price}
            </span>
            <Button type="link" className="text-blue-600 hover:text-blue-800">View More</Button>
        </div>
      </div>
    </Card>
  )
export default CourseCard