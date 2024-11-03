export interface Payout {
}
export enum PayoutStatusEnum {
    NEW = 'new',
    REQUEST_PAYOUT = 'request_payout',
    COMPLETED = 'completed',
    REJECTED = 'rejected'
}


export interface CreatePayout {
    instructor_id: string;
    transactions:{ transaction_id: string }[]; 
}


export interface GetPayoutRequest {
    searchCondition: {
        payout_no?: string;
        instructor_id?: string;
        status?: PayoutStatusEnum;
        is_delete: boolean;
    };
    pageInfo: {
        pageNum: number;
        pageSize: number;
    };
}


export interface UpdateStatusPayoutRequest {
    status: PayoutStatusEnum;
    comment: string;
}
