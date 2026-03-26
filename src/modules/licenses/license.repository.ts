import { LicensesQueryDTO } from "@/modules/licenses/license.dto";
import LicenseEntity from "@/modules/licenses/license.entities";

const LicenseRepository = {
  findById: async (id: string) => {
    // TODO: implement with PostgreSQL
    return null;
  },

  findByEmail: async (email: string) => {
    // TODO: implement with PostgreSQL
    return null;
  },

  findByLicenseKey: async (licenseKey: string) => {
    // TODO: implement with PostgreSQL
    return null;
  },

  findMany: async (query: LicensesQueryDTO) => {
    // TODO: implement with PostgreSQL
    return {
      data: [],
      meta: {
        total: 0,
        page: query.page || 1,
        limit: query.limit || 10,
        totalPages: 0,
      },
    };
  },

  insert: async (data: LicenseEntity) => {
    // TODO: implement with PostgreSQL
    return null;
  },

  update: async (id: string, data: Partial<LicenseEntity>) => {
    // TODO: implement with PostgreSQL
    return true;
  },

  deleteById: async (id: string) => {
    // TODO: implement with PostgreSQL
    return true;
  },
};

export default LicenseRepository;
