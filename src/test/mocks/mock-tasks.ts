import { TaskPrioritiesEnum } from "../../app/enums/task-priorities.enum";
import { TasksModel } from "../../app/models/tasks-model";

export const MockTasksList: TasksModel[] = [
  { id: 1, members: [0], taskName: 'Buy groceries', taskDescription: 'Reminder to buy groceries', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.High, taskDuration: 1 },
  { id: 2, members: [0], taskName: 'Finish project report', taskDescription: 'Finish a report for this project', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.Low, taskDuration: 1 },
  { id: 3, members: [0], taskName: 'Call the electrician', taskDescription: 'Call the electrician to fix the lights', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.Medium, taskDuration: 1 },
  { id: 4, members: [0], taskName: 'Schedule dentist appointment', taskDescription: 'Go to the dentist and get tooth fixed', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.Low, taskDuration: 1 },
  { id: 6, members: [0], taskName: 'Prepare presentation slides', taskDescription: 'Prepare presentation for this tasks', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.Medium, taskDuration: 1 },
  { id: 7, members: [0], taskName: 'Update resume', taskDescription: 'Update my resume', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.Low, taskDuration: 1 },
  { id: 8, members: [0], taskName: 'Pay electricity bill', taskDescription: 'Pay the electricity bill for this month', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.High, taskDuration: 1 },
  { id: 9, members: [0], taskName: 'Clean the garage', taskDescription: 'Clear out the messy stuff in the garage', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.High, taskDuration: 1 },
  { id: 10, members: [0], taskName: 'Backup laptop files', taskDescription: 'Backup my laptop data to the cloud', isActive: true, isDeleted: false, taskPriority: TaskPrioritiesEnum.High, taskDuration: 1 }
];