export function convertWmicDateToISO(wmicDate: string): string {
    if (!wmicDate || wmicDate.length < 14) {
        return '';
    }

    const year = wmicDate.substring(0, 4);
    const month = wmicDate.substring(4, 6);
    const day = wmicDate.substring(6, 8);
    const hour = wmicDate.substring(8, 10);
    const minute = wmicDate.substring(10, 12);
    const second = wmicDate.substring(12, 14);

    return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}