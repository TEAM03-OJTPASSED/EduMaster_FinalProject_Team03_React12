export interface Question {
    _id: string;
    question: string;
    question_type: string;
    answer: string[];
    correct_answer: string[];
    creator: string;
    position_order: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
  }