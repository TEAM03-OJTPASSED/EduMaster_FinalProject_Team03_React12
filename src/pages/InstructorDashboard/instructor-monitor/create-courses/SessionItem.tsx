import React, { useState } from "react";
import {
  UnorderedListOutlined,
  DownOutlined,
  UpOutlined,
  PlusCircleFilled
} from "@ant-design/icons";
import {
  listLessons,
  Session,
} from "../../../AdminDashboard/monitors/course/couseList";
import LessonItem from "./LessonItem";
import { Button } from "antd";

type SessionItem = {
  items: Session;
};

const SessionItem = ({ items }: SessionItem) => {
  const [viewMore, setViewMore] = useState(false);
  return (
    <div className="shadow-sm rounded-lg mt-2 bg-white">
      {/* Session */}
      <div className="border-b-2 border-gray-200 flex justify-between items-center p-4  bg-gray-100 rounded-t-lg">
        <div className="flex items-center gap-3">
          <UnorderedListOutlined
            style={{ fontSize: "1.5rem" }}
            className="text-gray-600"
          />
          {/* Session Name */}
          <h3 className="text-xl font-semibold text-gray-800">{items.name}</h3>
        </div>
        {viewMore ? (
          <Button
            icon={<UpOutlined />}
            onClick={() => setViewMore(false)}
            className="flex items-center !border-none shadow-none  !bg-gray-100 "
          />
        ) : (
          <Button
            icon={<DownOutlined />}
            onClick={() => setViewMore(true)}
            className="flex items-center !border-none !shadow-none  !bg-gray-100 "
          />
        )}
      </div>
      {/* Lesson List */}
      {viewMore && (
        <div className="">
          <div className="p-4 max-h-[300px] overflow-y-scroll">
            {/* sort by position-order */}
            {listLessons.map((lesson, index) => {
              return <LessonItem key={index} index={++index} item={lesson} />;
            })}
          </div>
          {/* create lesson */}
          <div className="p-2 ">
            <Button className="!border-none !shadow-none hover:!text-[#FF782D]" icon={<PlusCircleFilled/>}>
              New Lesson
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionItem;
