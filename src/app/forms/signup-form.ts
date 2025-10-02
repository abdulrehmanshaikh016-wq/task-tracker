import { FormControl } from "@angular/forms";

export interface SignupForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  profileImage: FormControl<string | null>;
};