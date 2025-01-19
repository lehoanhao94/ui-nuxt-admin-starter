export const useTenantsStore = defineStore('tenantsStore', {
  state: () => ({
    tenants: []
  }),
  actions: {
    async fetchTenants() {
      const tenants = await fetch('/api/tenants')
      this.tenants = await tenants.json()
    }
  }
})
