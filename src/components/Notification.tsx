import React from "react";
import { Alert, AlertProps } from "antd";

type AlertType = {
  message?: AlertProps["message"];
  type?: AlertProps["type"];
  showIcon?: AlertProps["showIcon"];
  closable?: AlertProps["closable"]; 
  action?: AlertProps["action"];
  className?: string;
};

const Notification: React.FC<AlertType> = (props) => {
  return <Alert {...props} />;
};

export default Notification;
