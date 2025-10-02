import { TaskPrioritiesEnum } from "../enums/task-priorities.enum";

export class TasksModel implements ITasks {
    id: number;
    members: number[];
    taskName: string;
    taskDescription: string;
    isActive: boolean;
    isDeleted: boolean;
    taskPriority: TaskPrioritiesEnum;
    taskDuration!: number; // in hours
    elapsedTime: number = 0; // in seconds
    timerStart?: number | null; // timestamp when timer started

    constructor(tasks: ITasks) {
        this.id = tasks.id;
        this.members = tasks.members;
        this.taskName = tasks.taskName;
        this.taskDescription = tasks.taskDescription;
        this.isActive = tasks.isActive;
        this.isDeleted = tasks.isDeleted;
        this.taskPriority = tasks.taskPriority;
        this.taskDuration = tasks.taskDuration;
        this.elapsedTime = tasks.elapsedTime;
        this.timerStart = tasks.timerStart ?? null;
    }

    get progress(): number {
        if (!this.taskDuration || this.taskDuration <= 0) return 0;

        const totalSeconds = this.taskDuration * 3600;
        let currentElapsed = this.elapsedTime;

        // Add ongoing time if timer is running
        if (this.timerStart) {
            currentElapsed += Math.floor((Date.now() - this.timerStart) / 1000);
        }

        return Math.min(100, Math.round((currentElapsed / totalSeconds) * 100));
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
    taskDuration: number;
    elapsedTime: number;
    timerStart?: number | null;
}