type Props = {
  category: string;
  title: string;
};

export const RecentBlog = ({ category, title }: Props) => {
  const handleClick = () => {
    console.log("Clicked");
  };
  return (
    <div
      className="w-1/2 border rounded-lg px-6 py-4 cursor-pointer mt-2"
      onClick={handleClick}
    >
      <div className="font-light text-sm">{category}</div>
      <div className="font-bold">{title}</div>
    </div>
  );
};
