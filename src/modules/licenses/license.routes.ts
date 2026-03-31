import { validateData } from "@/middlewares/validation.middleware";
import LicenseController from "@/modules/licenses/license.controller";
import {
  claimLicenseSchema,
  activateLicenseSchema,
  licensesQuerySchema,
} from "@/modules/licenses/license.validators";
import { Router } from "express";

const router = Router();

router.post(
  "/claim",
  validateData(claimLicenseSchema),
  LicenseController.claimLicense,
);

router.post(
  "/activate",
  validateData(activateLicenseSchema),
  LicenseController.activateLicense,
);

// router.get(
//   "/",
//   validateData(licensesQuerySchema),
//   LicenseController.getLicenses,
// );

// router.delete("/delete/:id", LicenseController.deleteLicense);

export default router;
