import {
  ClaimLicenseDTO,
  ActivateLicenseDTO,
  LicensesQueryDTO,
} from "@/modules/licenses/license.dto";
import LicenseRepository from "@/modules/licenses/license.repository";
import LicenseEntity from "@/modules/licenses/license.entities";
import { generateLicenseKey } from "@/utils/generator";

const LicenseService = {
  claimLicense: async (data: ClaimLicenseDTO) => {
    const existingLicense = await LicenseRepository.findByEmail(data.email);
    if (existingLicense) {
      throw new Error("Email already has a license");
    }

    const licenseKey = generateLicenseKey();

    const licenseData: LicenseEntity = {
      id: crypto.randomUUID(),
      email: data.email,
      license_key: licenseKey,
      order_id: data.order_id,
      is_active: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await LicenseRepository.insert(licenseData);

    return {
      license_key: result.license_key,
    };
  },

  activateLicense: async (data: ActivateLicenseDTO) => {
    const license = await LicenseRepository.findByEmail(data.email);

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

    await LicenseRepository.updateLicense(updatedLicense);
    return {
      email: license.email,
      message: "License activated successfully",
    };
  },

  getLicenses: async (query: LicensesQueryDTO) => {
    const result = await LicenseRepository.findMany(query);
    return result;
  },

  deleteLicense: async (id: string) => {
    await LicenseRepository.deleteById(id);
    return true;
  },
};

export default LicenseService;
