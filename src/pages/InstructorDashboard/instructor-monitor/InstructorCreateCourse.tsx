import React, { useState } from "react";
import { Button, Divider, Steps } from "antd";
import CourseInformation from "./create-courses/CourseInformation";
import Curriculum from "./create-courses/Curriculum";
import Price from "./create-courses/Price";
// 1: tao step va content
// 2: o trang curriculum tao session va ben trong do co o nut create lession

const InstructorCreateCourse = () => {
  const [current, setCurrent] = useState<number>(0);

  const steps = [
    {
      title: "Course Information",
      content: <CourseInformation />,
    },
    {
      title: "Curriculum",
      content: <Curriculum />,
    },

    {
      title: "Published",
      content: "Published Successfully",
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div>
      <Steps current={current} items={items} style={{ marginBottom: "2rem" }} />
      <Divider />
      <h1 className="text-xl">{steps[current].title}</h1>
      <Divider />
      <div className="mb-4">{steps[current].content}</div>
      <div className={`flex justify-between`}>
        <Button className={`${current > 0 ? "" : "hidden"}`} onClick={prev}>
          Previous
        </Button>
        <Button onClick={next}>Next</Button>
        {/* <Button onClick={next}>Submit</Button> */}
      </div>
    </div>
  );
};

export default InstructorCreateCourse;
