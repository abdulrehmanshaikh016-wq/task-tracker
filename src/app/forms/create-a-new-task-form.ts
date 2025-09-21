import { FormControl } from "@angular/forms";

export interface TaskFormGroup {
  taskName: FormControl<string | null>;
  taskDescription: FormControl<string | null>;
  taskPriority: FormControl<string | null>;
};