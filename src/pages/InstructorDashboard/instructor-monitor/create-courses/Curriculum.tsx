import { Button, Modal } from "antd";
import React, { useState } from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { listSessions } from "../../../AdminDashboard/monitors/course/couseList";
import SessionItem from "./SessionItem";

const Curriculum = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const handleOk = ()=>{
    setIsVisibleModal(true)
  }
  const handleCancel = ()=>{
    setIsVisibleModal(false)
  }
  const handleCreateSession = ()=>{
    
  }
  return (
    <div>
      <div>
        <Button
          className="!border-none !shadow-none hover:!text-[#FF782D]"
          icon={<PlusCircleFilled />}
          onClick={handleCreateSession}
        >
          Create Session
        </Button>
        <div className="mt-5 max-h-[350px] overflow-y-scroll">
          {listSessions.map((session) => {
            return <SessionItem items={session} />;
          })}
        </div>
      </div>
      <Modal 
        open={isVisibleModal}
        title="Create session"
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Curriculum;
