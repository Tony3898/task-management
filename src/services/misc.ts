import {PRIORITY, STATUS, Task} from "../interfaces/Task.ts";

export const fetchColorByPriority = (priority: PRIORITY): "error" | "warning" | "success" => {
    const color: {
        "HIGH": "error",
        "MEDIUM": "warning",
        "LOW": "success"
    } = {
        "HIGH": "error",
        "MEDIUM": "warning",
        "LOW": "success"
    }
    return color[priority];
};

export const fetchColorByStatus = (status: STATUS): "info" | "warning" | "success" => {
    const color: {
        "TODO": "info",
        "IN PROGRESS": "warning",
        "DONE": "success"
    } = {
        "TODO": "info",
        "IN PROGRESS": "warning",
        "DONE": "success"
    }
    return color[status];
}

export const defaultTasks: Array<Task> = [
    {
        title: "Task Title 1",
        id: -1,
        description: "Task Description 1",
        dueDate: Date.now() + (24 * 60 * 60 * 1000),
        priority: "HIGH",
        status: "DONE"
    }, {
        title: "Task Title 2",
        id: -2,
        description: "Task Description 2",
        dueDate: Date.now() + (48 * 60 * 60 * 1000),
        priority: "LOW",
        status: "TODO"
    },
    {
        title: "Task Title 3",
        id: -3,
        description: "Task Description 3",
        dueDate: Date.now() + (72 * 60 * 60 * 1000),
        priority: "MEDIUM",
        status: "IN PROGRESS"
    }
]