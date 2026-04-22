"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_middleware_1 = require("@/middlewares/validation.middleware");
const license_controller_1 = __importDefault(require("@/modules/licenses/license.controller"));
const license_validators_1 = require("@/modules/licenses/license.validators");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/claim", (0, validation_middleware_1.validateData)(license_validators_1.claimLicenseSchema), license_controller_1.default.claimLicense);
router.post("/activate", (0, validation_middleware_1.validateData)(license_validators_1.activateLicenseSchema), license_controller_1.default.activateLicense);
// router.get(
//   "/",
//   validateData(licensesQuerySchema),
//   LicenseController.getLicenses,
// );
// router.delete("/delete/:id", LicenseController.deleteLicense);
exports.default = router;
