export function URLValidator(control) {
    if (!control.value.startsWith('https' || 'http') || !control.value.includes('.io' || '.com' || '.net' || '.org')) {
        return { validUrl: true };
    }
    return null;
}
//# sourceMappingURL=url.js.map