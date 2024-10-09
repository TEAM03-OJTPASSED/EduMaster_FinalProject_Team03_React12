import { SetStateAction, useState } from "react";
import { Overview } from "./Detail/Overview";

type Props = {
  a: string;
};
export const Detail = ({ a }: Props) => {
  const [selected, setSelected] = useState("overview");

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelected(event.target.value);
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg mt-12 ml-20 w-2/3">
      <div className="flex justify-between items-center">
        <label className="w-1/5 text-center font-semibold cursor-pointer">
          <input
            type="radio"
            name="tab"
            value="overview"
            checked={selected === "overview"}
            onChange={handleChange}
            className="hidden"
          />
          <div
            className={`p-2 ${
              selected === "overview"
                ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-r-gray-200"
                : "bg-white-200 border-b-2 border-gray-200"
            }`}
          >
            Overview
          </div>
        </label>
        <label className="w-1/5 text-center font-semibold cursor-pointer">
          <input
            type="radio"
            name="tab"
            value="curriculum"
            checked={selected === "curriculum"}
            onChange={handleChange}
            className="hidden"
          />
          <div
            className={`p-2 ${
              selected === "curriculum"
                ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-x-gray-200"
                : "bg-white-200 border-b-2 border-gray-200"
            }`}
          >
            Curriculum
          </div>
        </label>
        <label className="w-1/5 text-center font-semibold cursor-pointer">
          <input
            type="radio"
            name="tab"
            value="instructor"
            checked={selected === "instructor"}
            onChange={handleChange}
            className="hidden"
          />
          <div
            className={`p-2 ${
              selected === "instructor"
                ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-x-gray-200"
                : "bg-white-200 border-b-2 border-gray-200"
            }`}
          >
            Instructor
          </div>
        </label>
        <label className="w-1/5 text-center font-semibold cursor-pointer">
          <input
            type="radio"
            name="tab"
            value="qa"
            checked={selected === "qa"}
            onChange={handleChange}
            className="hidden"
          />
          <div
            className={`p-2 ${
              selected === "qa"
                ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-x-gray-200"
                : "bg-white-200 border-b-2 border-gray-200"
            }`}
          >
            Q&A
          </div>
        </label>
        <label className="w-1/5 text-center font-semibold cursor-pointer">
          <input
            type="radio"
            name="tab"
            value="reviews"
            checked={selected === "reviews"}
            onChange={handleChange}
            className="hidden"
          />
          <div
            className={`p-2 ${
              selected === "reviews"
                ? "bg-neutral-100 text-orange-500 border-b-2 border-neutral-100 rounded-t-lg border-x-2 border-l-gray-200"
                : "bg-white-200 border-b-2 border-gray-200"
            }`}
          >
            Reviews
          </div>
        </label>
      </div>
      <div className="p-4 bg-neutral-100">
        {selected === "overview" && <Overview a="1" />}
        {selected === "curriculum" && <Curriculum a="2" />}
        {selected === "instructor" && <div>Instructor content goes here.</div>}
        {selected === "qa" && <div>Q&A content goes here.</div>}
        {selected === "reviews" && <div>Reviews content goes here.</div>}
      </div>
    </div>
  );
};
