import { createSharedComposable } from '@vueuse/core'

const _useApp = () => {
  const tenantsStore = useTenantsStore()
  const { selectedTenantId, firstTenant } = storeToRefs(tenantsStore)
  const route = useRoute()
  const router = useRouter()
  const loadings = ref({}) as Ref<Record<string, any>>
  const initialApp = async () => {
    try {
      loadings.value.initialApp = true
      await tenantsStore.fetchTenants()
      if (!selectedTenantId.value) {
        selectedTenantId.value = firstTenant.value?.uuid
      }
      if (!route.params.tenantId) {
        router.push(`/${selectedTenantId.value}/`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      loadings.value.initialApp = false
    }
  }

  return {
    initialApp,
    loadings
  }
}

export const useApp = createSharedComposable(_useApp)
