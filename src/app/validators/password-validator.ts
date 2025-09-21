import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { LoginValidatorsEnum } from "../enums/login-validators";

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    if (!value) {
        return { required: true };
    }

    if (value.length < LoginValidatorsEnum.PasswordMinLength) {
        return { minlength: { requiredLength: LoginValidatorsEnum.PasswordMinLength, actualLength: value.length } };
    }

    if (value.length > LoginValidatorsEnum.PasswordMaxLength) {
        return { maxlength: { requiredLength: LoginValidatorsEnum.PasswordMaxLength, actualLength: value.length } };
    }

    if (!/[a-z]/.test(value)) {
        return { lowercase: true };
    }

    if (!/[A-Z]/.test(value)) {
        return { uppercase: true };
    }

    if (!/\d/.test(value)) {
        return { number: true };
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return { specialChar: true };
    }

    return null;
};