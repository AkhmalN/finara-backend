"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
exports.validateQuery = validateQuery;
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
const formatZodIssues = (issues) => {
    return issues.map((issue) => ({
        field: issue.path.length > 0 ? issue.path.join(".") : "body",
        message: issue.message,
        code: issue.code,
    }));
};
function validateData(schema) {
    return (req, res, next) => {
        try {
            const parsedData = schema.parse(req.body);
            req.body = parsedData;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = formatZodIssues(error.issues);
                const isMissingBody = error.issues.some((issue) => issue.path.length === 0 && issue.code === "invalid_type");
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: isMissingBody
                        ? "Request body is required"
                        : "Validation failed",
                    errors,
                });
            }
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };
}
function validateQuery(schema) {
    return (req, res, next) => {
        try {
            const parsedQuery = schema.parse(req.query);
            req.query = parsedQuery;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = formatZodIssues(error.issues);
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Validation failed",
                    errors,
                });
            }
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };
}
