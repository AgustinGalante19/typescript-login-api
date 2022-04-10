export default function validateChars(str: string): boolean {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(str);
}

export function validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
    return regex.test(email);
}