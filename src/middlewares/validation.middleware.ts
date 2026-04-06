import { Request, Response, NextFunction } from "express";
import { z, ZodError, type ZodIssue } from "zod";
import { StatusCodes } from "http-status-codes";

type ValidationErrorItem = {
  field: string;
  message: string;
  code: string;
};

const formatZodIssues = (issues: ZodIssue[]): ValidationErrorItem[] => {
  return issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join(".") : "body",
    message: issue.message,
    code: issue.code,
  }));
};

export function validateData(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = formatZodIssues(error.issues);
        const isMissingBody = error.issues.some(
          (issue) => issue.path.length === 0 && issue.code === "invalid_type",
        );

        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: isMissingBody
            ? "Request body is required"
            : "Validation failed",
          errors,
        });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
}
