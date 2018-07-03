export class PhoneValidator {
    static isValid(control) {
        if (!control.value.startsWith('+' || '0') || !control.value.includes(/^([0-9 ]+)$/)) {
            return null;
        }
        return { invalidPhone: true };
    }
}
//# sourceMappingURL=phone.js.map