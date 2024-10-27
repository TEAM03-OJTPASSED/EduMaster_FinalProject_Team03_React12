export interface SearchCondition {
    keyword?: string;
    category_id?: string;
    status?: string;
    is_deleted: false; 
}


export interface PageInfo {
    pageNum: number;
    pageSize: number;
    totalItems?: number;
    totalPages?: number;
}

  
