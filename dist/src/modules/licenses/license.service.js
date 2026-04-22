"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const license_repository_1 = __importDefault(require("@/modules/licenses/license.repository"));
const generator_1 = require("@/utils/generator");
const LicenseService = {
    claimLicense: async (data) => {
        const existingLicense = await license_repository_1.default.findByEmail(data.email);
        if (existingLicense) {
            throw new Error("Email already has a license");
        }
        const licenseKey = (0, generator_1.generateLicenseKey)();
        const licenseData = {
            id: crypto.randomUUID(),
            email: data.email,
            license_key: licenseKey,
            order_id: data.order_id,
            is_active: false,
            created_at: new Date(),
            updated_at: new Date(),
        };
        const result = await license_repository_1.default.insert(licenseData);
        return {
            license_key: result.license_key,
        };
    },
    activateLicense: async (data) => {
        const license = await license_repository_1.default.findByEmail(data.email);
        if (!license) {
            throw new Error("License not found for this email");
        }
        if (license.license_key !== data.license_key) {
            throw new Error("Invalid license key");
        }
        if (license.is_active) {
            throw new Error("License is already activated");
        }
        const updatedLicense = {
            id: license.id,
            is_active: true,
        };
        await license_repository_1.default.updateLicense(updatedLicense);
        return {
            email: license.email,
            message: "License activated successfully",
        };
    },
    getLicenses: async (query) => {
        const result = await license_repository_1.default.findMany(query);
        return result;
    },
    deleteLicense: async (id) => {
        await license_repository_1.default.deleteById(id);
        return true;
    },
};
exports.default = LicenseService;
