import CLIENT_API from "../constants/api/client"
import { ApiResponse } from "../models/ApiReponse.model"
import { GetCategoriesClient, GetCourseClient } from "../models/Client.model"
import { getRequest, postRequest } from "./httpsMethod"

const ClientService = {
    getCourses(params: GetCourseClient): Promise<ApiResponse> {
        return postRequest(CLIENT_API.COURSE_SEARCH, params)
    },
    getCourseDetails(courseId: string):  Promise<ApiResponse>{
        return getRequest(CLIENT_API.COURSE_DETAILS(courseId))
    },
    getCategories(params: GetCategoriesClient):  Promise<ApiResponse> {
        return postRequest(CLIENT_API.COURSE_SEARCH, params)
    },
    getBlogs(params: GetCategoriesClient):  Promise<ApiResponse> {
        return postRequest(CLIENT_API.COURSE_SEARCH, params)
    },
    getBlogDetail(blogId: string):  Promise<ApiResponse> {
        return getRequest(CLIENT_API.BLOG_DETAILS(blogId))
    },
    
    


}
     

export default ClientService