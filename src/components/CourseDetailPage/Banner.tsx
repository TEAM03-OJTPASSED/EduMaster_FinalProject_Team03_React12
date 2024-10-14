import { CourseSummary } from "./CourseSummary";

type Props = {
  title?: string;
  category?: string;
  instructor?: string;
  timeToComplete?: string;
  imageUrl?: string;
  price?: number;
  discount?: number;
};
export const Banner = ({
  title,
  category,
  instructor,
  imageUrl,
  price,
  discount,
}: Props) => {
  return (
    <div className="flex flex-col bg-neutral-900 text-white px-20 py-10 gap-5 -mx-24">
      <div className="flex flex-col w-2/3 gap-5">
        <div className="flex items-baseline font-jost">
          <div className="bg-neutral-600 px-3 py-2 rounded-lg mr-2">
            {category}
          </div>
          <div className="font-thin">
            by<span className="px-1 font-semibold">{instructor}</span>
          </div>
        </div>
        <div className="font-exo font-semibold text-4xl">{title}</div>
      </div>
      <div className="absolute right-20 w-1/5 font-jost">
        <div className="h-60 w-full flex justify-center items-center overflow-hidden rounded-t-lg">
          <img src={imageUrl} alt={title} className="object-contain w-full" />
        </div>
        <div className="flex bg-white text-black px-2 py-3 rounded-b-lg items-center justify-between gap-2">
          <div className="flex gap-1 items-center">
            <div className="text-sm font-light text-neutral-500 line-through">
              ${price?.toFixed(2)}
            </div>
            <div className="text-lg font-semibold text-rose-500">
              $
              {price && discount
                ? (price * (1 - discount / 100)).toFixed(2)
                : price?.toFixed(2)}
            </div>
          </div>
          <div className="bg-orange-400 text-white px-2 py-1 rounded-full">
            Start Now
          </div>
        </div>
      </div>
      <CourseSummary time={2} student={156} level={"All"} lessons={20} quizzes={3} />
    </div>
  );
};
