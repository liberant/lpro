import { FormControl } from '@angular/forms';

export class PhoneValidator {
  static isValid(control: FormControl) {
    if (!control.value.startsWith('+' || '0') || !control.value.includes(/^([0-9 ]+)$/)) {
      return null;
    }
    return { invalidPhone: true };
  }
}
