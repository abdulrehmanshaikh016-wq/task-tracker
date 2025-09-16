import { TaskPrioritiesEnum } from "../../app/enums/task-priorities.enum";
import { TasksModel } from "../../app/models/tasks-model";

export const MockTasksList: TasksModel[] = [
  { id: 1, taskName: 'Buy groceries', taskDescription: '', isActive: true, isDeleted: true, taskPriority: TaskPrioritiesEnum.High },
  { id: 2, taskName: 'Finish project report', taskDescription: '', isActive: true, isDeleted: true, taskPriority: TaskPrioritiesEnum.Low },
  { id: 3, taskName: 'Call the electrician', taskDescription: '', isActive: true, isDeleted: true, taskPriority: TaskPrioritiesEnum.Medium },
  { id: 4, taskName: 'Schedule dentist appointment', taskDescription: '', isActive: true, isDeleted: true, taskPriority: TaskPrioritiesEnum.Low },
  { id: 5, taskName: 'Review pull requests', taskDescription: '', isActive: true, isDeleted: true, taskPriority: TaskPrioritiesEnum.Low },
  { id: 6, taskName: 'Prepare presentation slides', taskDescription: '', isActive: true, isDeleted: true, taskPriority: TaskPrioritiesEnum.Medium },
  { id: 7, taskName: 'Update resume', taskDescription: '', isActive: true, isDeleted: true, taskPriority: TaskPrioritiesEnum.Low },
  { id: 8, taskName: 'Pay electricity bill', taskDescription: '', isActive: true, isDeleted: true, taskPriority: TaskPrioritiesEnum.High },
  { id: 9, taskName: 'Clean the garage', taskDescription: '', isActive: true, isDeleted: true, taskPriority: TaskPrioritiesEnum.High },
  { id: 10, taskName: 'Backup laptop files', taskDescription: '', isActive: true, isDeleted: true, taskPriority: TaskPrioritiesEnum.High }
];