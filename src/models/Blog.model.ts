export type Blog = {
    _id: string;
    name: string;
    user_id: string;
    user_name: string;
    category_id: string;
    category_name: string;
    image_url: string;
    description: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export interface BlogRequest {
    name: string;
    caetgory_id: string;
    image_url: string;
    description: string;
    content: string;
}