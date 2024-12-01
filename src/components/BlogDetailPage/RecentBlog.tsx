import dayjs from "dayjs";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { TiUserOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

type Props = {
  blog_id?: string;
  name?: string;
  created_at?: Date;
  user_name?: string;
  description?: string;
};

export const RecentBlog = ({ blog_id, name, created_at, user_name, description }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (blog_id) {
      navigate(`/blog/${blog_id}`);
    }
  };
  return (
    <div
      className="border rounded-lg px-6 py-4 cursor-pointer mt-2"
      onClick={handleClick}
    >
      <div className="flex-grow">
        <h2 className="text-base font-semibold mb-4 overflow-ellipsis overflow-hidden whitespace-nowrap transition group-hover:text-[#FFAB2D]">
          {name}
        </h2>
      </div>
      <div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <AiOutlineCalendar className="mr-1 text-orange-500" size={18} />
            {dayjs(created_at).format("DD/MM/YYYY")}
          </span>
          <span className="flex items-center justify-end">
            <TiUserOutline className="mr-1 text-orange-500" size={20} />
            {user_name}
          </span>
          <span className="flex items-center">
            <BiCategory className="mr-1 text-orange-500" size={18} />
            {description}
          </span>
        </div>

      </div>
    </div>
  );
};
