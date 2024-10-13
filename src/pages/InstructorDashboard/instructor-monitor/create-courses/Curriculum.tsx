import { Button } from "antd";
import React from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { listSessions } from "../../../AdminDashboard/monitors/course/couseList";
import SessionItem from "./SessionItem";

const Curriculum = () => {
  return (
    <div>
      <div>
        <Button
          className="!border-none !shadow-none hover:!text-[#FF782D]"
          icon={<PlusCircleFilled />}
        >
          Create Session
        </Button>
        <div className="mt-5 max-h-[350px] overflow-y-scroll">
          {listSessions.map((session) => {
            return <SessionItem items={session} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
