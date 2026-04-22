"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const license_service_1 = __importDefault(require("@/modules/licenses/license.service"));
const http_status_codes_1 = require("http-status-codes");
const LicenseController = {
    claimLicense: async (req, res) => {
        const { email, order_id } = req.body;
        try {
            const license = await license_service_1.default.claimLicense({ email, order_id });
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: true,
                message: "License claimed successfully",
                data: license,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to claim license",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    activateLicense: async (req, res) => {
        const { email, license_key } = req.body;
        try {
            const result = await license_service_1.default.activateLicense({
                email,
                license_key,
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: result.message,
                data: result,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to activate license",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    // getLicenses: async (req: Request, res: Response) => {
    //   const query = req.query;
    //   try {
    //     const licenses = await LicenseService.getLicenses(query);
    //     res.status(StatusCodes.OK).json({
    //       success: true,
    //       message: "Licenses retrieved successfully",
    //       data: licenses.data,
    //       meta: licenses.meta,
    //     });
    //   } catch (error) {
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //       success: false,
    //       message: "Failed to retrieve licenses",
    //       error: error instanceof Error ? error.message : "Unknown error",
    //     });
    //   }
    // },
    // deleteLicense: async (req: Request, res: Response) => {
    //   const licenseId = req.params.id;
    //   try {
    //     await LicenseService.deleteLicense(licenseId as string);
    //     res.status(StatusCodes.OK).json({
    //       success: true,
    //       message: "License deleted successfully",
    //     });
    //   } catch (error) {
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //       success: false,
    //       message: "Failed to delete license",
    //       error: error instanceof Error ? error.message : "Unknown error",
    //     });
    //   }
    // },
};
exports.default = LicenseController;
