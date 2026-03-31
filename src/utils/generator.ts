import crypto from "crypto";

export const generateLicenseKey = (): string => {
  const segments = 3;
  const segmentLength = 4;

  const bytes = crypto.randomBytes(segments * segmentLength);
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
