export class TasksModel implements ITasks {
    id: number;
    name: string;
    isActive: boolean;
    isDeleted: boolean;

    constructor(tasks: ITasks) {
        this.id = tasks.id;
        this.name = tasks.name;
        this.isActive = tasks.isActive;
        this.isDeleted = tasks.isDeleted;
    }
};

interface ITasks {
    id: number;
    name: string;
    isActive: boolean;
    isDeleted: boolean;
}