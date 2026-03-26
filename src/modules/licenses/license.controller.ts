import { Request, Response } from "express";
import LicenseService from "@/modules/licenses/license.service";
import { StatusCodes } from "http-status-codes";

const LicenseController = {
  claimLicense: async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const license = await LicenseService.claimLicense({ email });
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: license.message,
        data: license,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to claim license",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  activateLicense: async (req: Request, res: Response) => {
    const { email, license_key } = req.body;

    try {
      const result = await LicenseService.activateLicense({
        email,
        license_key,
      });
      res.status(StatusCodes.OK).json({
        success: true,
        message: result.message,
        data: result,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to activate license",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getLicenses: async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const licenses = await LicenseService.getLicenses(query);
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Licenses retrieved successfully",
        data: licenses.data,
        meta: licenses.meta,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to retrieve licenses",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  deleteLicense: async (req: Request, res: Response) => {
    const licenseId = req.params.id;

    try {
      await LicenseService.deleteLicense(licenseId as string);
      res.status(StatusCodes.OK).json({
        success: true,
        message: "License deleted successfully",
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to delete license",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};

export default LicenseController;
