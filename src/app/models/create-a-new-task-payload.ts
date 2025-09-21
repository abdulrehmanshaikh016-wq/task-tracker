import { TaskPrioritiesEnum } from "../enums/task-priorities.enum";

export class CreateANewTaskPayload implements ICreateANewTaskPayload {
    userId: number;
    taskName: string;
    taskDescription: string;
    taskPriority: TaskPrioritiesEnum;

    constructor(createANewTaskPayload: ICreateANewTaskPayload) {
        this.userId = createANewTaskPayload.userId;
        this.taskName = createANewTaskPayload.taskName;
        this.taskDescription = createANewTaskPayload.taskDescription;
        this.taskPriority = createANewTaskPayload.taskPriority;
    }
}

interface ICreateANewTaskPayload {
    userId: number;
    taskName: string;
    taskDescription: string;
    taskPriority: TaskPrioritiesEnum;
};