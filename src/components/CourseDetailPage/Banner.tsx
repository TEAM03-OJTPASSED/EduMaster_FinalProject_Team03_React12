import { CourseSummary } from "./CourseSummary";

type Props = {
  courseId: string;
  title?: string;
  category?: string;
  overview?: string;
  instructor?: string;
  timeToComplete?: string;
  imageUrl?: string;
  price?: number;
  discount?: number;
  isPurchased: boolean;
};
export const Banner = ({
  courseId,
  title,
  category,
  overview,
  instructor,
  imageUrl,
  price,
  discount,
  isPurchased,
}: Props) => {
  return (
    <div className="font-exo flex flex-col bg-orange-50 px-20 lg:-mx-40 -mx-24 pb-10">
      <div className="flex gap-8 pt-10">
        <div className="lg:w-2/3 flex flex-col gap-4 items-start">
          <div className="bg-orange-500 text-white font-bold px-4 py-2 rounded-lg">
            {category}
          </div>
          <div className="font-jost text-5xl font-bold text-gradient">{title}</div>
          <div className="text-lg">{overview}</div>
          <div className="text-lg">
            Instructor:{" "}
            <span
              className="px-2 underline"
              onClick={() => alert("Instructor clicked")}
            >
              {instructor}
            </span>
          </div>
          {isPurchased ? (
            <div className="flex items-baseline gap-4">
              <div
                className="bg-orange-500 text-white text-2xl font-semibold px-8 py-4 rounded cursor-pointer"
                onClick={() => (window.location.href = `/learn/${courseId}`)}
              >
                Learn Now
              </div>
              <div className="font-light">Already enrolled</div>
            </div>
          ) : (
            <div className="flex">
              <div className="bg-orange-500 text-white text-2xl font-semibold px-8 py-4 rounded cursor-pointer">
                Start Now
              </div>
              <div className="flex flex-col items-start justify-center ml-4">
                {discount && discount > 0 ? (
                  <>
                    <div className="text-xl line-through text-gray-500">
                      US${price?.toFixed(2)}
                    </div>
                    <div className="text-2xl font-bold text-orange-500">
                      US${(price! - (price! * discount) / 100).toFixed(2)}
                    </div>
                  </>
                ) : (
                  <div className="text-2xl font-bold text-orange-500">
                    ${price?.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="hidden lg:w-1/3 lg:block relative">
          <div className="absolute inset-0">
            <img
              src={imageUrl}
              alt="Course"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="relative flex justify-center">
        <CourseSummary
          time={0}
          student={0}
          level={""}
          lessons={0}
          quizzes={0}
        />
      </div>
    </div>
  );
};
