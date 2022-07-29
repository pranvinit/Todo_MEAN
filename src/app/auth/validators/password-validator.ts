import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordValidator implements Validator {
  validate(formGroup: AbstractControl<any, any>): ValidationErrors {
    const { password, passwordConfirm } = formGroup.value;

    if (password === passwordConfirm) return null;
    return { passwordsDontMatch: true };
  }
}
