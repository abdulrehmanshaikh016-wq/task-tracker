import { TaskPrioritiesEnum } from "../../app/enums/task-priorities.enum";
import { TasksModel } from "../../app/models/tasks-model";

export const MockTasksList: TasksModel[] = [
  { id: 1, userId: 0, taskName: 'Buy groceries', taskDescription: 'Reminder to buy groceries', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.High },
  { id: 2, userId: 0, taskName: 'Finish project report', taskDescription: 'Finish a report for this project', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.Low },
  { id: 3, userId: 0, taskName: 'Call the electrician', taskDescription: 'Call the electrician to fix the lights', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.Medium },
  { id: 4, userId: 0, taskName: 'Schedule dentist appointment', taskDescription: 'Go to the dentist and get tooth fixed', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.Low },
  { id: 6, userId: 0, taskName: 'Prepare presentation slides', taskDescription: 'Prepare presentation for this tasks', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.Medium },
  { id: 7, userId: 0, taskName: 'Update resume', taskDescription: 'Update my resume', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.Low },
  { id: 8, userId: 0, taskName: 'Pay electricity bill', taskDescription: 'Pay the electricity bill for this month', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.High },
  { id: 9, userId: 0, taskName: 'Clean the garage', taskDescription: 'Clear out the messy stuff in the garage', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.High },
  { id: 10, userId: 0, taskName: 'Backup laptop files', taskDescription: 'Backup my laptop data to the cloud', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.High }
];