export function capitalize(str: string) {
    if (str.length) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
    return str;
}
