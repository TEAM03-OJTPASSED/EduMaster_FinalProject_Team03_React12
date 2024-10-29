import { notification } from "antd";


export const handleNotify = (message:string, description: string) => {
    notification.success({
        message: message,
        description: description,
      });
}

