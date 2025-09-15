import { FormControl } from "@angular/forms";

export interface CreateANewTaskForm {
  taskName: FormControl<string | null>;
  taskDescription: FormControl<string | null>;
};