"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
function validateChars(str) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(str);
}
exports.default = validateChars;
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
    return regex.test(email);
}
exports.validateEmail = validateEmail;
