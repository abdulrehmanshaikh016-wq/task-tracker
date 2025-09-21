import { FormControl } from "@angular/forms";

export interface LoginForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
};