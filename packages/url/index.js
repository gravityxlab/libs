"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = void 0;
const stringify = (params) => {
    return Object.entries(params)
        .filter(([_, value]) => value !== null && value !== "" && value !== undefined) // 过滤掉 null, '', undefined
        .map(([key, value]) => `${key}=${value}`) // 拼接成 key=value
        .join("&"); // 使用 & 连接
};
exports.stringify = stringify;
