import CLIENT_API from "../constants/api/client"
import { GetCategoriesClient, GetCourseClient } from "../models/Client.model"
import { getRequest, postRequest } from "./httpsMethod"

const ClientService = {
    getCourses(params: GetCourseClient) {
        return postRequest(CLIENT_API.COURSE_SEARCH, params)
    },
    getCourseDetails(courseId: string){
        return getRequest(CLIENT_API.COURSE_DETAILS(courseId))
    },
    getCategories(params: GetCategoriesClient) {
        return postRequest(CLIENT_API.COURSE_SEARCH, params)
    },
    getBlogs(params: GetCategoriesClient) {
        return postRequest(CLIENT_API.COURSE_SEARCH, params)
    },
    getBlogDetail(blogId: string) {
        return getRequest(CLIENT_API.BLOG_DETAILS(blogId))
    },
    
    


}
     

export default ClientService