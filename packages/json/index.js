"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = void 0;
const parseJSON = (string) => {
    try {
        return JSON.parse(string);
    }
    catch (error) {
        return null;
    }
};
exports.parseJSON = parseJSON;
