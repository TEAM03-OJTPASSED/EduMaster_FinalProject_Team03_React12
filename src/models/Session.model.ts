import { Lesson } from "./Lesson.model";

export type Session = {
    _id: string;
    name: string;
    description: string;
    tag: string[];
    position_order: number;
    lesson_list: Lesson[];
    full_time: number;
}[];


export interface SessionRequest {
    name: string;
    course_id: string;
    description: string;
    position_order: number;
}