import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  imports: [CommonModule, ReactiveFormsModule]
})

export class PasswordInputComponent {

  @Input({ required: true }) passwordInputControl!: FormControl;
  @Input({ required: true }) passwordInputId!: string;
  @Input({ required: true }) passwordInputLabel!: string;
  @Input({ required: true }) passwordInputAutocomplete!: string;
  @Input() passwordError: string | null = null;

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}