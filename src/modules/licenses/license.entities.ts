interface LicenseEntity {
  id?: string;
  email: string;
  license_key: string;
  is_active?: boolean;
  activated_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export default LicenseEntity;
