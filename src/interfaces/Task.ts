export interface Task {
    description: string;
    id: number;
    dueDate: number;
    title: string;
    priority: PRIORITY
    status: STATUS
}

export type PRIORITY = "HIGH" | "MEDIUM" | "LOW"
export type STATUS = "DONE" | "TODO" | "IN PROGRESS"