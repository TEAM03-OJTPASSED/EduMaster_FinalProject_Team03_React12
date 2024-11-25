import { MESSAGE_API } from "../constants/api/message";
import { ApiResponse, ApiResponseData, ApiResponseMessage } from "../models/ApiReponse.model";
import { Message, MessageSearchParams } from "../models/Message.model";
import { getRequest, postRequest } from "./httpsMethod";

const MESSAGE_SERVICE = {
    sendMessages(params: MessageSearchParams): Promise<ApiResponseData<ApiResponse<Message>>> {
        return postRequest(MESSAGE_API.GET_MESSAGES, params);
      },
      getMessages( ): Promise<ApiResponseData<ApiResponseMessage>> {
        return getRequest(MESSAGE_API.GET_MESSAGES);
      },
}
export default MESSAGE_SERVICE;