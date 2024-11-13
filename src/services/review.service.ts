import { REVIEW_API } from "../constants/api/review";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import { GetReviews, Review, ReviewRequest } from "../models/Review.model";
import { deleteRequest, getRequest, postRequest, putRequest } from "./httpsMethod";

const ReviewService = {
    createReview(params: ReviewRequest): Promise<ApiResponse<Review>> {
      return postRequest(REVIEW_API.CREATE_REVIEW, params);
    },
  
    getReviews(
      params: GetReviews
    ): Promise<ApiResponse<APIResponseData<Review>>> {
      return postRequest(REVIEW_API.GET_REVIEWS, params);
    },
  
    getView(reviewId: string): Promise<ApiResponse<Review>> {
      return getRequest(REVIEW_API.GET_REVIEW(reviewId));
    },
  
    updateReview(
        reviewId: string,
      params: ReviewRequest
    ): Promise<ApiResponse<Review>> {
      return putRequest(REVIEW_API.UPDATE_REVIEW(reviewId), params);
    },
  
    deleteReview(reviewId: string): Promise<ApiResponse> {
      return deleteRequest(REVIEW_API.DELETE_REVIEW(reviewId));
    }
  };
  
  export default ReviewService;