import { notification } from "antd";

// Định nghĩa các loại thông báo
type NotificationType = 'success' | 'error' | 'info' | 'warning';

export const handleNotify = (type: NotificationType, message: string, description: string) => {
    notification[type]({
        message: message,
        description: description,
    });
};