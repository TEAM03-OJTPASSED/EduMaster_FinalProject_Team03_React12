import { CourseStatusEnum } from "../pages/AdminDashboard/monitors/course/courseList";
import { PurchaseStatusEnum } from "./Purchase.model";

export interface SearchCondition {
    keyword?: string;
    category_id?: string;
    status?: string;
    is_deleted: false; 
}

export interface CourseLogSearchCondition {
    course_id: string;
    keyword?: string;
    old_status: CourseStatusEnum;
    new_status: CourseStatusEnum;
    is_deleted: false; 
}


export interface SessionSearchCondition {
    course_id: string;
    keyword?: string;
    is_position_order: boolean;
    is_deleted: false; 
}

export interface LessonSearchCondition {
    course_id: string;
    keyword?: string;
    is_position_order: boolean;
    is_deleted: false; 
}

export interface PurchaseSearchCondition {
    purchase_no?: string,
    cart_no?: string,
    course_id?: string,
    status?: PurchaseStatusEnum,
    is_delete?: false
}


export interface PageInfo {
    pageNum: number;
    pageSize: number;
    totalItems?: number;
    totalPages?: number;
}

  
