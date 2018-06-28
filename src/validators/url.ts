import { AbstractControl } from '@angular/forms';

export function URLValidator(control: AbstractControl) {
  if (!control.value.startsWith('https' || 'http') || !control.value.includes('.io' || '.com' || '.net' || '.org' )) {
    return { validUrl: true };
  }
  return null;
}