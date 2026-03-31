export type ClaimLicenseDTO = {
  email: string;
  order_id: string;
};

export type ActivateLicenseDTO = {
  email: string;
  license_key: string;
};

export type LicensesQueryDTO = {
  page?: number;
  limit?: number;
  search?: string;
};
