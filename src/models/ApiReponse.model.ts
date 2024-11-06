import { PageInfo } from "./SearchInfo.model";

export interface APIResponseData<T = unknown> {
    pageData?: T[];
    pageInfo?: PageInfo;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T extends APIResponseData<infer U> ? APIResponseData<U> : T;
    message?: string;
    errors?: ApiError[];
  }

export interface ApiError {
    message: string; 
    field?: string; 
}

