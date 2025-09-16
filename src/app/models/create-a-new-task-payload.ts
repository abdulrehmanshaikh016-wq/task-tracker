import { TaskPrioritiesEnum } from "../enums/task-priorities.enum";

export class CreateANewTaskPayload implements ICreateANewTaskPayload {
    taskName: string;
    taskDescription: string;
    taskPriority: TaskPrioritiesEnum;

    constructor(createANewTaskPayload: ICreateANewTaskPayload) {
        this.taskName = createANewTaskPayload.taskName;
        this.taskDescription = createANewTaskPayload.taskDescription;
        this.taskPriority = createANewTaskPayload.taskPriority;
    }
}

interface ICreateANewTaskPayload {
    taskName: string;
    taskDescription: string;
    taskPriority: TaskPrioritiesEnum;
};