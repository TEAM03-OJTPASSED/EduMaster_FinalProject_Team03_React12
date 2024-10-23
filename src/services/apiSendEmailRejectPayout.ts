import { message } from "antd";
import axios from "axios";
export interface SendEmailRejectPayoutType {
    name: string;
    payoutNumber: string;
    email: string;
    message: string;
}
export const sendEmailToRejectPayout = async (formValue: SendEmailRejectPayoutType) => {
    const serviceId = 'service_gvrxoew';
    const templateId = 'template_pkkccig';
    const publicKey = 'gA4Svf4h68cmJm2L1';
    const payoutNumber = "P-v4o7uxha";
    const username = "Huynh Thanh Vinh";

    const data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
            payout_no: payoutNumber,
            from_name: 'EduMaster',
            to_email: formValue.email,
            to_name: username,
            message: formValue.message,
        }
    };

    try {
        const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
        console.log(res.data);
        message.success("Successfully !")
    } catch (error) {
        console.log(error);
    }
}
