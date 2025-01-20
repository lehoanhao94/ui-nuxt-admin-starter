export const useTenantsStore = defineStore('tenantsStore', {
  persist: {
    pick: ['selectedTenantId'],
    storage: window?.localStorage
  },
  state: () => ({
    tenants: [],
    selectedTenantId: null,
    loadings: {} as Record<string, any>,
    errors: {} as Record<string, any>,
    showTenantsPalette: false
  }),
  getters: {
    tenantsDropdownItems: state => state.tenants.map(tenant => ({
      ...tenant,
      avatar: {
        src: tenant.avatar,
        alt: tenant.tenant_name
      },
      label: tenant.tenant_name,
      click: () => {
        state.selectedTenantId = tenant.uuid
        const router = useRouter()
        // replace params tenantId
        router.replace({
          params: {
            tenantId: tenant.uuid
          }
        })
      }
    })),

    topFiveTenantsDropdownItems() {
      if (this.tenantsDropdownItems.length <= 5) {
        return this.tenantsDropdownItems
      }
      const remainAvatars = this.tenantsDropdownItems.slice(5, this.tenantsDropdownItems.length).map(tenant => tenant.avatar)
      return this.tenantsDropdownItems.slice(0, 5).concat({
        slot: 'more',
        label: 'もっと見る',
        remainAvatars,
        remainCount: this.tenantsDropdownItems.length - 5,
        click: () => {
          this.showTenantsPalette = true
        }
      })
    },

    firstTenant(): any {
      return this.tenantsDropdownItems?.[0]
    },

    selectedTenant() {
      return this.tenantsDropdownItems.find(tenant => tenant.uuid === this.selectedTenantId) || this.firstTenant
    }
  },
  actions: {
    async fetchTenants() {
      try {
        this.loadings.fetchTenants = true
        this.errors.fetchTenants = null
        const response = await useAPI().adminService.get('/v1/admin/tenants')
        this.tenants = response.data.tenants
        return response.data
      } catch (error) {
        this.errors.fetchTenants = error?.response?.data || error
        return false
      } finally {
        this.loadings.fetchTenants = false
      }
    }
  }
})
