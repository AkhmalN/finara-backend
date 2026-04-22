"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLicenseKey = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateLicenseKey = () => {
    const segments = 3;
    const segmentLength = 4;
    const bytes = crypto_1.default.randomBytes(segments * segmentLength);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "FINARA";
    for (let i = 0; i < segments; i++) {
        let segment = "";
        for (let j = 0; j < segmentLength; j++) {
            const byte = bytes[i * segmentLength + j];
            segment += chars[byte % chars.length];
        }
        result += `-${segment}`;
    }
    return result;
};
exports.generateLicenseKey = generateLicenseKey;
