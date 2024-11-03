


export enum PayoutStatusEnum {
    NEW = 'new',
    REQUEST_PAYOUT = 'request_payout',
    COMPLETED = 'completed',
    REJECTED = 'rejected'
}

export interface CreatePayout {
    instructor_id: string;
    transactions: { transaction_id: string }[];
}


