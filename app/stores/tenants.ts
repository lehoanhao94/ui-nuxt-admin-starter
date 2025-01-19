export const useTenantsStore = defineStore("tenantsStore", {
  state: () => ({
    tenants: [],
  }),
  actions: {
    async fetchTenants() {
      const response = await useAPI().adminService.get(
        "/v1/infra/admin",
      );
    },
  },
});
