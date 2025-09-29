import { TaskPrioritiesEnum } from "../enums/task-priorities.enum";

export class TasksModel implements ITasks {
    id: number;
    members: number[];
    taskName: string;
    taskDescription: string;
    isActive: boolean;
    isDeleted: boolean;
    taskPriority: TaskPrioritiesEnum;

    constructor(tasks: ITasks) {
        this.id = tasks.id;
        this.members = tasks.members;
        this.taskName = tasks.taskName;
        this.taskDescription = tasks.taskDescription;
        this.isActive = tasks.isActive;
        this.isDeleted = tasks.isDeleted;
        this.taskPriority = tasks.taskPriority;
    }
};

interface ITasks {
    id: number;
    members: number[];
    taskName: string;
    taskDescription: string;
    isActive: boolean;
    isDeleted: boolean;
    taskPriority: TaskPrioritiesEnum;
}