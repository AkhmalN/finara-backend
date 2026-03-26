import {
  ClaimLicenseDTO,
  ActivateLicenseDTO,
  LicensesQueryDTO,
} from "@/modules/licenses/license.dto";
import LicenseRepository from "@/modules/licenses/license.repository";
import LicenseEntity from "@/modules/licenses/license.entities";

const generateLicenseKey = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};

const LicenseService = {
  claimLicense: async (data: ClaimLicenseDTO) => {
    const existingLicense = await LicenseRepository.findByEmail(data.email);
    if (existingLicense) {
      throw new Error("Email already has a license");
    }

    const licenseKey = generateLicenseKey();
    const licenseData: LicenseEntity = {
      email: data.email,
      license_key: licenseKey,
      is_active: false,
      created_at: new Date(),
    };

    const result = await LicenseRepository.insert(licenseData);
    return {
      id: result.id,
      email: result.email,
      license_key: result.license_key,
      message: "License claimed successfully",
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

    await LicenseRepository.update(license.id, {
      is_active: true,
      activated_at: new Date(),
    });

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
